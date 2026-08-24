import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "../card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format } from "date-fns"

interface HourlyTemperatureProps {
   data: ForecastData
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {

   const chartData = data.list.slice(0, 8).map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"), // Hours in AM or PM
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
   }))

   return (
      <Card className="flex-1">
         <CardHeader>
            <CardTitle>Today's Temperature</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="h-50 w-full">
               <ResponsiveContainer
                  width={"100%"} height={"100%"}>
                  <LineChart data={chartData}>
                     <XAxis
                        dataKey="time"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={true}
                     />

                     <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={true}
                        axisLine={false}
                        tickFormatter={(value) => `${value}°`}
                     />

                     {/* tooltip */}
                     <Tooltip
                        content={({ active, payload }) => {
                           if (active && payload && payload.length) {
                              return (
                                 <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="flex items-center gap-2">
                                       <div className="text-[#2563eb] text-[0.70rem] uppercase font-bold">
                                          <span>Temperature: </span>
                                          <span>{payload[0].value}°</span>
                                       </div>

                                       <span className="text-muted-foreground">|</span>

                                       <div className="text-[#64748b] text-[0.70rem] uppercase font-bold">
                                          <span>Feels like: </span>
                                          <span>{payload[1].value}°</span>
                                       </div>
                                    </div>
                                 </div>
                              )
                           }
                           return null;
                        }}
                     />

                     <Line
                        type="natural"
                        dataKey="temp"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                     />

                     <Line
                        type="natural"
                        dataKey="feels_like"
                        stroke="#64748b"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="5 5"
                     />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </CardContent>
      </Card>
   )
}

export default HourlyTemperature