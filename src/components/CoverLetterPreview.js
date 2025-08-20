import React, { useState } from 'react';
import { generateCoverLetter } from '../utils/coverLetterGenerator';
import { saveCoverLetterPDF } from '../utils/pdfGenerator';
import { FileText, Edit3, Download, Copy, Check, Sparkles, Type } from 'lucide-react';

const CoverLetterPreview = ({ profile, jobDescription, onGenerate }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [selectedFont, setSelectedFont] = useState('times');

  const fontOptions = [
    { value: 'times', label: 'Times New Roman', preview: 'Times New Roman' },
    { value: 'helvetica', label: 'Arial', preview: 'Arial' },
    { value: 'courier', label: 'Courier New', preview: 'Courier New' }
  ];

  const handleGenerate = async () => {
    if (!profile || !jobDescription) {
      alert('Please fill out your profile and add a job description first.');
      return;
    }

    setGenerating(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const generated = generateCoverLetter(profile, jobDescription);
      setCoverLetter(generated);
      setEditedContent(generated);
      setIsEditing(false);
      setGenerating(false);
      if (onGenerate) onGenerate(generated);
    }, 1500);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(coverLetter);
  };

  const handleSave = () => {
    setCoverLetter(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(coverLetter);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = coverLetter;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true);
    try {
      await saveCoverLetterPDF(coverLetter, profile, selectedFont);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const canGenerate = profile && profile.fullName && profile.skills && profile.experience && jobDescription;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Cover Letter</h2>
        </div>
        
        {!coverLetter && (
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || generating}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Cover Letter
              </>
            )}
          </button>
        )}
      </div>

      {!canGenerate && !coverLetter && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Your Cover Letter</h3>
          <p className="text-gray-600 mb-4">
            Complete your profile and add a job description to generate a tailored cover letter.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="font-medium text-yellow-900 mb-2">Required Information:</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Full name and contact details</li>
              <li>• Skills and technologies</li>
              <li>• Professional experience</li>
              <li>• Job description text</li>
            </ul>
          </div>
        </div>
      )}

      {coverLetter && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Cover Letter Preview</span>
              {isEditing && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Editing Mode
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              )}
              
              <button
                onClick={handleCopy}
                className="btn-secondary flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              
              <button
                onClick={handleDownloadPDF}
                disabled={generatingPDF}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {generatingPDF ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {generatingPDF ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </div>

          {/* Font Selection */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">PDF Font:</span>
            </div>
            <div className="flex gap-3">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setSelectedFont(font.value)}
                  className={`px-3 py-2 rounded border text-sm transition-colors ${
                    selectedFont === font.value
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                  style={{ fontFamily: font.preview }}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cover Letter Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[800px] max-w-[8.5in] mx-auto shadow-sm">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-full min-h-[800px] p-0 border-0 resize-none focus:outline-none focus:ring-0 font-mono text-sm leading-relaxed"
                placeholder="Your cover letter content..."
              />
            ) : (
              <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {coverLetter}
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>
              {coverLetter.length} characters • {coverLetter.split('\n').length} lines
            </span>
            <button
              onClick={handleGenerate}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Regenerate
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoverLetterPreview;
