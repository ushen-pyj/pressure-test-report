import { VChart } from "@visactor/react-vchart";
const Pie = ({data, title}: any) => {
  const spec: any = {
    type: "pie",
    data: [
      {
        id: "id0",
        values: data,
      },
    ],
    outerRadius: 0.8,
    valueField: "value",
    categoryField: "type",
    title: {
      visible: true,
      text: title,
    },
    legends: {
      visible: true,
      orient: "left",
    },
    label: {
      visible: true,
    },
    tooltip: {
      mark: {
        content: [
          {
            key: (datum: any) => datum["type"],
            value: (datum: any) => datum["value"] + "%",
          },
        ],
      },
    },
  };
  return <VChart spec={spec} />;
};
export default Pie;
