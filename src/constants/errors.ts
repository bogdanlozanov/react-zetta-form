export const INVALID_SYNTAX_MESSAGE = "Invalid JSON syntax";

export const formatZodIssuePath = (path: (string | number)[]): string =>
  path.length > 0 ? path.join(".") : "root";
