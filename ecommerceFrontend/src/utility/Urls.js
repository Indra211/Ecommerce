const baseURl = "http://192.168.1.27:8080/";

export const URL = {
  signup: `${baseURl}signup`,
  login: `${baseURl}login`,
  user: (email) => `${baseURl}user?email=${email}`,
  uploadProduct: `${baseURl}uploadProduct`,
  fetch_products: `${baseURl}products`,
};
