import React from "react";

interface Item {
  type?: string;
  sales?: number;
}

interface Props {
  items: Item[];
}

const ColumnChart: React.FC<Props> = () => {
  // const data = items;

  // const config = {
  // data,
  // xField: 'type',
  // yField: 'sales',
  // color: '#6ec759',
  // label: {
  // position: 'middle',
  // style: {
  // fill: '#FFFFFF',
  // opacity: 0.6,
  // },
  // },
  // xAxis: {
  // label: {
  // autoHide: true,
  // autoRotate: false,
  // },
  // },
  // meta: {
  // type: {
  // alias: 'Tyoe',
  // },
  // sales: {
  // alias: 'Alias',
  // },
  // },
  // } 

  return <div>ColumnChart</div>
};

export default ColumnChart;
