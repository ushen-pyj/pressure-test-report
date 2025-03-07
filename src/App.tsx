import './App.css'
import '@arco-design/web-react/dist/css/arco.css'
import DescHeader from './DescHeader.tsx'
import RequestTable from './RequestTable.tsx'
import VCard from './VChart'  
import Pie from './Pie'
import BarChartRender from './BarChart.tsx'
import { Button, Select, Space, Grid } from '@arco-design/web-react';
import { useEffect, useState } from 'react'
import { IconRefresh } from '@arco-design/web-react/icon';

const Row = Grid.Row;
const Col = Grid.Col;

declare global {
  interface Window {
    __TEST_LIST__: { data: string[] };
    __TEST_DATA__: Record<string, any>;
    __TABLE_COLUMNS__: Record<string, any>;
  }
}


function App() {
  const [data, setData] = useState<any>({})
  const [testList, setTestList] = useState<any>({})
  const [columns, setColumns] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<any>("")
  
  const loadJsonData = async (value: string) => {
    try {
      if(JSON.stringify(data) === JSON.stringify(window?.__TEST_DATA__[value])) return
      setData(window?.__TEST_DATA__[value] ?? {})
    } catch (error) {
      console.error('加载JSON文件时出错:', error);
    }
  };

  const loadTestList = async () => {
    try {
      if(JSON.stringify(testList) === JSON.stringify(window?.__TEST_LIST__)) return
      setTestList(window?.__TEST_LIST__ ?? {})
    } catch (error) {
      console.error('加载JSON文件时出错:', error);
    }
  };

  const load = () => {
    loadTestList()
    setColumns(window?.__TABLE_COLUMNS__?.data ?? [])
  };

  const reload = async () => {
    try {
      setLoading(true)
      // 移除旧的脚本
      const oldScript = document.querySelector('script[src*="data-manager.js"]');
      if (oldScript) {
        oldScript.remove();
      }
  
      // 添加新的脚本并等待加载完成
      const script = document.createElement('script');
      script.src = `./static/data-manager.js?t=${Date.now()}`;
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
  
      // 加载完成后更新数据
      loadTestList();
      if(JSON.stringify(data) !== JSON.stringify(window?.__TEST_DATA__[testList?.data[0].value])){
        setColumns(window?.__TABLE_COLUMNS__?.data ?? []);
      }
    } catch (error) {
      console.error('重新加载数据失败:', error);
    } finally{
      setTimeout(()=>{
        setLoading(false)
      }, 1000)
    };
  };

  useEffect(() => {
    loadJsonData(selectValue)
  }, [selectValue])

  useEffect(() => {
    load()
    // setInterval(() => {
    //   reload()
    // }, 5000)
  }, [])

  useEffect(() => {
    if(testList?.data?.length > 0) {
      if(selectValue === "") {
        setSelectValue(testList?.data[0].value)
      }
    }
  }, [testList])
  return (
    <>
      <Space>
        <Select
          style={{ width: 800 }}
          placeholder="选择一个报告"
          options={testList?.data ?? []}
          value={selectValue}
          onChange={(value) => {
            setSelectValue(value)
          }}
        />
        <Button loading={loading} icon={<IconRefresh />} onClick={()=>reload()}></Button>
      </Space>
      <DescHeader data={data.desc}/>
      <RequestTable data={data.protoData} columns={columns}/>
      <Row gutter={24}>
        {
          data.charts?.map((item: any)=>{
            if(item.type==="pie") return <Col span={12} key={item.title}><Pie data={item.data} title={item.title}/></Col>
            if(item.type==="bar") return <Col span={12} key={item.title}><BarChartRender data={item.data} title={item.title}/></Col>
            return <Col span={12} key={item.title}><VCard data={item.data} title={item.title}/></Col>
          })
        }
      </Row>
    </>
  )
}

export default App
