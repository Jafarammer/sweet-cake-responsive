import axios from "axios";

export default async function handler(req, res) {
  const { email, password } = req.body;
  await axios
    .post(`${process.env.API_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      res.status(200).json(response?.data);
    })
    .catch((error) => res.status(400).json(error.response.data));
}
