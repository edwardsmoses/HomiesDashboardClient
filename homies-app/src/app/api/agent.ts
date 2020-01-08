import axios, { AxiosResponse } from "axios";
import { IFood } from "../modules/food";
import { history } from "../..";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:62127/api";

axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Your Internet Connection is out...");
  }
  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server Error - check the console for more info!");
  }
});

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
