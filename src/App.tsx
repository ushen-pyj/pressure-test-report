import './App.css'
import '@arco-design/web-react/dist/css/arco.css'
import DescHeader from './DescHeader.tsx'
import RequestTable from './RequestTable.tsx'
import RTTCard from './RTTChart.tsx'  
// import testList from '../public/static/testlist.json'
import { Select } from '@arco-design/web-react';
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    __TEST_LIST__: { data: string[] };
    __TEST_DATA__: Record<string, any>;
  }
}

function App() {
  console.log("AA", window?.__TEST_DATA__)
  const [data, setData] = useState<any>({})
  const [testList, setTestList] = useState<any>({})

  const loadJsonData = async (value: string) => {
    try {
      // const response = await import(`../public/static/${value}.json`);
      // if(!response || response.default === null) return Message.error("加载失败")
      // setData(response.default);
      setData(window?.__TEST_DATA__[value] ?? {})

      // const response = await fetch(`./static/${value}.json`);
      // if(!response || response.status !== 200) return Message.error("加载失败")
      // const jsonData = await response.json();
      // setData(jsonData);

    } catch (error) {
      console.error('加载JSON文件时出错:', error);
    }
  };

  const loadTestList = async () => {
    try {
      // const response = await import(`../public/static/testlist.json`);
      // if(!response || response.default === null) return Message.error("加载失败")
      // setTestList(response.default);
      setTestList(window?.__TEST_LIST__ ?? {})
    } catch (error) {
      console.error('加载JSON文件时出错:', error);
    }
  };

  useEffect(() => {
    loadTestList()
  }, [])

  useEffect(() => {
    if(testList?.data?.length > 0) {
      loadJsonData(testList?.data[0])
    }
  }, [testList])
  
  return (
    <>
      <Select
        style={{ width: 300 }}
        placeholder="选择一个报告"
        options={testList?.data ?? []}
        defaultValue={testList?.data ? testList.data[0] : ""}
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
