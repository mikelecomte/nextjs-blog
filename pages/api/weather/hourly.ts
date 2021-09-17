import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const owmData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=43.451637&lon=-80.492531&appid=${process.env.WEATHER_KEY}&units=metric&exclude=minutely,daily`
  );

  const data = await owmData.json();

  if (!data) {
    res.status(404).json({ data: "no weather lol" });
  }
  res.status(200).json(data);
}
