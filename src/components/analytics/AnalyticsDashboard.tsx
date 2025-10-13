
'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Users, Target, Calendar, Activity } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, change, icon, color }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const metrics = [
    {
      title: 'Task Completion Rate',
      value: '68%',
      change: 12,
      icon: <Target className="text-white" size={24} />,
      color: 'bg-purple-500',
    },
    {
      title: 'Active Team Members',
      value: '24',
      change: 8,
      icon: <Users className="text-white" size={24} />,
      color: 'bg-blue-500',
    },
    {
      title: 'Avg. Task Duration',
      value: '4.2 days',
      change: -15,
      icon: <Calendar className="text-white" size={24} />,
      color: 'bg-green-500',
    },
    {
      title: 'Weekly Activity',
      value: '156',
      change: 23,
      icon: <Activity className="text-white" size={24} />,
      color: 'bg-orange-500',
    },
  ];

  const programPerformance = [
    { name: 'STEM Workshop Series', completion: 85, tasks: 12, color: 'bg-purple-600' },
    { name: 'Mentorship Program', completion: 72, tasks: 20, color: 'bg-blue-600' },
    { name: 'Leadership Training', completion: 90, tasks: 10, color: 'bg-green-600' },
    { name: 'Community Outreach', completion: 45, tasks: 15, color: 'bg-orange-600' },
  ];

  const teamActivity = [
    { member: 'Sarah K.', tasks: 12, completed: 9, inProgress: 3 },
    { member: 'Mary N.', tasks: 15, completed: 10, inProgress: 5 },
    { member: 'Jane M.', tasks: 8, completed: 5, inProgress: 3 },
    { member: 'Grace O.', tasks: 10, completed: 8, inProgress: 2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analytics Overview</h2>
        <p className="text-gray-600">Track your program performance and team productivity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      {/* Program Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-6">Program Performance</h3>
        <div className="space-y-4">
          {programPerformance.map((program, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{program.name}</span>
                <span className="text-sm text-gray-600">{program.tasks} tasks</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`${program.color} h-3 rounded-full transition-all duration-300`}
                    style={{ width: `${program.completion}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                  {program.completion}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-6">Team Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-3 font-medium text-gray-700">Team Member</th>
                <th className="text-center pb-3 font-medium text-gray-700">Total Tasks</th>
                <th className="text-center pb-3 font-medium text-gray-700">Completed</th>
                <th className="text-center pb-3 font-medium text-gray-700">In Progress</th>
                <th className="text-center pb-3 font-medium text-gray-700">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {teamActivity.map((member, idx) => {
                const successRate = Math.round((member.completed / member.tasks) * 100);
                return (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-4 font-medium text-gray-900">{member.member}</td>
                    <td className="py-4 text-center text-gray-600">{member.tasks}</td>
                    <td className="py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {member.completed}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {member.inProgress}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              successRate >= 75 ? 'bg-green-500' :
                              successRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${successRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-10">
                          {successRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="font-semibold text-green-600">49%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">In Progress</span>
              <span className="font-semibold text-blue-600">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-semibold text-yellow-600">11%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Overdue</span>
              <span className="font-semibold text-red-600">8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top Priorities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-gray-900">High Priority</span>
              <span className="text-2xl font-bold text-red-600">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium text-gray-900">Medium Priority</span>
              <span className="text-2xl font-bold text-yellow-600">23</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-gray-900">Low Priority</span>
              <span className="text-2xl font-bold text-green-600">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}