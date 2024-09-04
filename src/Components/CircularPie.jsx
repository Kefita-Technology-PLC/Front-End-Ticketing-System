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

export function CircularPie({
  title = 'Visitors', 
  description = 'January - June 2024', 
  boxTitle = 'Visitors', 
  footer = 'Showing total visitors for the last 6 months', 
  generalReport = {},
  isStation = false, 
  isAssosiation = false, 
  isDeployement = false,
  isTicketSellers = false,
  isAdmins = false
}) {

  const chartTypeMapping = [
    { condition: isStation, key: 'stations' },
    { condition: isAssosiation, key: 'associations_number' },
    { condition: isDeployement, key: 'deployment_lines' },
    { condition: isTicketSellers, key: 'ticket_sellers' },
    { condition: isAdmins, key: 'admins' }
  ];

  const { key } = chartTypeMapping.find(({ condition }) => condition) || {};
  const visitors = generalReport[key] || 20;
  const degree = Math.round((visitors * 360) / 8000);

  const chartData = [
    { browser: "safari", visitors, fill: "var(--color-safari)" },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
                          {visitors}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {boxTitle}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {footer}
        </div>
      </CardFooter>
    </Card>
  )
}
