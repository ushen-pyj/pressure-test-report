import { BarChart, Bar } from "@visactor/react-vchart";
import { Slider } from '@arco-design/web-react';
import { useEffect, useState } from "react";

const BarChartRender = ({ data, title }: any) => {
    const [value, setValue] = useState([0, 0]);
    const [renderData, setRenderData] = useState<any>(data ?? []);

    useEffect(()=>{
        if(data.length > 0){
        const max = Math.max(...data.map((item: any) => item.count))
        const min = Math.min(...data.map((item: any) => item.count))
        setValue([min, max])
        }
    }, [])

    useEffect(() => {
        if(data.length > 0){
        const filterData = data.filter((item: any) => item.count >= value[0] && item.count <= value[1])
        setRenderData(filterData)
        }
    }, [value])
  return (
    <>
      <Slider range max={Math.max(...data.map((item: any) => item.count))} min={Math.min(...data.map((item: any) => item.count))} value={value} onChange={(val: number | number[]) => {
        if (Array.isArray(val)) {
            setValue(val);
        }
        }} />
      <BarChart
        data={[{ id: "id0", values: renderData }]}
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
