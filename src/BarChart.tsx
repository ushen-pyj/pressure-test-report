import { BarChart, Bar } from "@visactor/react-vchart";

const BarChartRender = ({ data, title }: any) => {

  return (
    <>
      <BarChart
        data={[{ id: "id0", values: data }]}
        title={{
          visible: true,
          text: title,
        }}
      >
        <Bar
          xField="count"
          yField="num"
          bar={{
            state: {
              hover: {
                fill: "black",
              },
            },
          }}
        />
      </BarChart>
    </>
  );
};

export default BarChartRender;
