import { VChart } from "@visactor/react-vchart";

const RTTCard = ({ data }: any) => {
  const spec: any = {
    type: "line",
    data: {
      values: data,
    },
    title: {
      visible: true,
      text: "响应时间图(单位ms)",
    },
    // stack: true,
    xField: "count",
    yField: "value",
    seriesField: "country",
    line: {
      style: {
        curveType: "monotone",
      },
    },
    point: {
      style: {
        size: 0,
        fill: "white",
        stroke: null,
        lineWidth: 2,
      },
      state: {
        dimension_hover: {
          size: 10,
        },
      },
    },
    legends: [{ visible: true, position: "middle", orient: "bottom" }],
  };
  return <VChart spec={spec} />;
};

export default RTTCard;
