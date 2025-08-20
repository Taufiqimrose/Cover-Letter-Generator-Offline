// Professional PDF generator for cover letters using jsPDF
import jsPDF from 'jspdf';

export const generateCoverLetterPDF = async (coverLetterContent, profile, selectedFont = 'times') => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF();
    
    // Set font
    pdf.setFont(selectedFont);
    pdf.setFontSize(12);
    
    // Set margins (1 inch = 72 points)
    const margin = 72;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (2 * margin);
    let yPosition = margin + 20;
    
    // Add name
    pdf.setFontSize(16);
    pdf.setFont(selectedFont, 'bold');
    pdf.text(profile.fullName, margin, yPosition);
    yPosition += 16;
    pdf.setFontSize(12);
    pdf.setFont(selectedFont, 'normal');
    
    // Add contact info
    if (profile.email) {
      pdf.setFontSize(10);
      pdf.text(profile.email, margin, yPosition);
      yPosition += 8;
    }
    if (profile.phone) {
      pdf.text(profile.phone, margin, yPosition);
      yPosition += 8;
    }
    if (profile.location) {
      pdf.text(profile.location, margin, yPosition);
      yPosition += 8;
    }
    if (profile.linkedin) {
      pdf.text(profile.linkedin, margin, yPosition);
      yPosition += 8;
    }
    
    // Add date
    yPosition += 12;
    pdf.setFontSize(12);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    pdf.text(date, margin, yPosition);
    yPosition += 20;
    
    // Add greeting
    yPosition += 8;
    pdf.text('Dear Hiring Manager,', margin, yPosition);
    yPosition += 16;
    
    // Add body content
    const lines = coverLetterContent.split('\n').filter(line => 
      line.trim() !== '' && 
      line !== profile.fullName &&
      line !== profile.email &&
      line !== profile.phone &&
      line !== profile.location &&
      line !== profile.linkedin &&
      !line.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) &&
      !line.match(/^[A-Za-z]+ \d{1,2}, \d{4}$/) &&
      !line.startsWith('Dear') &&
      line !== 'Sincerely,' &&
      line !== profile.fullName
    );
    
    lines.forEach(line => {
      // Split long lines to fit page width
      const words = line.split(' ');
      let currentLine = '';
      
      words.forEach((word) => {
        const testLine = currentLine + word + ' ';
        const textWidth = pdf.getTextWidth(testLine);
        
        if (textWidth > contentWidth && currentLine !== '') {
          pdf.text(currentLine, margin, yPosition);
          yPosition += 8;
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      });
      
      if (currentLine.trim()) {
        pdf.text(currentLine, margin, yPosition);
        yPosition += 8;
      }
    });
    
    // Add signature
    yPosition += 12;
    pdf.text('Sincerely,', margin, yPosition);
    yPosition += 12;
    pdf.setFont(selectedFont, 'bold');
    pdf.text(profile.fullName, margin, yPosition);
    
    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const saveCoverLetterPDF = async (coverLetterContent, profile, selectedFont = 'times') => {
  try {
    const blob = await generateCoverLetterPDF(coverLetterContent, profile, selectedFont);
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cover-letter-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error saving PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};
