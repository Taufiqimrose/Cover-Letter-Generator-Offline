// Professional cover letter generation utility
// Creates compelling, US-standard cover letters with sophisticated content

const generateCoverLetter = (profile, jobDescription) => {
  if (!profile || !jobDescription) {
    return '';
  }

  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobDescription.toLowerCase());

  // Extract user skills
  const userSkills = profile.skills ? profile.skills.toLowerCase().split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 0) : [];

  // Find matching skills
  const matchingSkills = userSkills.filter(skill =>
    jobKeywords.some(keyword => skill.includes(keyword) || keyword.includes(skill))
  );

  // Generate professional cover letter
  return createProfessionalCoverLetter(profile, jobDescription, matchingSkills);
};

// Extract keywords from job description
const extractKeywords = (text) => {
  const commonKeywords = [
    'javascript', 'react', 'node.js', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go',
    'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'docker', 'kubernetes',
    'git', 'agile', 'scrum', 'api', 'rest', 'graphql', 'typescript', 'angular', 'vue', 'svelte',
    'machine learning', 'ai', 'data science', 'analytics', 'frontend', 'backend', 'full stack',
    'devops', 'ci/cd', 'testing', 'unit test', 'integration test', 'ui/ux', 'responsive design',
    'mobile', 'ios', 'android', 'flutter', 'react native', 'web development', 'software engineering',
    'programming', 'coding', 'development', 'engineering', 'architecture', 'design patterns',
    'microservices', 'serverless', 'cloud', 'database', 'nosql', 'redis', 'elasticsearch',
    'kafka', 'rabbitmq', 'nginx', 'apache', 'linux', 'unix', 'windows', 'macos'
  ];

  const words = text.toLowerCase().split(/\s+/);
  return words.filter(word => 
    commonKeywords.some(keyword => 
      word.includes(keyword) || keyword.includes(word)
    )
  );
};

const createProfessionalCoverLetter = (profile, jobDescription, matchingSkills) => {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Extract position information
  const positionInfo = extractPositionInfo(jobDescription);

  // Create professional sections
  const header = createHeader(profile, today);
  const greeting = 'Dear Hiring Manager,';
  const opening = createCompellingOpening(profile, positionInfo, matchingSkills);
  const experienceSection = createExperienceSection(profile, jobDescription, matchingSkills);
  const skillsSection = createSkillsSection(matchingSkills, jobDescription);
  const closing = createProfessionalClosing(profile);
  const signature = createSignature(profile);

  return `${header}

${greeting}

${opening}

${experienceSection}

${skillsSection}

${closing}

${signature}`;
};

const createHeader = (profile, date) => {
  const header = [];

  // Name and contact info
  header.push(profile.fullName);
  if (profile.email) header.push(profile.email);
  if (profile.phone) header.push(profile.phone);
  if (profile.location) header.push(profile.location);
  if (profile.linkedin) header.push(profile.linkedin);

  header.push(''); // Empty line
  header.push(date);
  header.push(''); // Empty line

  return header.join('\n');
};

const extractPositionInfo = (jobDescription) => {
  // Extract job title
  const titleMatch = jobDescription.match(/(?:position|role|job|opportunity|seeking)\s+(?:of|as)?\s+([A-Z][a-zA-Z\s]+?)(?:\s|$|,|\.)/i);
  const jobTitle = titleMatch ? titleMatch[1].trim() : 'this position';

  // Extract key requirements
  const requirements = [];
  const reqMatch = jobDescription.match(/requirements?[:\s]+([^.]*)/i);
  if (reqMatch) {
    requirements.push(...reqMatch[1].split(/[,\n]/).map(r => r.trim()).filter(r => r.length > 0));
  }

  return { jobTitle, requirements };
};

const createCompellingOpening = (profile, positionInfo, matchingSkills) => {
  const skillCount = matchingSkills.length;
  const jobTitle = positionInfo.jobTitle;

  if (skillCount >= 5) {
    return `I am writing to express my strong interest in the ${jobTitle} position. With over ${Math.floor(Math.random() * 3) + 3} years of experience in ${matchingSkills.slice(0, 3).join(', ')}, I am confident that my technical expertise and proven track record of delivering innovative solutions align perfectly with your requirements.`;
  } else if (skillCount >= 3) {
    return `I am excited to apply for the ${jobTitle} role. My experience with ${matchingSkills.join(', ')} combined with my passion for creating impactful solutions makes me an ideal candidate for this opportunity.`;
  } else {
    return `I am writing to express my interest in the ${jobTitle} position. While I may not have experience with all the specific technologies mentioned, I am a quick learner with a strong foundation in software development and a proven ability to adapt to new technologies and deliver results.`;
  }
};

const createExperienceSection = (profile, jobDescription, matchingSkills) => {
  if (!profile.experience || profile.experience.trim().length < 10) {
    return "Throughout my career, I have demonstrated a strong ability to write clean, maintainable code and collaborate effectively with cross-functional teams. My experience includes working on various projects that have helped me develop strong problem-solving skills and the ability to work effectively in fast-paced environments.";
  }

  // Extract relevant experience points
  const experiencePoints = profile.experience.split(/[.!?]/).filter(point =>
    point.trim().length > 20 &&
    matchingSkills.some(skill => point.toLowerCase().includes(skill))
  );

  if (experiencePoints.length > 0) {
    const relevantExperience = experiencePoints.slice(0, 2).join('. ') + '.';
    return `In my previous roles, I have consistently delivered high-quality solutions through technical expertise and collaborative problem-solving. ${relevantExperience} This experience has prepared me well for the challenges and opportunities in this role.`;
  }

  // Create a compelling experience summary
  const experienceSummary = profile.experience.substring(0, 300).trim();
  if (experienceSummary.length > 50) {
    return `My professional experience includes ${experienceSummary}... This background has equipped me with the skills and mindset needed to contribute effectively to your team and drive meaningful results.`;
  }

  return "Throughout my career, I have demonstrated a strong ability to write clean, maintainable code and collaborate effectively with cross-functional teams. My experience includes working on various projects that have helped me develop strong problem-solving skills and the ability to work effectively in fast-paced environments.";
};

const createSkillsSection = (matchingSkills, jobDescription) => {
  if (matchingSkills.length === 0) {
    return "I am committed to continuous learning and am confident in my ability to quickly become proficient with any new technologies or frameworks required for this role. My strong analytical skills, attention to detail, and collaborative approach will enable me to contribute effectively to your development team.";
  }

  const skillList = matchingSkills.slice(0, 5).join(', ');

  return `My technical skills include ${skillList}, which directly align with the requirements for this position. I am particularly experienced in applying these technologies to solve real-world problems and deliver user-focused solutions that drive business value. I am also comfortable learning new technologies quickly and adapting to evolving project requirements, which I believe will be valuable in your dynamic environment.`;
};

const createProfessionalClosing = (profile) => {
  return `I am excited about the opportunity to contribute to your organization and would welcome the chance to discuss how my skills and experience can benefit your team. I am particularly drawn to your mission and believe my background would be a great fit for your organization.

I am available for an interview at your convenience and look forward to learning more about this opportunity. Thank you for considering my application.`;
};

const createSignature = (profile) => {
  return `Sincerely,

${profile.fullName}`;
};

export { generateCoverLetter };
