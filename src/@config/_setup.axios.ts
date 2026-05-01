import { _getAuthToken } from "@/store/auth-user.store";

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const token = _getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err: any) => Promise.reject(err)
  );
}
