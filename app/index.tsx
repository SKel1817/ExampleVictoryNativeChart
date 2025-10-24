import { useFont } from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import { CartesianChart, Line, Scatter } from "victory-native";
import inter from "../assets/inter-medium.ttf";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

type YKey = "sales" | "costs";

const Y_KEY = {
  SALES: "sales" as YKey,
  COSTS: "costs" as YKey,
};


const AXES_LABEL_CONFIG = {
  sales: {
    label: "Tickets Sold",
    color: "#10B981",
    formatLabel: (value: number) => `${value.toFixed(0)}`,
  },
  costs: {
    label: "Average Ticket Price",
    color: "#F59E0B",
    formatLabel: (value: number) => `$${value.toFixed(0)}`,
  },
  month: {
    label: "Month",
    color: "#8B5CF6",
    formatLabel: (value: string) => `${value}`,
  },
};

const AXIS_STYLE = {
  axisColor: "#D1D5DB",
  tickColor: "#9CA3AF",
  labelColor: "#374151",
  gridColor: "#F3F4F6",
};

export default function Index() {
  const font = useFont(inter, 12);

  const data = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const costs = [450, 420, 480, 520, 580, 650, 720, 680, 550, 480, 520, 680][i];
      
      const sales = [1200, 1350, 1100, 950, 800, 650, 480, 520, 750, 1050, 900, 580][i];
      
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][i];
      
      return {
        sales,
        costs,
        month,
      };
    });
  }, []);

  const chartData = useMemo(() => {
    return data.map((d) => ({
      xValue: d.month,
      sales: d.sales,
      costs: d.costs,
    }));
  }, [data]);

  const { salesInfo, costsInfo } = useMemo(() => {
    const sales = AXES_LABEL_CONFIG.sales;
    const costs = AXES_LABEL_CONFIG.costs;
    return { salesInfo: sales, costsInfo: costs };
  }, []);

  const chartConfig = useMemo(() => {
    const yKeys: YKey[] = [Y_KEY.SALES, Y_KEY.COSTS];
    const yAxisConfig = [
      {
        yKeys: [Y_KEY.SALES],
        formatYLabel: salesInfo.formatLabel,
        axisSide: "left" as const,
        font,
        ...AXIS_STYLE,
      },
      {
        yKeys: [Y_KEY.COSTS],
        formatYLabel: costsInfo.formatLabel,
        axisSide: "right" as const,
        font,
        ...AXIS_STYLE,
      },
    ];

    return { yKeys, yAxisConfig };
  }, [salesInfo, costsInfo, font]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB", padding: 16 }}>

      {/* Chart Card */}
      <View style={{ 
        backgroundColor: "white", 
        borderRadius: 12, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        padding: 20,
        marginBottom: 16
      }}>
         {/* Chart Title */}
         <View style={{ marginBottom: 16 }}>
           <Text style={{ fontSize: 20, fontWeight: "600", color: "#111827", marginBottom: 4 }}>
             Ann Arbor Flight Analytics
           </Text>
           <Text style={{ fontSize: 14, color: "#6B7280" }}>
             Seasonal correlation between ticket prices and sales volume
           </Text>
         </View>

        <View style={{ height: 500, marginBottom: 16 }}>
          <CartesianChart
            data={chartData}
            xKey="xValue"
            yKeys={chartConfig.yKeys}
            xAxis={{
              font,
              formatXLabel: (label: string) => label,
              tickCount: 12,
              ...AXIS_STYLE,
            }}
            yAxis={chartConfig.yAxisConfig.map((config) => ({
              ...config,
              ...AXIS_STYLE,
            }))}
            domainPadding={{ left: 60, right: 60, top: 30, bottom: 60 }}
          >
            {({ points }) => (
              <>
                  <Line points={points.sales} strokeWidth={2} color={salesInfo.color} />
                    <Scatter points={points.sales} radius={5} color={salesInfo.color} />
                    <Scatter points={points.costs} radius={5} color={costsInfo.color} />
                    <Line points={points.costs} strokeWidth={2} color={costsInfo.color} />
              </>
            )}
          </CartesianChart>
        </View>

        {/* Legend */}
        <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 16, borderTopWidth: 1, borderTopColor: "#F3F4F6" }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginRight: 24 }}>
            <View style={{ width: 16, height: 4, borderRadius: 2, marginRight: 8, backgroundColor: salesInfo.color }} />
            <Text style={{ fontSize: 14, fontWeight: "600", color: salesInfo.color }}>
              {salesInfo.label}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 16, height: 4, borderRadius: 2, marginRight: 8, backgroundColor: costsInfo.color }} />
            <Text style={{ fontSize: 14, fontWeight: "600", color: costsInfo.color }}>
              {costsInfo.label}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
