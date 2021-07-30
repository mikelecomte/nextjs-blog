export default async function handler(req, res) {
  const owmData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=43.451637&lon=-80.492531&appid=${process.env.WEATHER_KEY}&units=metric`
  );
  const data = await owmData.json();

  if (!data) {
    res.status(404).json({ text: "no weather lol" });
  }
  res.status(200).json(data);
}
