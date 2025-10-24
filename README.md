# Victory Native XL Dual Y-Axis Chart Example

Complete implementation from a tutorial article showing how to create charts with dual y-axis in React Native using Victory Native XL

## Overview

This example demonstrates:
- **Dual Y-Axis Configuration**: Independent left and right y-axes with separate scales
- **Combined Visualizations**: Scatter plots and line charts on the same graph
- **Custom Formatting**: Different label formats for each axis (numbers vs currency)

## Quick Start

**Install dependencies:**
```bash
npm install
```

**Start the development server:**
```bash
npx expo start
```

**Run on a specific platform:**
```bash
npx expo start --ios      # iOS Simulator
npx expo start --android  # Android Emulator
npx expo start --web      # Web browser
```

## Project Structure

```
app/
  index.tsx           Main chart implementation
  _layout.tsx         App layout configuration

assets/
  inter-medium.ttf    Custom font for chart labels
  fonts.d.ts          Font type declarations
```

## Key Implementation

The main chart code is in `app/index.tsx` and includes:

### Data Structure
Each data point contains values for both y-axes:
```typescript
const chartData = [
  { xValue: "January", sales: 1200, costs: 450 },
  { xValue: "February", sales: 1350, costs: 420 },
  // ... 12 months total
];
```

### Dual Y-Axis Configuration
```typescript
yAxis: [
  {
    yKeys: ["sales"],      // Left axis
    formatYLabel: (value) => `${value}`,
    axisSide: "left",
  },
  {
    yKeys: ["costs"],      // Right axis  
    formatYLabel: (value) => `$${value}`,
    axisSide: "right",
  }
]
```

### Chart Rendering
```typescript
<CartesianChart data={chartData} xKey="xValue" yKeys={["sales", "costs"]}>
  {({ points }) => (
    <>
      <Line points={points.sales} color="#10B981" />
      <Scatter points={points.sales} color="#10B981" />
      
      <Scatter points={points.costs} color="#F59E0B" />
      <Line points={points.costs} color="#F59E0B" />
    </>
  )}
</CartesianChart>
```

## Core Dependencies

- `victory-native` - Chart library
- `@shopify/react-native-skia` - Graphics rendering
- `react-native-reanimated` - Smooth animations
- `expo-font` - Custom font loading


## Troubleshooting

**Font not loading**: Verify `assets/inter-medium.ttf` exists and is properly imported

**TypeScript errors**: Confirm all Victory Native type imports are correct

## Related Article

This repository accompanies a detailed tutorial article:

**[Read the full tutorial here](#)** _(link to be added)_


