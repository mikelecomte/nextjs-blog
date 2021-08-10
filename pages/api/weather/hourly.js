export default async function handler(req, res) {
  const owmData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=43.451637&lon=-80.492531&appid=${process.env.WEATHER_KEY}&units=metric&exclude=minutely,daily`
  );

  const data = await owmData.json();

  if (data) {
    data.hourly.forEach((h) => {
      const date = new Date(h.dt * 1000);
      const day = date.getDay();

      h.day = day;
    });

    const days = data.hourly.map((h) => h.day);

    const dataWithDays = days.reduce(
      (acc, curr) => ((acc[curr] = {}), acc),
      {}
    );

    const keys = Object.keys(dataWithDays);

    keys.forEach((k) => {
      dataWithDays[k] = data.hourly.filter((h) => h.day === Number(k));
    });

    data.hourly = dataWithDays;
  }

  if (!data) {
    res.status(404).json({ text: "no weather lol" });
  }
  res.status(200).json(data);
}
