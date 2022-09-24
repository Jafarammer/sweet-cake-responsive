import axios from "axios";

export default async function handler(req, res) {
  await axios
    .get(`${process.env.API_URL}/recipe`)
    .then((response) => {
      console.log(response);
      res.status(200).json(response?.data);
    })
    .catch((error) => {
      console.log(error);
      // res.status(400).json(error.response.data.data);
    });
}
