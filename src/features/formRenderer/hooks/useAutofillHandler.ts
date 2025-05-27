import { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { mockApiMap } from "../../../lib/mockApi";
import { type FormField, type FormData } from "../../../schemas/formSchema"

type AutofillField = { name: string; params: string[]; api: string };
type AutofillGroup = { api: string; params: string[]; targets: string[] };

/**
 * Custom hook to handle autofill logic.
 * @param fields - The form schema fields (possibly nested) to initialize autofill watchers.
 */
export const useAutofillHandler = (
  fields: FormField[]
) => {
  const { setValue } = useFormContext<FormData>();

  // Flatten all fields (including nested groups) that have an autoFill config
  const autofillFields: AutofillField[] = useMemo(() => {
    const result: AutofillField[] = [];
    const flattenFields = (fields: FormField[]) => {
      for (const field of fields) {
        if ("group" in field) {
          // Recurse into group fields
          flattenFields(field.fields);
        } else if (field.autoFill) {
          result.push({
            name: field.name,
            params: field.autoFill.params,
            api: field.autoFill.api
          });
        }
      }
    };
    flattenFields(fields);
    return result;
  }, [fields]);

  // Collect all unique param field names used by any autofill
  const allParams: string[] = useMemo(() => {
    const paramsSet = new Set<string>();
    autofillFields.forEach(f => f.params.forEach(p => paramsSet.add(p)));
    return Array.from(paramsSet);
  }, [autofillFields]);

  // Watch all parameter fields for changes (subscribe to their values)
  const watchedParams = useWatch<FormData>({
    name: allParams,
    disabled: allParams.length === 0  // if no params to watch
  });
  // Convert to an object for easier lookup (param name -> current value):
  const paramValues = useMemo(() => {
    const entries = allParams.map((paramName, index) => [paramName, watchedParams?.[index]]);
    return Object.fromEntries(entries);
  }, [watchedParams, allParams]);

  // Group autofill fields by identical API and param set to avoid duplicate calls
  const autofillGroups: AutofillGroup[] = useMemo(() => {
    const groupsMap = new Map<string, AutofillGroup>();
    for (const { name, api, params } of autofillFields) {
      const key = `${api}|${params.join(",")}`;  // unique key for combination
      if (!groupsMap.has(key)) {
        groupsMap.set(key, { api, params, targets: [name] });
      } else {
        groupsMap.get(key)!.targets.push(name);
      }
    }
    return Array.from(groupsMap.values());
  }, [autofillFields]);

  // Effect: call autofill APIs whenever any watched param value changes
  useEffect(() => {
    if (autofillFields.length === 0) return;  // no autofill fields to handle

    // For each group of fields sharing an API call:
    autofillGroups.forEach(group => {
      const { api, params, targets } = group;
      // Check if all required params have non-empty values
      const ready = params.every(param => {
        const value = paramValues[param];
        return value !== undefined && value !== null && value !== ""; 
      });
      if (!ready) {
        return;  // skip API call if any required param is missing or empty
      }

      // Prepare payload from current param values
      const payload: Record<string, any> = {};
      params.forEach(param => { payload[param] = paramValues[param]; });

      // Call the API (mockApiMap contains functions for each api name)
      const apiFunc = mockApiMap[api];
      if (!apiFunc) {
        console.warn(`No API function mapped for key: ${api}`);
        return;
      }
      apiFunc(payload)
        .then(result => {
          // Set the returned values for each target field
          targets.forEach(name => {
            if (result && name in result) {
              setValue(name, result[name], {
                shouldValidate: true,
                shouldDirty: true
              });
            }
          });
        })
        .catch(error => {
          console.error(`Autofill API "${api}" error:`, error);
        })
    });
  }, [paramValues, autofillGroups, setValue]);
};
