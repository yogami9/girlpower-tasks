'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, FolderOpen, Users, Target, MapPin, Calendar, FileText, AlertCircle } from 'lucide-react';
import { Program, ProgramCategory } from '@/types';

interface ProgramFormProps {
  onClose: () => void;
  onSave: (program: Partial<Program>) => void;
  program?: Program;
}

const PROGRAM_CATEGORIES: ProgramCategory[] = [
  'Education',
  'Empowerment',
  'Health',
  'Advocacy',
  'Service Delivery',
  'Community Engagement'
];

const SUB_COUNTIES = [
  'Tongaren',
  'Kimilili',
  'Webuye East',
  'Mt. Elgon',
  'Ndalu',
  'Mbakalo',
  'Bumula',
  'Kanduyi',
  'Sirisia'
];

export default function ProgramForm({ onClose, onSave, program }: ProgramFormProps) {
  const isEditing = !!program;

  const [formData, setFormData] = useState({
    name: program?.name || '',
    description: program?.description || '',
    category: program?.category || 'Education' as ProgramCategory,
    targetAudience: program?.targetAudience || '',
    location: program?.location || '',
    goal: program?.goal || '',
    startDate: program?.startDate || '',
    endDate: program?.endDate || '',
    budget: program?.budget?.toString() || '',
    partners: program?.partners?.join(', ') || '',
    keyActivities: program?.keyActivities?.join('\n') || '',
    subPrograms: program?.subPrograms?.join(', ') || '',
    teamMembers: program?.teamMembers?.join(', ') || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save draft
  useEffect(() => {
    if (!isEditing && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        localStorage.setItem('program_draft', JSON.stringify(formData));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData, isEditing]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Program name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Program name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.targetAudience.trim()) {
      newErrors.targetAudience = 'Target audience is required';
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (formData.budget && isNaN(Number(formData.budget))) {
      newErrors.budget = 'Budget must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({
      name: true,
      description: true,
      targetAudience: true,
    });

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const programData: Partial<Program> = {
        ...program,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        targetAudience: formData.targetAudience,
        location: formData.location || undefined,
        goal: formData.goal || undefined,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        budget: formData.budget ? Number(formData.budget) : undefined,
        partners: formData.partners ? formData.partners.split(',').map(p => p.trim()).filter(Boolean) : undefined,
        keyActivities: formData.keyActivities ? formData.keyActivities.split('\n').map(a => a.trim()).filter(Boolean) : undefined,
        subPrograms: formData.subPrograms ? formData.subPrograms.split(',').map(s => s.trim()).filter(Boolean) : undefined,
        teamMembers: formData.teamMembers ? formData.teamMembers.split(',').map(t => t.trim()).filter(Boolean) : undefined,
        progress: program?.progress || 0,
        tasks: program?.tasks || 0,
        completedTasks: program?.completedTasks || 0,
      };

      await onSave(programData);
      
      if (!isEditing && typeof window !== 'undefined') {
        localStorage.removeItem('program_draft');
      }
    } catch (error) {
      console.error('Failed to save program:', error);
      alert('Failed to save program. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  const handleCancel = () => {
    const hasChanges = 
      formData.name !== (program?.name || '') ||
      formData.description !== (program?.description || '');

    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Edit Program' : 'Create New Program'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isEditing ? 'Update program details' : 'Set up a new GirlPower program'}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FolderOpen size={20} className="text-purple-600" />
              Basic Information
            </h3>

            {/* Program Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Ndoto Curriculum Training"
              />
              {touched.name && errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Category and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {PROGRAM_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  Location (Sub-County)
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Bungoma County</option>
                  {SUB_COUNTIES.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText size={16} className="inline mr-1" />
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={() => handleBlur('description')}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                  touched.description && errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the program's purpose, approach, and expected outcomes..."
              />
              {touched.description && errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Target & Goals */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Target size={20} className="text-purple-600" />
              Target & Goals
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users size={16} className="inline mr-1" />
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  onBlur={() => handleBlur('targetAudience')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    touched.targetAudience && errors.targetAudience ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Adolescent girls aged 14-19"
                />
                {touched.targetAudience && errors.targetAudience && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.targetAudience}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Goal
                </label>
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Reach 200 schools by December 2025"
                />
              </div>
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Calendar size={20} className="text-purple-600" />
              Timeline & Budget
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  onBlur={() => handleBlur('endDate')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.endDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (KES)
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  onBlur={() => handleBlur('budget')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.budget ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 500000"
                />
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.budget}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800">Additional Details</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Activities (one per line)
              </label>
              <textarea
                name="keyActivities"
                value={formData.keyActivities}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="3-month training sessions&#10;Peer education programs&#10;Community awareness campaigns"
              />
              <p className="mt-1 text-xs text-gray-500">Enter each activity on a new line</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub-Programs (comma-separated)
                </label>
                <input
                  type="text"
                  name="subPrograms"
                  value={formData.subPrograms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Ndoto Champs, In-School Ndoto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partners (comma-separated)
                </label>
                <input
                  type="text"
                  name="partners"
                  value={formData.partners}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., UNAIDS, NSDCC, Tiko Africa"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Members (comma-separated)
              </label>
              <input
                type="text"
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Sarah K., Mary N., Grace O."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {isEditing ? 'Update Program' : 'Create Program'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          {/* Helper Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Make sure to align your program with GirlPower&apos;s core focus areas: SRHR, HIV/AIDS, GBV Prevention, and Menstrual Health.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}