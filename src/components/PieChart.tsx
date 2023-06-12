import React from 'react';
import dynamic from 'next/dynamic';
import { formatCurrency } from '@/utils';

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
        formatter: (data: any) => ({
          name: data.type,
          value: formatCurrency({ value: data.value }),
        }),
      }}
    />
  );
};

export default PieChart;
