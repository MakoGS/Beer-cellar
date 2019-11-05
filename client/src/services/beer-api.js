import axios from "axios";

const beerAPI = axios.create({
  baseURL: "/api/beer"
});

export const createBeer = beerObject => {
  return new Promise((resolve, reject) => {
    beerAPI
      .post("/create", beerObject)
      .then(response => {
        resolve(response.data.beer);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const loadUserBeers = username => {
  return new Promise((resolve, reject) => {
    beerAPI
      .get(`/user/${username}`)
      .then(response => {
        console.log("response", response);
        resolve(response.data.beers);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadAllBeers = () => {
  return new Promise((resolve, reject) => {
    beerAPI
      .get("/all")
      .then(response => {
        resolve(response.data.beers);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadSingle = id => {
  return new Promise((resolve, reject) => {
    beerAPI
      .get(`/id/${id}`)
      .then(response => {
        resolve(response.data.beer);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadByType = type => {
  return new Promise((resolve, reject) => {
    beerAPI
      .post(`/type/${type}`)
      .then(response => {
        resolve(response.data.beers);
      })
      .catch(error => {
        reject(error);
      });
  });
};
