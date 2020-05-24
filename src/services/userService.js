import http from "./httpService";
export function register({ username: email, password, name }) {
  return http.post(`/api/users`, {
    email,
    password,
    name,
  });
}
