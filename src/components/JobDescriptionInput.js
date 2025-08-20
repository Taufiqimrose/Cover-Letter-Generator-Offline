import React, { useState } from 'react';
import { FileText, Link, AlertCircle } from 'lucide-react';

const JobDescriptionInput = ({ onJobDescriptionChange }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [inputType, setInputType] = useState('text'); // 'text' or 'url'
  const [showUrlMessage, setShowUrlMessage] = useState(false);

  const handleInputChange = (value) => {
    setJobDescription(value);
    onJobDescriptionChange(value);
  };

  const handleUrlInput = (url) => {
    setJobDescription(url);
    onJobDescriptionChange(url);
    setShowUrlMessage(true);
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setInputType('text');
              setShowUrlMessage(false);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              inputType === 'text'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Paste Job Description
          </button>
          <button
            onClick={() => {
              setInputType('url');
              setShowUrlMessage(true);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              inputType === 'url'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Link className="w-4 h-4 inline mr-2" />
            Job Posting URL
          </button>
        </div>

        {inputType === 'text' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste the job description text
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => handleInputChange(e.target.value)}
              className="input-field min-h-[200px]"
              placeholder="Paste the complete job description here. Include requirements, responsibilities, and any other relevant details..."
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter job posting URL
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={jobDescription}
                onChange={(e) => handleUrlInput(e.target.value)}
                className="input-field pl-10"
                placeholder="https://example.com/job-posting"
              />
            </div>
          </div>
        )}

        {showUrlMessage && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">URL Parsing Coming Soon</h4>
                <p className="text-blue-700 text-sm">
                  For now, please copy and paste the job description text directly. 
                  Automatic URL parsing and scraping will be available in future updates.
                </p>
              </div>
            </div>
          </div>
        )}

        {jobDescription && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Job Description Preview
              </span>
            </div>
            <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
              {jobDescription.length > 300 
                ? `${jobDescription.substring(0, 300)}...` 
                : jobDescription
              }
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {jobDescription.length} characters
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-900 mb-1">Tips for Better Results</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Include the complete job description with requirements and responsibilities</li>
              <li>• Make sure to include specific technologies, skills, and qualifications mentioned</li>
              <li>• The more detailed the job description, the better tailored your cover letter will be</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
