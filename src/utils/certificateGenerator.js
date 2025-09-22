// utils/certificateGenerator.js
export const generateModernCertificate = (application) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // High resolution for crisp output
    const scale = 2;
    canvas.width = 1200 * scale;
    canvas.height = 800 * scale;
    ctx.scale(scale, scale);
    
    const width = 1200;
    const height = 800;
    
    // Modern gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#f8fafc');
    bgGradient.addColorStop(0.5, '#ffffff');
    bgGradient.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Modern border design
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, width - 80, height - 80);
    
    // Inner accent border
    ctx.strokeStyle = '#007AFF';
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, width - 120, height - 120);
    
    // Header section with modern gradient
    const headerGradient = ctx.createLinearGradient(0, 80, width, 200);
    headerGradient.addColorStop(0, '#007AFF');
    headerGradient.addColorStop(0.5, '#5AC8FA');
    headerGradient.addColorStop(1, '#007AFF');
    ctx.fillStyle = headerGradient;
    ctx.fillRect(80, 80, width - 160, 120);
    
    // Government emblem (modern circle design)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(150, 140, 35, 0, 2 * Math.PI);
    ctx.fill();
    
    // Inner emblem circle
    ctx.fillStyle = '#007AFF';
    ctx.beginPath();
    ctx.arc(150, 140, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Emblem star
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★', 150, 146);
    
    // Header text with modern typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GOVERNMENT OF INDIA', width / 2, 120);
    
    ctx.font = '20px SF Pro Display, -apple-system, sans-serif';
    ctx.fillText('Municipal Corporation', width / 2, 150);
    
    ctx.font = '16px SF Pro Display, -apple-system, sans-serif';
    ctx.fillText('Digital Trade License Authority', width / 2, 175);
    
    // Certificate title with modern styling
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 42px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TRADE LICENSE CERTIFICATE', width / 2, 280);
    
    // Decorative line under title
    const lineGradient = ctx.createLinearGradient(300, 300, 900, 300);
    lineGradient.addColorStop(0, 'transparent');
    lineGradient.addColorStop(0.5, '#007AFF');
    lineGradient.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.lineTo(900, 300);
    ctx.stroke();
    
    // Certificate body with modern card design
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 20;
    ctx.fillRect(120, 340, width - 240, 280);
    ctx.shadowColor = 'transparent';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    
    // Certificate content with modern layout
    ctx.fillStyle = '#1e293b';
    ctx.font = '18px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    
    // Left column
    const leftX = 160;
    const rightX = 650;
    let currentY = 380;
    const lineHeight = 35;
    
    // License details with modern typography
    const details = [
      { label: 'License Number', value: application.licenseNumber, highlight: true },
      { label: 'Business Name', value: application.businessName },
      { label: 'License Holder', value: application.applicantName },
      { label: 'Business Type', value: application.businessType },
      { label: 'License Category', value: application.licenseType },
      { label: 'Business Address', value: application.businessAddress, wrap: true },
    ];
    
    details.forEach((detail, index) => {
      if (index === 3) {
        currentY = 380;
      }
      const x = index < 3 ? leftX : rightX;
      
      // Label
      ctx.fillStyle = '#64748b';
      ctx.font = '14px SF Pro Display, -apple-system, sans-serif';
      ctx.fillText(detail.label.toUpperCase(), x, currentY);
      
      // Value
      ctx.fillStyle = detail.highlight ? '#007AFF' : '#1e293b';
      ctx.font = detail.highlight ? 'bold 18px SF Pro Display, -apple-system, sans-serif' : '16px SF Pro Display, -apple-system, sans-serif';
      
      if (detail.wrap && detail.value.length > 35) {
        const words = detail.value.split(' ');
        let line = '';
        let testLine = '';
        let lineY = currentY + 20;
        
        for (let n = 0; n < words.length; n++) {
          testLine = line + words[n] + ' ';
          if (ctx.measureText(testLine).width > 200) {
            ctx.fillText(line, x, lineY);
            line = words[n] + ' ';
            lineY += 20;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, lineY);
      } else {
        ctx.fillText(detail.value, x, currentY + 20);
      }
      
      if (index < 3) {
        currentY += lineHeight + 25;
      } else {
        currentY += lineHeight + 25;
      }
    });
    
    // Validity section with modern design
    const validityY = 550;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(160, validityY, width - 320, 60);
    
    ctx.fillStyle = '#64748b';
    ctx.font = '14px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VALIDITY PERIOD', width / 2, validityY + 20);
    
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 18px SF Pro Display, -apple-system, sans-serif';
    const issueDate = new Date(application.createdAt).toLocaleDateString('en-GB');
    const expiryDate = new Date(application.expiryDate).toLocaleDateString('en-GB');
    ctx.fillText(`${issueDate} to ${expiryDate}`, width / 2, validityY + 45);
    
    // QR Code section with modern styling
    const qrX = width - 200;
    const qrY = 360;
    
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(qrX, qrY, 120, 120);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(qrX, qrY, 120, 120);
    
    // QR code placeholder with modern design
    ctx.fillStyle = '#1e293b';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(qrX + 10 + i * 10, qrY + 10 + j * 10, 8, 8);
        }
      }
    }
    
    ctx.fillStyle = '#64748b';
    ctx.font = '11px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to Verify', qrX + 60, qrY + 140);
    
    // Digital signature section
    const sigY = 660;
    ctx.fillStyle = '#64748b';
    ctx.font = '12px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Digitally Signed By:', 160, sigY);
    
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px SF Pro Display, -apple-system, sans-serif';
    ctx.fillText('Municipal Commissioner', 160, sigY + 20);
    
    // Date and verification
    ctx.fillStyle = '#64748b';
    ctx.font = '12px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`Generated on: ${new Date().toLocaleDateString('en-GB')}`, width - 160, sigY);
    ctx.fillText('Certificate ID: ' + application.licenseNumber.replace('TL-', 'CERT-'), width - 160, sigY + 20);
    
    // Footer with modern styling
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('This is a computer-generated certificate and does not require a physical signature.', width / 2, height - 60);
    ctx.fillText('Valid for all legal and commercial purposes as per Digital India Act.', width / 2, height - 45);
    ctx.fillText('For verification, visit: verify.municipal.gov.in', width / 2, height - 30);
    
    // Convert to high-quality image
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/png', 1.0);
  });
};

export const downloadCertificate = async (application) => {
  try {
    const certificateUrl = await generateModernCertificate(application);
    
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = `Trade_License_Certificate_${application.licenseNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(certificateUrl);
    return { success: true };
  } catch (error) {
    console.error('Certificate generation failed:', error);
    return { success: false, error: error.message };
  }
};
