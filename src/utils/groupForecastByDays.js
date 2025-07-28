export function groupForecastByDay(forecastList) {
  const grouped = {};

  forecastList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  const dailyForecasts = Object.values(grouped)
    .map((dayItems) => dayItems[Math.floor(dayItems.length / 2)])
    .slice(0, 5); 

  return dailyForecasts;}