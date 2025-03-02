import { Table, TableColumnProps } from '@arco-design/web-react';

const columns: TableColumnProps[] = [
  {
    title: '线程ID',
    dataIndex: 'threadID',
  },
  {
    title: '协议',
    dataIndex: 'protocol',
  },
  {
    title: '请求次数',
    dataIndex: 'requestCount',
  },
  {
    title: '错误次数',
    dataIndex: 'errorCount',
  },
  {
    title: '错误率',
    dataIndex: 'errorRate',
  },
  {
    title: '平均响应时间',
    dataIndex: 'averageResponseTime',
  },
  {
    title: '最大响应时间',
    dataIndex: 'maxResponseTime',
  },
  {
    title: '最小响应时间',
    dataIndex: 'minResponseTime',
  },
];

const RequestTable = ({data}: any) => {
  return <Table columns={columns} data={data} />;
};

export default RequestTable;