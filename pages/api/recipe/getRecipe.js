// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const request = await fetch(`${process.env.API_URL}/recipe`).then((res) =>
    res.json()
  );
  if (request.data.length > 0) {
    res.status(200).json(request);
  } else {
    res.status(400).json("Data not found");
  }
}
