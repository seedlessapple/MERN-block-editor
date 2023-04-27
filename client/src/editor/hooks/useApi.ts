import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

type ApiMethod = "get" | "post" | "put" | "delete";
type TErrorCode = 404 | 500;
type TErrorMsg = {
  404: string;
  500: string;
};
type ApiParams<T> = {
  method: ApiMethod;
  url: string;
  data?: T;
  errorMsg?: Partial<TErrorMsg>;
  thenFunc?: (response: any) => void;
  errorFunc?: (error?: AxiosError<any, any>) => void;
};

function useApi<T>(): [T | null, boolean, (params: ApiParams<T>) => void] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialUrl = "http://localhost:8080/api/";
  const fetchData = async ({
    method,
    url,
    data,
    errorMsg,
    thenFunc,
    errorFunc,
  }: ApiParams<T>) => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await axios({
        timeout: 10000,
        method,
        url: initialUrl + url,
        data,
      });
      thenFunc && thenFunc(response.data);
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          errorMsg?.[error?.response?.status as TErrorCode] || error
        );
        errorFunc && errorFunc(error);
        // Access to config, request, and response
      } else {
        // Just a stock error
        errorFunc && errorFunc();
      }
    }
    setIsLoading(false);
  };

  return [data, isLoading, fetchData];
}

export default useApi;
