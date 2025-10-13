import React from 'react';
import { FileText } from 'lucide-react';

const reportTypes = [
  'Donor Impact Report',
  'Board Summary Report',
  'Program Performance Report',
  'Team Activity Report'
];

export default function ReportGenerator() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileText size={20} className="text-purple-600" />
        Generate Reports
      </h3>
      <div className="space-y-3">
        {reportTypes.map((report, idx) => (
          <button
            key={idx}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium">{report}</span>
            <span className="text-purple-600">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}