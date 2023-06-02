import { ColumnConfig } from '@ant-design/plots';
import dynamic from 'next/dynamic';

const Column = dynamic(
  () => import('@ant-design/charts').then(({ Column }) => Column),
  { ssr: false }
);

interface Item {
  type?: string;
  sales?: number;
}

interface Props {
  items: Item[];
}

const ColumnChart: React.FC<Props> = ({ items }) => {
  const data = items;

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: '#6ec759',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Tyoe',
      },
      sales: {
        alias: 'Alias',
      },
    },
  } satisfies ColumnConfig;

  return <Column {...config} />;
};

export default ColumnChart;
