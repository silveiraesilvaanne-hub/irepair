export type Status = 'open' | 'in_progress' | 'done';

export interface ServiceOrder {
  id: number;
  issue: string;
  status: string;
  clientId: number;
  deviceId: number;
  createdAt: string;
}

export interface NewServiceOrder {
  issue: string;
  clientId: number;
  deviceId: number;
}