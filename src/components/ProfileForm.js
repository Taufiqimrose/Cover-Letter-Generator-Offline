import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Briefcase, Award, Save } from 'lucide-react';

const ProfileForm = ({ profile: initialProfile, onProfileUpdate }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    experience: '',
    education: '',
    linkedin: ''
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load profile from props or localStorage
  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    } else {
      // Try to load from localStorage
      const savedProfile = localStorage.getItem('user-profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  }, [initialProfile]);

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('user-profile', JSON.stringify(profile));
      
      // Notify parent component
      if (onProfileUpdate) {
        onProfileUpdate(profile);
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
          Local Storage
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={profile.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="input-field"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="input-field"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="input-field pl-10"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="input-field pl-10"
              placeholder="City, State/Country"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={profile.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="input-field"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills & Technologies *
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              value={profile.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              className="input-field pl-10 min-h-[100px]"
              placeholder="List your key skills, technologies, and tools (e.g., JavaScript, React, Python, AWS, etc.)"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Experience *
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              value={profile.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className="input-field pl-10 min-h-[120px]"
              placeholder="Describe your relevant work experience, achievements, and responsibilities"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Education
          </label>
          <textarea
            value={profile.education}
            onChange={(e) => handleChange('education', e.target.value)}
            className="input-field min-h-[80px]"
            placeholder="Your educational background, degrees, certifications"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading || !profile.fullName || !profile.skills || !profile.experience}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? 'Saved!' : 'Save Profile'}
        </button>
      </div>

      {saved && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          Profile saved successfully to local storage!
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          <strong>Local Storage:</strong> Your profile data is automatically saved in your browser. 
          It will persist between sessions and browser restarts.
        </p>
      </div>
    </div>
  );
};

export default ProfileForm;
