export interface Header {
  key: string;
  value: string;
  enabled: boolean;
}

export interface Param {
  key: string;
  value: string;
  enabled: boolean;
}

export interface Request {
  method: string;
  url: string;
  headers: Header[];
  params: Param[];
  body: any;
  name?: string;
}

export interface Response {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
}

export interface HistoryItem {
  _id?: string;
  name: string;
  method: string;
  url: string;
  headers: Header[];
  params: Param[];
  body: any;
  response: Response;
  createdAt?: string;
}
