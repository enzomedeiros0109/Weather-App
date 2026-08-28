import type { ForecastData } from "@/api/types"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
   data: ForecastData,
}

interface DailyForecast {
   date: number,
   temp_min: number,
   temp_max: number,
   humidity: number,
   wind: number,
   weather: {
      id: number
      main: string
      description: string
      icon: string
   };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {

   const dailyForecasts = data.list.reduce((accumulator, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "dd-MM-yyyy")

      if (!accumulator[date]) {
         accumulator[date] = {
            temp_min: forecast.main.temp_min,
            temp_max: forecast.main.temp_max,
            humidity: forecast.main.humidity,
            wind: forecast.wind.speed,
            weather: forecast.weather[0],
            date: forecast.dt,
         }
      } else {
         accumulator[date].temp_min = Math.min(accumulator[date].temp_min, forecast.main.temp_min)
         accumulator[date].temp_max = Math.min(accumulator[date].temp_max, forecast.main.temp_max)
      }

      return accumulator;

   }, {} as Record<string, DailyForecast>)

   const nextDays = Object.values(dailyForecasts).slice(0, 6);

   const formatTemp = (temp: number) => `${Math.round(temp)}°`

   return (
      <Card>
         <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="grid gap-4">
               {nextDays.map((day) => {
                  return (
                     <div
                        key={day.date}
                        className="grid min-w-0 gap-3 rounded-lg border p-3 sm:grid-cols-3 sm:items-center sm:gap-4 sm:p-4">
                        <div className="min-w-0">
                           <p className="font-medium">
                              {format(new Date(day.date * 1000), "EEE, MMM d")}
                           </p>
                           <p className="text-sm text-muted-foreground capitalize">
                              {day.weather.description}
                           </p>
                        </div>


                        <div className="flex justify-start gap-4 sm:justify-center">
                           <span className="flex items-center text-blue-500">
                              <ArrowDown className="mr-1 h-4 w-4" />
                              {formatTemp(day.temp_min)}
                           </span>

                           <span className="flex items-center text-red-500">
                              <ArrowUp className="mr-1 h-4 w-4" />
                              {formatTemp(day.temp_max)}
                           </span>
                        </div>

                        <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 sm:justify-end sm:gap-x-6">
                           <span className="flex items-center gap-1">
                              <Droplets className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">{day.humidity}%</span>
                           </span>
                           <span className="flex items-center gap-1">
                              <Wind className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">{day.wind}m/s</span>
                           </span>
                        </div>
                     </div>
                  )
               })}
            </div>
         </CardContent>
      </Card>
   )
}

export default WeatherForecast