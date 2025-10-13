'use client';

import React, { useState } from 'react';
import { TimeframeType } from '@/types';
import CompletionRate from './CompletionRate';
import ReportGenerator from './ReportGenerator';
import PerformanceOverview from './PerformanceOverview';
import { stats, programs } from '@/data/mockData';

const timeframes: TimeframeType[] = ['weekly', 'monthly', 'quarterly', 'yearly'];

export default function ReportsView() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeType>('monthly');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
      
      <div className="flex gap-2 mb-6">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setSelectedTimeframe(timeframe)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              selectedTimeframe === timeframe
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {timeframe}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompletionRate stats={stats} />
        <ReportGenerator />
      </div>

      <PerformanceOverview programs={programs} />
    </div>
  );
}