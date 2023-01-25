import React from "react";
import { ResponsiveAreaBump } from "@nivo/bump";

function ResponsiveAreaBumpCategories({ data }) {
  return (
    <div style={{ width: "1200px", height: "500px", backgroundColor: "white" }}>
      <ResponsiveAreaBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={12}
        xPadding={0.5}
        colors={{ scheme: "category10" }}
        blendMode="multiply"
        fillOpacity={0.75}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "CoffeeScript",
            },
            id: "dots",
          },
          {
            match: {
              id: "TypeScript",
            },
            id: "lines",
          },
        ]}
        activeBorderWidth={2}
        borderOpacity={0.5}
        activeBorderOpacity={0.75}
        startLabel={true}
        startLabelPadding={8}
        endLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
      />
    </div>
  );
}

export default ResponsiveAreaBumpCategories;
