import { Table } from '@arco-design/web-react';

const RequestTable = ({data, columns}: any) => {
  return <Table columns={columns} data={data} />;
};

export default RequestTable;