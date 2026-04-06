import React, { useContext } from 'react';
import { BookContext } from '../../Context/BookContext';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LabelList
} from 'recharts';

const COLORS = [
  { stroke: '#3b82f6', fill: '#3b82f6' }, // blue
  { stroke: '#10b981', fill: '#10b981' }, // green
  { stroke: '#f59e0b', fill: '#f59e0b' }, // yellow
  { stroke: '#f97316', fill: '#f97316' }, // orange
  { stroke: '#ef4444', fill: '#ef4444' }, // red
];

const PagesToRead = () => {
  const { readList } = useContext(BookContext);

  // Build one data series per book: [{ name, pages }]
  const chartData = readList.map((book, i) => ({
    name: book.bookName,
    pages: book.totalPages,
    color: COLORS[i % COLORS.length],
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-96 bg-gray-100 flex justify-center items-center rounded-xl">
        <h2 className="font-bold text-2xl text-gray-400">No books in read list yet!</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-2xl p-6">
      <div className="flex gap-4 justify-center items-end h-96">
        {chartData.map((book, i) => (
          <div key={i} className="flex-1 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { x: 0, pages: 0 },
                  { x: 0.2, pages: book.pages * 0.1 },
                  { x: 0.5, pages: book.pages },
                  { x: 0.8, pages: book.pages * 0.1 },
                  { x: 1, pages: 0 },
                ]}
                margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`color-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={book.color.fill} stopOpacity={1} />
                    <stop offset="100%" stopColor={book.color.fill} stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <YAxis hide domain={[0, 'dataMax + 40']} />
                <Area
                  type="monotone"
                  dataKey="pages"
                  stroke={book.color.stroke}
                  fill={`url(#color-${i})`}
                  strokeWidth={0}
                  isAnimationActive={true}
                >
                  <LabelList
                    dataKey="pages"
                    position="top"
                    formatter={(val) => (val === book.pages ? val : '')}
                    style={{ fill: book.color.stroke, fontWeight: 'bold', fontSize: 14 }}
                  />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-gray-600 mt-1 truncate px-1">{book.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesToRead;