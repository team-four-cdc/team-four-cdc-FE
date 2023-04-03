import { Pie } from '@ant-design/plots';

const PieChart = () => {
  const data = [
    {
      type: 'Read',
      value: 73,
    },
    {
      type: 'Sales',
      value: 27,
    },
  ];

  return (
    <Pie
      data={data}
      angleField="value"
      colorField="type"
      legend={false}
      label={false}
      color={['#5ABF41', '#B8FFA7']}
    />
  );
};

export default PieChart;
