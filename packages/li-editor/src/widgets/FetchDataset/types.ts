export type FetchDatasetConfig = {
  name: string;
  url: string;
  method: 'GET' | 'POST';
  body?: Record<string, any>;
  headers?: HeadersInit;
  processingFunction?: {
    onComplete?: { type: 'JSFunction'; value: string };
    onError?: { type: 'JSFunction'; value: string };
  };
};

export type DatasetProperties = {
  url: string;
  requestOptions: Omit<RequestInit, 'body'> & {
    body?: Record<string, any>;
  };
  onComplete?: { type: 'JSFunction'; value: string };
  onError?: { type: 'JSFunction'; value: string };
};
