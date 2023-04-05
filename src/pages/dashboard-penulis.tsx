import React, { ReactElement } from "react";
import Heads from "@/layout/Head/Head";
import { Col, Layout, Row, Typography } from "antd";
import { Column, ColumnConfig } from '@ant-design/plots';

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

  function BorderedCol({ children }: { children: ReactElement }) {
    return <Col style={{ border: '2px solid black', padding: '8px', borderRadius: '8px' }} xs={24} md={12}>
      {children}
    </Col>
  }

  function BorderedTagParent({ children }: { children: ReactElement | string }) {
    return <button style={{ flex: '0 1', border: '1px solid black', borderRadius: '9999px', padding: '4px 8px', whiteSpace: 'nowrap' }}>
      {children}
    </button>
  }

  return <>
    <Layout >
      <Heads
        title="Dashboard Penulis"
        showNavbar={true}
        showWrappOption={true}
      />
      <Layout style={{ margin: '2em 4em' }}>
        {/* Sidebar */}
        <Row gutter={[16, 16]}>
          <BorderedCol>
            <>
              <Title level={1} >Total Penjualan</Title>
              <Title style={{ color: '#6ec759' }} level={3} >Rp. 10.000.000</Title>
              <Title level={4} >50 Pembeli</Title>
            </>
          </BorderedCol>
          <BorderedCol >
            <>
              <Title level={1} >Top Artikel Pembaca</Title>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
                <BorderedTagParent>
                  Gimana caranya menanam?
                </BorderedTagParent>
                <BorderedTagParent>
                  Gimana caranya menanam?
                </BorderedTagParent>
                <BorderedTagParent>
                  Masak daging asap
                </BorderedTagParent>
                <BorderedTagParent>
                  Ngoding gampang
                </BorderedTagParent>
              </div>
            </>
          </BorderedCol>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} style={{ border: '2px solid black', padding: '8px', borderRadius: '8px' }}>
            <Title level={1} >Grafik Penjualan</Title>
            <Column {...config} />
          </Col>
        </Row>
      </Layout>
    </Layout>

  </>
}
