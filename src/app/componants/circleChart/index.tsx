import React from 'react';

interface PieChartProps {
    value: number;
  limit: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
}

const PieChart: React.FC<PieChartProps> = ({
  value,
  limit,
  size = 200,
  strokeWidth = 12,
  color = '#22c55e',
  bgColor = '#e5e7eb'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const percentage = Math.min((value / limit) * 100, 100); // คำนวณเปอร์เซ็นต์จากค่าจริง
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* วงกลมพื้นหลัง */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* วงกลมค่า */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
      {/* แสดงค่าจริงตรงกลาง */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size * 0.25}
        fill={color}
        fontWeight="bold"
        transform={`rotate(90, ${size / 2}, ${size / 2})`}
      >
        {value}
      </text>
    </svg>
  );
};


export default PieChart;
