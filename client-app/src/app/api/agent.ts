import axios, { AxiosResponse } from "axios";
import { IItem } from "../models/item";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(500)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Items = {
  list: (): Promise<IItem[]> => requests.get("/items"),
  create: (item: IItem) => requests.post("/items", item),
  delete: (id: string) => requests.del(`/items/${id}`),
};

export default {
  Items,
};
