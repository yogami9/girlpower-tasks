// src/components/programs/ProgramsView.tsx - Real GirlPower Programs
'use client';

import React, { useState } from 'react';
import { Plus, Search, Users, School, Heart, Target } from 'lucide-react';
import { programs } from '@/data/mockData';
import { organization } from '@/data/organizationData';

interface ProgramCardProps {
  program: any;
  onSelect: (program: any) => void;
}

function ProgramCard({ program, onSelect }: ProgramCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Education': return <School size={24} className="text-purple-600" />;
      case 'Health': return <Heart size={24} className="text-pink-600" />;
      case 'Advocacy': return <Users size={24} className="text-blue-600" />;
      case 'Service Delivery': return <Target size={24} className="text-green-600" />;
      default: return <Target size={24} className="text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Education': return 'border-purple-200 bg-purple-50';
      case 'Health': return 'border-pink-200 bg-pink-50';
      case 'Advocacy': return 'border-blue-200 bg-blue-50';
      case 'Service Delivery': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow hover:shadow-xl transition-all p-6 border-2 ${getCategoryColor(program.category)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getCategoryIcon(program.category)}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{program.name}</h3>
            <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full">
              {program.category}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>

      {/* Program Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">{program.completedTasks}</div>
          <div className="text-xs text-gray-600">Tasks Completed</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{program.progress}%</div>
          <div className="text-xs text-gray-600">Progress</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${program.progress}%` }}
          />
        </div>
      </div>

      {/* Sub-programs if any */}
      {program.subPrograms && program.subPrograms.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-gray-600 mb-2">Sub-Programs:</div>
          <div className="flex flex-wrap gap-1">
            {program.subPrograms.map((sub: string, idx: number) => (
              <span key={idx} className="text-xs bg-white text-gray-700 px-2 py-1 rounded-full border border-gray-200">
                {sub}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Partner Info */}
      {program.partner && (
        <div className="mb-4 p-2 bg-white rounded border border-gray-200">
          <div className="text-xs text-gray-600">Partnership with:</div>
          <div className="text-sm font-medium text-gray-800">{program.partner}</div>
        </div>
      )}

      {/* Target Info */}
      {program.target && (
        <div className="mb-4 p-2 bg-yellow-50 rounded border border-yellow-200">
          <div className="text-xs font-medium text-yellow-800">
            🎯 Target: {program.target}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={() => onSelect(program)}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
      >
        View Details →
      </button>
    </div>
  );
}

export default function ProgramsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  const categories = ['All', 'Education', 'Health', 'Advocacy', 'Service Delivery'];

  const filteredPrograms = programs.filter(program => {
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || program.category === selectedCategory;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">GirlPower Programs</h2>
            <p className="text-gray-600 mt-1">
              Empowering adolescent girls and young women across {organization.location.county}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            <Plus size={20} />
            New Program Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  (selectedCategory === category || (category === 'All' && !selectedCategory))
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onSelect={setSelectedProgram}
          />
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Target size={48} className="mx-auto" />
          </div>
          <p className="text-gray-600">No programs found matching your criteria</p>
        </div>
      )}

      {/* Program Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Overall Program Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{programs.length}</div>
            <div className="text-sm text-gray-600 mt-1">Active Programs</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {programs.reduce((acc, p) => acc + p.tasks, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Tasks</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {programs.reduce((acc, p) => acc + p.completedTasks, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Tasks Completed</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">
              {Math.round(programs.reduce((acc, p) => acc + p.progress, 0) / programs.length)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Avg Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}