"use client"
import React, { ReactElement, useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import { useSelector } from 'react-redux';
import Heads from '@/layout/Head/Head';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
// import PieChart from '@/components/PieChart';
// import ColumnChart from '@/components/ColumnChart';
import { useGetDashboardMutation } from '@/services';
import { RootState } from '@/store';
import StyledButton from '@/components/Button';

const { Title } = Typography;

export default function WriterDashboard() {
  const { auth } = useSelector((state: RootState) => state);
  const { userId } = auth;
  const [_dashboardPieData, setDashboardPieData] = useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [_dashboardColumnData, setDashboardColumnData] = useState<
    {
      type: string;
      sales: number;
    }[]
  >([]);
  const [getDashboard] = useGetDashboardMutation();

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard({ userId }).unwrap();
      const { transactions } = res.data;
      const dataPie = transactions?.map((item) => ({
        type: item.Article.title,
        value: parseInt(item.value),
      }));
      const dataColumn = transactions?.map((item) => ({
        type: item.Article.title,
        sales: parseInt(item.sales),
      }));
      setDashboardPieData(dataPie);
      setDashboardColumnData(dataColumn);
    } catch (error) {
      console.log('Error fetching airport locations:', error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  function BorderedCol({
    children,
    className,
  }: {
    children: ReactElement;
    className?: string;
  }) {
    return (
      <div
        className={`w-full border-2 border-black border-solid p-4 rounded-md ${className || ''
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
                <Title style={{ color: '#6ec759' }} level={1}>
                  Rp. 10.000.000
                </Title>
                <Title level={4}>50 Pembeli</Title>
              </>
            </BorderedCol>
            <BorderedCol>
              <>
                <Title level={1}>Top Artikel Pembaca</Title>
                <div className="flex flex-wrap gap-4">
                  <StyledButton
                    type="default"
                    label={'Gimana caranya menanam?'}
                    className="self-center w-auto px-2"
                  />
                  <StyledButton
                    type="default"
                    label={'Gimana caranya menanam?'}
                    className="self-center w-auto px-2"
                  />
                  <StyledButton
                    type="default"
                    label={'Masak daging asap'}
                    className="self-center w-auto px-2"
                  />
                  <StyledButton
                    type="default"
                    label={'Ngoding gampang'}
                    className="self-center w-auto px-2"
                  />
                </div>
              </>
            </BorderedCol>
            <BorderedCol className="lg:col-span-2">
              <>
                <Title level={1}>Grafik Penjualan</Title>
              </>
            </BorderedCol>
            <BorderedCol className="lg:col-span-2">
              <>
                <Title level={1}>Grafik Pembelian</Title>
              </>
            </BorderedCol>
          </div>
        </WriterLayout>
      </Layout>
    </>
  );
}
