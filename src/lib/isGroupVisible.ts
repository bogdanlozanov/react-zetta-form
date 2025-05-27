import type { GroupField, FormData } from "../schemas/formSchema";

/**
 * Determines if a group should be visible based on `dependsOn` conditions.
 */
export const isGroupVisible = (
  field: GroupField,
  values: FormData
): boolean => {
  if (!("group" in field)) return true;
  const { dependsOn, dependsOnValue } = field;

  // If no conditions specified, always visible
  if (!dependsOn || dependsOnValue === undefined) return true;

  const actualValue = values[dependsOn];

  // Normalize both to strings for comparison
  return String(actualValue) === String(dependsOnValue);
};
