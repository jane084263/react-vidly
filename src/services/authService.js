import axios from "axios";
import http from "./httpService";
import jwtDecode from "jwt-decode";
const authKey = "token";

http.setJWT(getJWT());

async function login(email, password) {
  const { data: jwt } = await http.post(`/api/auth`, {
    email,
    password,
  });
  jwt && localStorage.setItem(authKey, jwt);
  http.setJWT(getJWT());
}

function loginWithJwt(token) {
  localStorage.setItem(authKey, token);
}

function logOut() {
  localStorage.removeItem(authKey);
}
function getCurrentUser() {
  let jwt = localStorage.getItem(authKey);
  let user;
  jwt ? (user = jwtDecode(jwt)) : undefined;
  return user;
}

function getJWT() {
  console.log(localStorage.getItem(authKey));
  return localStorage.getItem(authKey);
}
export default { login, loginWithJwt, logOut, getCurrentUser, getJWT };
