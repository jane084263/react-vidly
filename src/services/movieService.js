import http from "./httpService";

export function getMovies() {
  return http.get("/api/movies");
}
export function deleteMovie(id) {
  return http.delete(`/api/movies/"${id}`);
}

export function getMovie(id) {
  return http.get(`/api/movies/${id}`);
}

export function saveMovie(movie) {
  let body = { ...movie };
  if (movie._id) {
    delete body._id;
    return http.put(`/api/movies/${movie._id}`, body);
  }
  return http.post(`/api/movies`, body);
}
