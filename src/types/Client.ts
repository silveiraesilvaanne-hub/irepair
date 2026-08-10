export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface NewClient {
  name: string;
  phone: string;
  email: string;
}