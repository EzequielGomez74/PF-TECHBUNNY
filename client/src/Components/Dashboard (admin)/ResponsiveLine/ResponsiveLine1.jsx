// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ResponsiveLine1 = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default ResponsiveLine1[
  ({
    id: "japan",
    color: "hsl(136, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 253,
      },
      {
        x: "helicopter",
        y: 230,
      },
      {
        x: "boat",
        y: 248,
      },
      {
        x: "train",
        y: 283,
      },
      {
        x: "subway",
        y: 248,
      },
      {
        x: "bus",
        y: 47,
      },
      {
        x: "car",
        y: 103,
      },
      {
        x: "moto",
        y: 275,
      },
      {
        x: "bicycle",
        y: 52,
      },
      {
        x: "horse",
        y: 115,
      },
      {
        x: "skateboard",
        y: 36,
      },
      {
        x: "others",
        y: 162,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(144, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 225,
      },
      {
        x: "helicopter",
        y: 0,
      },
      {
        x: "boat",
        y: 95,
      },
      {
        x: "train",
        y: 69,
      },
      {
        x: "subway",
        y: 175,
      },
      {
        x: "bus",
        y: 62,
      },
      {
        x: "car",
        y: 83,
      },
      {
        x: "moto",
        y: 285,
      },
      {
        x: "bicycle",
        y: 43,
      },
      {
        x: "horse",
        y: 26,
      },
      {
        x: "skateboard",
        y: 291,
      },
      {
        x: "others",
        y: 270,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(94, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 44,
      },
      {
        x: "helicopter",
        y: 211,
      },
      {
        x: "boat",
        y: 261,
      },
      {
        x: "train",
        y: 281,
      },
      {
        x: "subway",
        y: 283,
      },
      {
        x: "bus",
        y: 287,
      },
      {
        x: "car",
        y: 220,
      },
      {
        x: "moto",
        y: 16,
      },
      {
        x: "bicycle",
        y: 200,
      },
      {
        x: "horse",
        y: 27,
      },
      {
        x: "skateboard",
        y: 41,
      },
      {
        x: "others",
        y: 11,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(10, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 296,
      },
      {
        x: "helicopter",
        y: 90,
      },
      {
        x: "boat",
        y: 132,
      },
      {
        x: "train",
        y: 213,
      },
      {
        x: "subway",
        y: 200,
      },
      {
        x: "bus",
        y: 82,
      },
      {
        x: "car",
        y: 35,
      },
      {
        x: "moto",
        y: 139,
      },
      {
        x: "bicycle",
        y: 196,
      },
      {
        x: "horse",
        y: 156,
      },
      {
        x: "skateboard",
        y: 209,
      },
      {
        x: "others",
        y: 137,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(119, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 91,
      },
      {
        x: "helicopter",
        y: 225,
      },
      {
        x: "boat",
        y: 82,
      },
      {
        x: "train",
        y: 167,
      },
      {
        x: "subway",
        y: 163,
      },
      {
        x: "bus",
        y: 52,
      },
      {
        x: "car",
        y: 262,
      },
      {
        x: "moto",
        y: 183,
      },
      {
        x: "bicycle",
        y: 216,
      },
      {
        x: "horse",
        y: 143,
      },
      {
        x: "skateboard",
        y: 180,
      },
      {
        x: "others",
        y: 282,
      },
    ],
  })
];
