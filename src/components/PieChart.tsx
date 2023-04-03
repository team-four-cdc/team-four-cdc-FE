import { Pie } from '@ant-design/plots';

const PieChart = () => {
  const data = [
    {
      type: 'Article B',
      value: 2200000,
    },
    {
      type: 'Article C',
      value: 1800000,
    },
    {
      type: 'Article A',
      value: 6000000,
    },
  ];

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
            value: `Rp.${new Intl.NumberFormat('id-ID').format(data.value)}`,
          };
        },
      }}
    />
  );
};

export default PieChart;
