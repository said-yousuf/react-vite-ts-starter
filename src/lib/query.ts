// utils/helpers.ts

export type QueryParams = Record<string, unknown>;

interface FilterOperatorConfig {
  fields: {
    [key: string]: {
      operator?: string;
      nestedPath?: string;
    };
  };
  defaultOperator?: string;
}

/**
 * Recursively flattens a nested object into a query string compatible format
 */
function flattenObject(
  obj: Record<string, unknown>,
  parentKey = '',
  result: Record<string, string> = {}
): Record<string, string> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flattenObject(value as Record<string, unknown>, newKey, result);
      } else {
        result[newKey] = String(value);
      }
    }
  }
  return result;
}

/**
 * Filters out undefined, null, empty string, and empty array values
 */
function filterValidParams(params: QueryParams): QueryParams {
  const filtered: QueryParams = {};

  for (const [key, value] of Object.entries(params)) {
    // Skip undefined, null, empty strings, and empty arrays
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      // For objects, recursively filter
      if (typeof value === 'object' && !Array.isArray(value)) {
        const filteredNested = filterValidParams(value as QueryParams);
        if (Object.keys(filteredNested).length > 0) {
          filtered[key] = filteredNested;
        }
      } else {
        filtered[key] = value;
      }
    }
  }

  return filtered;
}

/**
 * Builds query string with proper filtering and common API parameter names
 */
export function buildQueryString(params: QueryParams): string {
  // Filter out invalid values first
  const validParams = filterValidParams(params);

  // If no valid params, return empty string
  if (Object.keys(validParams).length === 0) {
    return '';
  }

  // Transform common parameter names to match your API expectations
  const transformedParams: QueryParams = {};

  for (const [key, value] of Object.entries(validParams)) {
    switch (key) {
      case 'sortBy':
        // Only add if we have a valid sort column
        if (value && typeof value === 'string' && value.trim()) {
          transformedParams['sort'] = value.trim();
        }
        break;
      case 'sortOrder':
        // Only add if we have a valid sort order and sortBy exists
        if (value && (value === 'asc' || value === 'desc') && validParams.sortBy) {
          transformedParams['order'] = value;
        }
        break;
      case 'itemsPerPage':
        if (typeof value === 'number' && value > 0) {
          transformedParams['limit'] = value;
        }
        break;
      case 'page':
        if (typeof value === 'number' && value > 0) {
          transformedParams[key] = value;
        }
        break;
      case 'search':
        if (typeof value === 'string' && value.trim()) {
          transformedParams[key] = value.trim();
        }
        break;
      case 'dateRange':
        // Handle date range object
        if (typeof value === 'object' && value !== null) {
          const dateRange = value as { from_date?: string; to_date?: string };
          if (dateRange.from_date) transformedParams['from_date'] = dateRange.from_date;
          if (dateRange.to_date) transformedParams['to_date'] = dateRange.to_date;
        }
        break;
      default:
        // Pass through other valid parameters
        transformedParams[key] = value;
        break;
    }
  }

  // If no valid transformed params, return empty string
  if (Object.keys(transformedParams).length === 0) {
    return '';
  }

  const flattenedParams = flattenObject(transformedParams);
  const queryParams = new URLSearchParams();

  Object.entries(flattenedParams).forEach(([key, value]) => {
    if (value !== '' && value !== 'undefined' && value !== 'null') {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}

export function chunkString(str: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  return chunks;
}

export function sum(entries: number[]): number {
  return entries.reduce((acc, val) => acc + val, 0);
}

export function transformFilters(
  filters: Record<string, unknown>,
  config: FilterOperatorConfig
): Record<string, string> {
  return Object.entries(filters).reduce(
    (acc, [key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0) &&
        value !== ''
      ) {
        const fieldConfig = config.fields[key];
        const operator = fieldConfig?.operator || config.defaultOperator || '$eq';

        const formatValue = (val: unknown) => {
          if (Array.isArray(val)) return val.join(';');
          return String(val);
        };

        const paramKey = fieldConfig?.nestedPath
          ? `filter[${fieldConfig.nestedPath}]`
          : `filter[${key}]`;

        acc[paramKey] = `${operator}:${formatValue(value)}`;
      }
      return acc;
    },
    {} as Record<string, string>
  );
}
