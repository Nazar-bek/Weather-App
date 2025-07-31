import React from "react";

const ChartWeatherData = ({ points, pathData,padding, chartWidth, chartHeight, minTemp, maxTemp, unitSymbol }) => {

  const tempRange = maxTemp - minTemp || 1;

  return (
    <svg width={chartWidth} height={chartHeight}>
      <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth={2} />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="#2563eb" />
          <text
            x={p.x}
            y={p.y - 10}
            textAnchor="middle"
            fontSize="10"
            fill="#000"
          >
            {p.avgTemp}{unitSymbol}
          </text>
          <text
            x={p.x}
            y={chartHeight - 5}
            textAnchor="middle"
            fontSize="10"
            fill="#555"
          >
            {new Date(p.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}
          </text>
        </g>
      ))}
      {[0, 0.25, 0.5, 0.75, 1].map((fraction, i) => {
        const y = padding + (1 - fraction) * (chartHeight - 2 * padding);
        const tempLabel = (minTemp + fraction * tempRange).toFixed(1);
        return (
          <g key={i}>
            <line
              x1={padding}
              y1={y}
              x2={chartWidth - padding}
              y2={y}
              stroke="#ddd"
              strokeDasharray="2"
            />
            <text x={1} y={y + 4} fontSize="10" fill="#666">
              {tempLabel}{unitSymbol}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default ChartWeatherData;
