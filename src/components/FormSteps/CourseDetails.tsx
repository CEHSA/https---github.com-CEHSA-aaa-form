import type { FC } from 'react';
import { FormData } from '../../types/FormData';

interface CourseDetailsProps {
  formData: Pick<FormData, 'institution' | 'courseName' | 'yearOfStudy' | 'studentNumber' | 'enrolledCourse'>;
  onFormDataChange: (newData: Partial<FormData>) => void;
}

export const CourseDetails: FC<CourseDetailsProps> = ({ formData, onFormDataChange }) => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto px-4">
      <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">Course Details</h2>
        
        <div className="space-y-4">
          {/* Institution */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="institution" className="text-white/70">
              Educational Institution
            </label>
            <input
              type="text"
              id="institution"
              value={formData.institution || ''}
              onChange={(e) => onFormDataChange({ institution: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Course Name */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="courseName" className="text-white/70">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              value={formData.courseName || ''}
              onChange={(e) => onFormDataChange({ courseName: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Year of Study */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="yearOfStudy" className="text-white/70">
              Year of Study
            </label>
            <select
              id="yearOfStudy"
              value={formData.yearOfStudy || ''}
              onChange={(e) => onFormDataChange({ yearOfStudy: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            >
              <option value="" disabled>Select year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
              <option value="5">Fifth Year</option>
              <option value="6">Sixth Year</option>
              <option value="postgrad">Postgraduate</option>
            </select>
          </div>

          {/* Student Number */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="studentNumber" className="text-white/70">
              Student Number
            </label>
            <input
              type="text"
              id="studentNumber"
              value={formData.studentNumber || ''}
              onChange={(e) => onFormDataChange({ studentNumber: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Course Currently Enrolled For */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="enrolledCourse" className="text-white/70">
              Course Currently Enrolled For
            </label>
            <input
              type="text"
              id="enrolledCourse"
              value={formData.enrolledCourse || ''}
              onChange={(e) => onFormDataChange({ enrolledCourse: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}