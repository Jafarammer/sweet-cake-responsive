import axios from "axios";

export default function handler(req, res) {
  const { name, email, phone_number, password, confirmPassword } = req.body;

  axios
    .post(`${process.env.API_URL}/register`, {
      name,
      phone_number,
      email,
      password,
      confirmPassword,
    })
    .then((response) => {
      res.status(200).json(response?.data);
    })
    .catch((err) => res.status(400).json(err.response.data));
}
