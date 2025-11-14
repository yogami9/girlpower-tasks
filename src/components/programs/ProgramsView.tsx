'use client';

import React, { useState } from 'react';
import { Plus, Search, Users, School, Heart, Target, X, TrendingUp, Calendar, Edit, Trash2 } from 'lucide-react';
import { programs as initialPrograms } from '@/data/mockData';
import { organization } from '@/data/organizationData';
import { Program } from '@/types';
import { useAuth } from '@/context/AuthContext';
import ProgramForm from './ProgramForm';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
  onViewDetails: (program: Program) => void;
  onEdit: (program: Program) => void;
  onDelete: (program: Program) => void;
  canEdit: boolean;
}

function ProgramCard({ program, onSelect, onViewDetails, onEdit, onDelete, canEdit }: ProgramCardProps) {
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
        {canEdit && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(program);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit program"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(program);
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete program"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
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
      {program.partners && program.partners.length > 0 && (
        <div className="mb-4 p-2 bg-white rounded border border-gray-200">
          <div className="text-xs text-gray-600">Partnership with:</div>
          <div className="text-sm font-medium text-gray-800">{program.partners.join(', ')}</div>
        </div>
      )}

      {/* Target Info */}
      {program.goal && (
        <div className="mb-4 p-2 bg-yellow-50 rounded border border-yellow-200">
          <div className="text-xs font-medium text-yellow-800">
            🎯 Target: {program.goal}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(program)}
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          View Details →
        </button>
        <button
          onClick={() => onSelect(program)}
          className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}

export default function ProgramsView() {
  const { hasPermission } = useAuth();
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showProgramForm, setShowProgramForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | undefined>();

  const categories = ['All', 'Education', 'Health', 'Advocacy', 'Service Delivery', 'Community Engagement', 'Empowerment'];

  const filteredPrograms = programs.filter(program => {
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || program.category === selectedCategory;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateProgram = (programData: Partial<Program>) => {
    const newProgram: Program = {
      id: Date.now().toString(),
      name: programData.name!,
      description: programData.description!,
      category: programData.category!,
      progress: 0,
      tasks: 0,
      completedTasks: 0,
      ...programData,
    };

    setPrograms(prev => [...prev, newProgram]);
    setShowProgramForm(false);
    alert(`Program "${newProgram.name}" created successfully!`);
  };

  const handleUpdateProgram = (programData: Partial<Program>) => {
    setPrograms(prev => prev.map(p => 
      p.id === editingProgram?.id ? { ...p, ...programData } : p
    ));
    setEditingProgram(undefined);
    setShowProgramForm(false);
    alert('Program updated successfully!');
  };

  const handleDeleteProgram = (program: Program) => {
    if (confirm(`Are you sure you want to delete "${program.name}"? This action cannot be undone.`)) {
      setPrograms(prev => prev.filter(p => p.id !== program.id));
      alert('Program deleted successfully!');
    }
  };

  const handleEditProgram = (program: Program) => {
    setEditingProgram(program);
    setShowProgramForm(true);
  };

  const handleCreateTask = (program: Program) => {
    alert(`Creating new task for ${program.name} program. This would open the task creation form.`);
  };

  const handleViewDetails = (program: Program) => {
    setSelectedProgram(program);
  };

  const canManagePrograms = hasPermission('canManagePrograms');

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
          {canManagePrograms && (
            <button 
              onClick={() => {
                setEditingProgram(undefined);
                setShowProgramForm(true);
              }}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus size={20} />
              New Program
            </button>
          )}
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
            onSelect={handleCreateTask}
            onViewDetails={handleViewDetails}
            onEdit={handleEditProgram}
            onDelete={handleDeleteProgram}
            canEdit={canManagePrograms}
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

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProgram.name}</h2>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Program Overview */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-700">{selectedProgram.description}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-purple-600" size={20} />
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{selectedProgram.progress}%</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="text-blue-600" size={20} />
                    <span className="text-sm font-medium text-gray-600">Total Tasks</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{selectedProgram.tasks}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-green-600" size={20} />
                    <span className="text-sm font-medium text-gray-600">Completed</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{selectedProgram.completedTasks}</div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                {selectedProgram.targetAudience && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Target Audience</label>
                    <p className="text-gray-800">{selectedProgram.targetAudience}</p>
                  </div>
                )}

                {selectedProgram.location && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-gray-800">{selectedProgram.location}</p>
                  </div>
                )}

                {selectedProgram.goal && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Goal</label>
                    <p className="text-gray-800">{selectedProgram.goal}</p>
                  </div>
                )}

                {selectedProgram.keyActivities && selectedProgram.keyActivities.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Key Activities</label>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProgram.keyActivities.map((activity, idx) => (
                        <li key={idx} className="text-gray-700">{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProgram.partners && selectedProgram.partners.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Partners</label>
                    <p className="text-gray-800">{selectedProgram.partners.join(', ')}</p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    handleCreateTask(selectedProgram);
                    setSelectedProgram(null);
                  }}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Create Task for this Program
                </button>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Program Form Modal */}
      {showProgramForm && (
        <ProgramForm
          onClose={() => {
            setShowProgramForm(false);
            setEditingProgram(undefined);
          }}
          onSave={editingProgram ? handleUpdateProgram : handleCreateProgram}
          program={editingProgram}
        />
      )}
    </div>
  );
}