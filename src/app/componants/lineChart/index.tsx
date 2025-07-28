'use client';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ApexAreaChartProps {
  label: string;
  data: number[];
  dates: string[];
  color?: string;
}

export default function ApexAreaChart({ label, data, dates, color = '#00E396' }: ApexAreaChartProps) {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: [color],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      categories: dates.map(d => new Date(d).toISOString()),
      labels: { format: 'dd/MM/yy' }
    },
    tooltip: {
      x: { format: 'dd/MM/yy' }
    }
  };

  const series = [{ name: label, data }];

  return (
    <div className="w-full">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
}

