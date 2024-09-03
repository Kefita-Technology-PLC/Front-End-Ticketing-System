"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { ChartConfig, ChartContainer } from "./ui/chart"
import Skeleton from "react-loading-skeleton"
import { useMemo, useState } from "react"

export const description = "A radial chart with a custom shape"



const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} 

export function CircularPie({title, description, boxTitle, footer, generalReport, isStation}) {
  const [generalReportInner, setGeneralReportInner] = useState(generalReport || [])

  console.log(generalReportInner)
  let chartData, degree

  if(isStation){
     chartData = [
      { browser: "safari", visitors: generalReportInner ? generalReportInner.stations : 20, fill: "var(--color-safari)" },
    ]
     degree = Math.round((generalReportInner.stations * 360)/8000)
  }else {
     chartData = [
      { browser: "safari", visitors: generalReportInner ? generalReportInner.associations_number : 20, fill: "var(--color-safari)" },
    ]
  
     degree =  Math.round((generalReportInner.associations_number * 360)/8000)
  }

  console.log(degree)
  return (

    <Card className="flex flex-col">

      <CardHeader className="items-center pb-0">
        <CardTitle className="">{title || <Skeleton width={'100px'} height={'100%'} />}</CardTitle>
        <CardDescription>{description || 'January - June 2024'}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={degree}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {boxTitle || 'Visitors'}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {footer || 'Showing total visitors for the last 6 months'}
        </div>
      </CardFooter>
    </Card>
  )
}
