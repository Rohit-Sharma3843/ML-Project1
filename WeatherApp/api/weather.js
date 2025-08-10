export default async function handler(req, res) {
  const { lat, lon } = req.query;
  try {
    const resp = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunset,sunrise,wind_speed_10m_max&hourly=relative_humidity_2m,wind_speed_10m,temperature_2m,cloud_cover&current=is_day,pressure_msl,temperature_2m,wind_speed_10m,cloud_cover,relative_humidity_2m&timezone=auto`
    );
    const data = await resp.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
}
