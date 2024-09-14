import { getResponseType } from './httpResponses';

export const API_URL = 'http://localhost:4000';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export type RequestData = Record<string, unknown>;

interface ProcessedResponse {
  json: unknown;
  status: number;
  headers: Headers;
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
  status: number;
  headers: Headers;
  endpoint: {
    method: HttpMethod;
    url: string;
  };
  additionalInfo: unknown;

  constructor(message: string, details: ProcessedResponse) {
    super(message);
    const { json, status, headers, endpoint, ...rest } = details;
    const errorType = getResponseType(status);
    this.name = errorType === 'ClientError' ? 'Client Error' : 'Server Error';
    this.json = json;
    this.status = status;
    this.headers = headers;
    this.endpoint = endpoint;
    this.additionalInfo = rest;
  }
}

async function fetchData({
  url,
  data,
  method,
}: {
  url: string;
  data?: RequestData;
  method: HttpMethod;
}): Promise<ProcessedResponse> {
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

  const processedResponse: ProcessedResponse = {
    json: json,
    status: response.status,
    headers: response.headers,
    endpoint: { method, url },
    ok: response.ok,
    message: response.ok ? undefined : json.error || response.statusText,
  };

  if (!response.ok) {
    throw new FetchResponseError(
      `${processedResponse.message}`,
      processedResponse,
    );
  }
  return processedResponse;
}

function createApiMethod(method: HttpMethod) {
  return (url: string, data?: RequestData) => {
    return fetchData({
      url: `${API_URL}${url}`,
      data,
      method,
    });
  };
}

export const api = {
  get: createApiMethod('get'),
  post: createApiMethod('post'),
  put: createApiMethod('put'),
  delete: createApiMethod('delete'),
};
