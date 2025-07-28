export function calculateMinMaxAvg(forecastList){
    const temps = forecastList.map(item => item.main.temp)

    const min = Math.min(...temps)
    const max = Math.max(...temps)
    const avg = temps.reduce((acc, t) => acc + t , 0) / temps.length

    return{
        min: min.toFixed(1),
        max: max.toFixed(1),
        avg: avg.toFixed(1),
    }
}