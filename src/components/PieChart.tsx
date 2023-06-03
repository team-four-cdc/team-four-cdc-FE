import { formatCurrency } from '@/utils';
import dynamic from 'next/dynamic';

const Pie = dynamic(() => import('@ant-design/charts').then(({ Pie }) => Pie), {
  ssr: false,
});

interface Item {
  type?: string;
  value?: number;
}

interface Props {
  items: Item[];
}

const PieChart: React.FC<Props> = ({ items }) => {
  const data = items;

  return (
    <Pie
      data={data}
      angleField="value"
      colorField="type"
      legend={false}
      label={false}
      color={['#78DB5F', '#B8FFA7', '#5ABF41']}
      tooltip={{
        formatter: (data: any) => {
          return {
            name: data.type,
            value: formatCurrency({ value: data.value }),
          };
        },
      }}
    />
  );
};

export default PieChart;
