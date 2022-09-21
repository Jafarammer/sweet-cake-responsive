import axios from "axios";

export default function handler(req, res) {
  const { id } = req.query;
  axios
    .get(`${process.env.API_URL}/recipe/id/${id}`)
    .then((response) => {
      res.status(200).json(response?.data);
    })
    .catch((err) => {
      res.status(400).json(err.response.data);
    });
}
