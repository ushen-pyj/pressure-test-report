import { Descriptions } from '@arco-design/web-react';

const DescHeader = ({data}: any) => {
  return <Descriptions size="large" border data={data} column={12} />;
};

export default DescHeader;
