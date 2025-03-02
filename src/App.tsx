import './App.css'
import '@arco-design/web-react/dist/css/arco.css'
import DescHeader from './DescHeader.tsx'
import RequestTable from './RequestTable.tsx'
import RTTCard from './RTTChart.tsx'  
import testlist from './assets/testlist.json'
import { Select, Message } from '@arco-design/web-react';
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState<any>({})

  const loadJsonData = async (value: string) => {
    try {
      const response = await import(`./assets/${value}.json`);
      if(!response) return Message.error("加载失败")
      setData(response.default);
    } catch (error) {
      console.error('加载JSON文件时出错:', error);
    }
  };

  useEffect(() => {
    if(testlist?.data?.length > 0) {
      loadJsonData(testlist?.data[0])
    }
  }, [])
  
  return (
    <>
      <Select
        style={{ width: 300 }}
        placeholder="选择一个报告"
        options={testlist?.data ?? []}
        defaultValue={testlist?.data[0]}
        onChange={(value) => {
          loadJsonData(value)
        }}
      />
      <DescHeader data={data.desc}/>
      <RequestTable data={data.protoData}/>
      <RTTCard data={data.rttData}/>
    </>
  )
}

export default App
