import axios from "axios";

const authAPI = axios.create({
  baseURL: "/api"
});

export const signUp = ({ email, username, imageUrl, password }) => {
  return new Promise((resolve, reject) => {
    authAPI
      .post("/signup", { email, username, imageUrl, password })
      .then(response => {
        resolve(response.data.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const signIn = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    authAPI
      .post("/signin", { email, password })
      .then(response => {
        resolve(response.data.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    authAPI
      .post("/signout")
      .then(response => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const verify = () => {
  return new Promise((resolve, reject) => {
    authAPI
      .get("/verify")
      .then(response => {
        const user = response.data.user.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadUser = username => {
  return new Promise((resolve, reject) => {
    authAPI
      .get(`/profile/${username}`)
      .then(response => {
        resolve(response.data.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};
