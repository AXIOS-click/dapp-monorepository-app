import { appConfig } from "@/core/config/app.config";
import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import {
  REQUEST_HEADER_AUTH_KEY,
  TOKEN_TYPE,
} from "@/shared/application/constants/api.constants";
import axios from "axios";

const unauthorizedCode = [401];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiUrl,
});

BaseService.interceptors.request.use(
  (config) => {
    const accessToken: string | null = AuthStore.getState().tokenSession;

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      AuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default BaseService;
