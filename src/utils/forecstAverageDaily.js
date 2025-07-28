export function calculateDailyAverage(forecastList) {
  const dailyMap = {};

  forecastList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyMap[date]) {
      dailyMap[date] = { sum: 0, count: 0 };
    }

    dailyMap[date].sum += item.main.temp;
    dailyMap[date].count += 1;
  });

  return Object.entries(dailyMap).map(([date, { sum, count }]) => ({
    date,
    avgTemp: (sum / count).toFixed(1),
  }));
}
