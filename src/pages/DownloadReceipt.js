import React from 'react';
import './DownloadReceipt.css';

const DownloadReceipt = () => {
  // Placeholder download handlers
  const handleDownloadLicense = () => {
    // Implement actual download logic here
    alert('License download started!');
  };

  const handleDownloadPayment = () => {
    // Implement actual download logic here
    alert('Payment receipt download started!');
  };

  return (
    <div className="download-receipt-container">
      <h2>Download License & Payment Receipt</h2>
      <div className="download-buttons">
        <button onClick={handleDownloadLicense} className="download-btn">Download License</button>
        <button onClick={handleDownloadPayment} className="download-btn">Download Payment Receipt</button>
      </div>
    </div>
  );
};

export default DownloadReceipt;
