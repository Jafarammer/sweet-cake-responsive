export default async function handler(req, res) {
  try {
    const request = await fetch("http://localhost:8000/recipe").then((res) =>
      res.json()
    );
    if (request.length > 0) {
      res.status(200).json(request);
    } else {
      res.status(400).json("Data not found");
    }
  } catch (error) {
    res.status(400).json("Something error");
  }
}
