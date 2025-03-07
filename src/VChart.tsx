import { VChart } from "@visactor/react-vchart";
import { Slider } from '@arco-design/web-react';
import { useEffect, useState } from "react";

const RTTCard = ({ data, title }: any) => {
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
  }, [value, data])

  const spec: any = {
    type: "line",
    data: {
      values: renderData,
    },
    title: {
      visible: true,
      text: title,
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
  return <>
    <Slider range max={Math.max(...data.map((item: any) => item.count))} min={Math.min(...data.map((item: any) => item.count))} value={value} onChange={(val: number | number[]) => {
      // 确保 val 是数组类型
      if (Array.isArray(val)) {
        setValue(val);
      }
    }} />
    <VChart spec={spec} />
  </>;
};

export default RTTCard;
