


export interface ApiRequestConfig {
  method?: 'get' | 'post' | 'put' | 'delete';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
}

export async function apiRequest<T = any>(url: string, config?: ApiRequestConfig): Promise<T> {
  try {
    let finalUrl = url;
    if (config?.params) {
      const params = new URLSearchParams(config.params).toString();
      finalUrl += (url.includes('?') ? '&' : '?') + params;
    }
    const fetchConfig: RequestInit = {
      method: config?.method?.toUpperCase() || 'GET',
      headers: config?.headers,
      body: config?.data ? JSON.stringify(config.data) : undefined,
    };
    const controller = config?.timeout ? new AbortController() : undefined;
    if (controller && config?.timeout) {
      fetchConfig.signal = controller.signal;
      setTimeout(() => controller.abort(), config.timeout);
    }
    const response = await fetch(finalUrl, fetchConfig);
    if (!response.ok) {
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || response.statusText || 'API request failed');
    }
    return (await response.json()) as T;
  } catch (error: any) {
    throw new Error(error?.message || 'API request failed');
  }
}
