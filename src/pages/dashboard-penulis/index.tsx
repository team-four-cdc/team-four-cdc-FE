import React, { ReactElement } from 'react';
import Heads from '@/layout/Head/Head';
import { Layout, Typography } from 'antd';
import { ColumnConfig } from '@ant-design/plots';
import dynamic from 'next/dynamic';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
import PieChart from '@/components/PieChart';

const Column = dynamic(
  () => import('@ant-design/charts').then(({ Column }) => Column),
  { ssr: false }
);

const { Title } = Typography;

const data = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];

const config = {
  data,
  xField: 'type',
  yField: 'sales',
  color: '#6ec759',
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle',
    // 'top', 'bottom', 'middle',
    // 配置样式
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
      alias: '类别',
    },
    sales: {
      alias: '销售额',
    },
  },
} satisfies ColumnConfig;

export default function DashboardPenulis() {
  function BorderedCol({
    children,
    className,
  }: {
    children: ReactElement;
    className?: string;
  }) {
    return (
      <div
        className={`w-full border-2 border-black border-solid p-4 rounded-md ${
          className ? className : ''
        }`}
      >
        {children}
      </div>
    );
  }

  function BorderedTagParent({
    children,
  }: {
    children: ReactElement | string;
  }) {
    return (
      <button className="flex-initial px-4 py-2 border-2 border-black border-solid rounded-full whitespace-nowrap">
        {children}
      </button>
    );
  }

  return (
    <>
      <Layout>
        <Heads
          title="Dashboard Penulis"
          showNavbar={true}
          showWrappOption={true}
        />
        <WriterLayout>
          <div className="grid grid-cols-1 gap-4 px-4 py-2 lg:grid-cols-2">
            <BorderedCol>
              <>
                <Title level={1}>Total Penjualan</Title>
                <Title style={{ color: '#6ec759' }} level={3}>
                  Rp. 10.000.000
                </Title>
                <Title level={4}>50 Pembeli</Title>
              </>
            </BorderedCol>
            <BorderedCol>
              <>
                <Title level={1}>Top Artikel Pembaca</Title>
                <div className="flex flex-wrap gap-4">
                  <BorderedTagParent>Gimana caranya menanam?</BorderedTagParent>
                  <BorderedTagParent>Gimana caranya menanam?</BorderedTagParent>
                  <BorderedTagParent>Masak daging asap</BorderedTagParent>
                  <BorderedTagParent>Ngoding gampang</BorderedTagParent>
                </div>
              </>
            </BorderedCol>
            <BorderedCol className="lg:col-span-2">
              <>
                <Title level={1}>Grafik Penjualan</Title>
                <Column {...config} />
              </>
            </BorderedCol>
            <BorderedCol className="lg:col-span-2">
              <>
                <Title level={1}>Grafik Pembelian</Title>
                <PieChart />
              </>
            </BorderedCol>
          </div>
        </WriterLayout>
      </Layout>
    </>
  );
}
