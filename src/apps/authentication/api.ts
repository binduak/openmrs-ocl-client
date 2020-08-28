import { authenticatedInstance, unAuthenticatedInstance } from "../../api";

const api = {
  login: (username: string, password: string) =>
    unAuthenticatedInstance.post("/users/login/", { username, password }),
  getProfile: () => authenticatedInstance.get("/user/"),
  getUserOrgs: (userName:string) => authenticatedInstance.get(`/users/${userName}/orgs/?limit=0`)
};

export default api;
