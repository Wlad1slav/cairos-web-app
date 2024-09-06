import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts";
import {DateAmountChartProps} from "@/lib/types";

function DateAmountChart({data, description, title}: {
    title: string;
    description?: string;
} & DateAmountChartProps) {
    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{users: {label: "Users", color: "hsl(var(--chart-1))"}}}
                    className="h-[300px]"
                >
                    <LineChart
                        accessibilityLayer
                        /* data={[
                            {date: '2024-9-6', amount: 10},
                            {date: '2024-9-7', amount: 5},
                            {date: '2024-9-8', amount: 15},
                        ]}  */
                        data={data}
                        margin={{left: 12, right: 12}}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel/>}/>
                        <Line
                            dataKey="amount"
                            type="natural"
                            stroke="var(--color-users)"
                            strokeWidth={2}
                            dot={{fill: "var(--color-users)"}}
                            activeDot={{r: 6}}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default DateAmountChart;