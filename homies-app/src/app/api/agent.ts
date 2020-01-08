import axios, { AxiosResponse } from "axios";
import { IFood } from "../modules/food";

axios.defaults.baseURL = "http://localhost:62127/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody)
};

const Foods = {
  list: (): Promise<IFood[]> => requests.get("/meals"),
  details: (id: string) => requests.get(`/meals/${id}`),
  create: (food: IFood) => requests.post("/meals", food),
  update: (food: IFood) => requests.put(`/meals/${food.Id}`, food)
};

export default {
  Foods
};
