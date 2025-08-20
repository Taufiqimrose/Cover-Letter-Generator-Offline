import React, { useState, useEffect } from 'react';
import ProfileForm from './components/ProfileForm';
import JobDescriptionInput from './components/JobDescriptionInput';
import CoverLetterPreview from './components/CoverLetterPreview';
import { FileText, User, Briefcase } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  // Load profile from localStorage on app start
  useEffect(() => {
    const savedProfile = localStorage.getItem('user-profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem('user-profile', JSON.stringify(updatedProfile));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'job', label: 'Job Description', icon: FileText },
    { id: 'cover-letter', label: 'Cover Letter', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Cover Letter Generator</h1>
            </div>
            <div className="text-sm text-gray-600">
              Your data is saved locally
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Job Description */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'profile' && (
              <ProfileForm 
                profile={profile}
                onProfileUpdate={handleProfileUpdate}
              />
            )}
            
            {activeTab === 'job' && (
              <JobDescriptionInput 
                onJobDescriptionChange={setJobDescription}
              />
            )}
          </div>

          {/* Right Column - Cover Letter Preview */}
          <div className="lg:col-span-1">
            <CoverLetterPreview 
              profile={profile}
              jobDescription={jobDescription}
              onGenerate={(generated) => {
                // Handle generated cover letter if needed
                console.log('Cover letter generated:', generated);
              }}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
