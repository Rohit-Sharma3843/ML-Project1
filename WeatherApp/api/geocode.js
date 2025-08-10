export default async function handler(req, res) {
  const { city } = req.query;
  try {
    const resp = await fetch(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await resp.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching geocode data" });
  }
}
