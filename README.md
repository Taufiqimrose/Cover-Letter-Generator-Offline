# Cover Letter Generator

A modern, professional web application for generating tailored cover letters using React.js and Tailwind CSS. No authentication required - your data is saved locally in your browser.

## Features

- **Profile Management**: Save and manage your professional profile (skills, experience, contact info) in local storage
- **Job Description Input**: Paste job descriptions or URLs (URL parsing coming soon)
- **Smart Cover Letter Generation**: AI-free keyword matching and template-based generation
- **Real-time Preview**: Edit and customize generated cover letters
- **Export Options**: Download as PDF or copy to clipboard
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Offline First**: Works completely offline with local data storage

## Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS
- **Data Storage**: Browser localStorage
- **PDF Generation**: react-to-pdf
- **Icons**: Lucide React
- **Build Tool**: Create React App

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd cover-letter-generator
npm install
```

### 2. Start the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage Guide

### 1. Profile Setup
- Fill out your professional profile including:
  - Full name and contact information
  - Skills and technologies
  - Professional experience
  - Education and certifications
- Your profile is automatically saved to local storage

### 2. Job Description
- Navigate to the "Job Description" tab
- Paste the complete job description text
- Include requirements, responsibilities, and qualifications for better results

### 3. Generate Cover Letter
- Go to the "Cover Letter" tab
- Click "Generate Cover Letter" to create a tailored cover letter
- The system will match your skills with job requirements

### 4. Edit and Export
- Review and edit the generated cover letter
- Copy to clipboard or download as PDF
- Regenerate if needed

## Project Structure

```
src/
├── components/
│   ├── ProfileForm.js          # User profile form
│   ├── JobDescriptionInput.js  # Job description input
│   └── CoverLetterPreview.js   # Cover letter preview and export
├── utils/
│   └── coverLetterGenerator.js # Cover letter generation logic
├── App.js                      # Main application component
├── index.js                    # React entry point
├── index.css                   # Global styles with Tailwind
```

## Cover Letter Generation Logic

The app uses a sophisticated keyword matching system instead of AI APIs:

1. **Keyword Extraction**: Identifies relevant skills and technologies from job descriptions
2. **Skill Matching**: Matches user skills with job requirements
3. **Template Generation**: Creates personalized cover letters using professional templates
4. **Dynamic Content**: Adapts content based on skill match count and experience

## Data Storage

- **Local Storage**: All profile data is saved in your browser's localStorage
- **Persistence**: Data persists between browser sessions and restarts
- **Privacy**: No data is sent to external servers
- **Offline**: Works completely offline

## Customization

### Styling
- Modify `tailwind.config.js` for custom colors and themes
- Update component styles in `src/index.css`

### Cover Letter Templates
- Edit `src/utils/coverLetterGenerator.js` to customize generation logic
- Add new keywords or modify template structure

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Any Static Hosting

The app can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3
- Any web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## Support

For issues and questions:
- Check the browser console for any JavaScript errors
- Ensure all dependencies are properly installed
- Verify that localStorage is enabled in your browser

## Future Enhancements

- URL parsing and job description scraping
- Multiple cover letter templates
- Resume integration
- Cover letter history and management
- Advanced AI-powered generation (optional)
- Multi-language support
- Export to different formats (Word, Google Docs)
- Cloud sync options (optional)
