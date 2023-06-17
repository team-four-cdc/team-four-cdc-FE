import React from 'react';
// import { formatCurrency } from '@/utils';

interface Item {
  type?: string;
  value?: number;
}

interface Props {
  items: Item[];
}

const PieChart: React.FC<Props> = () => {
  // const data = items;

  return (
    // <Pie
    // data={data}
    // angleField="value"
    // colorField="type"
    // legend={false}
    // label={false}
    // color={['#78DB5F', '#B8FFA7', '#5ABF41']}
    // tooltip={{
    // formatter: (data: any) => ({
    // name: data.type,
    // value: formatCurrency({ value: data.value }),
    // }),
    // }}
    // />
    <div>PieChart</div>
  );
};

export default PieChart;
