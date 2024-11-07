import { getResponseType, HTTPResponseType } from './httpResponses';

// export const API_URL =
//   import.meta.env.VITE_ENV === 'development'
//     ? 'http://localhost:4000'
//     : 'https://testimonialserver.yshplsngh.in';

export const API_URL = 'https://testimonialserver.yshplsngh.in';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type RequestData = Record<string, unknown>;

export interface ProcessedResponse<T = unknown> {
  json: T;
  code: number;
  endpoint: {
    method: HttpMethod;
    url: string;
  };
  ok: boolean;
  message?: string;
}

function toUrlParams(params: Record<string, unknown> | string): string {
  if (typeof params === 'string') {
    return `?${params}`;
  }

  const data = { ...params };
  if (!data || Object.keys(data).length === 0) {
    return '';
  }

  const urlParams = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        urlParams.append(key, JSON.stringify(value));
      } else {
        urlParams.append(key, String(value));
      }
    }
  });
  return `?${urlParams.toString()}`;
}

export class FetchResponseError extends Error {
  json: unknown;
  code: string;
  endpoint: {
    method: HttpMethod;
    url: string;
  };
  additionalInfo: unknown;

  constructor(message: string, details: ProcessedResponse) {
    super(message);
    const { json, code, endpoint, ...rest } = details;
    const errorType: HTTPResponseType = getResponseType(code);
    this.name = errorType === 'ClientError' ? 'Client Error' : 'Server Error';
    this.json = json;
    this.code = String(code);
    this.endpoint = endpoint;
    this.additionalInfo = rest;
  }
}

async function fetchData<T = unknown>({
  url,
  data,
  method,
}: {
  url: string;
  data?: RequestData;
  method: HttpMethod;
}): Promise<ProcessedResponse<T>> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
  };

  if (method === 'get' || method === 'delete') {
    url += toUrlParams(data || {});
  } else if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  const json = await response.json().catch(() => ({}));

  const processedResponse: ProcessedResponse<T> = {
    json: json as T,
    code: response.status,
    endpoint: { method, url },
    ok: response.ok,
    message: response.ok ? undefined : json.message || response.statusText,
  };

  if (!response.ok) {
    throw new FetchResponseError(
      `${processedResponse.message}`,
      processedResponse,
    );
  }

  return processedResponse;
}

function createApiMethod<T = unknown>(method: HttpMethod) {
  return (url: string, data?: RequestData) => {
    return fetchData<T>({
      url: `${API_URL}${url}`,
      data,
      method,
    });
  };
}

export const api = {
  get: <T = unknown>(url: string, data?: RequestData) =>
    createApiMethod<T>('get')(url, data),
  post: <T = unknown>(url: string, data?: RequestData) =>
    createApiMethod<T>('post')(url, data),
  put: <T = unknown>(url: string, data?: RequestData) =>
    createApiMethod<T>('put')(url, data),
  delete: <T = unknown>(url: string, data?: RequestData) =>
    createApiMethod<T>('delete')(url, data),
  // get: createApiMethod('get'),
  // post: createApiMethod('post'),
  // put: createApiMethod('put'),
  // delete: createApiMethod('delete'),
};
