import { jsPDF } from "jspdf";

export const generateModernCertificate = (data) => {
  return new Promise((resolve) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Trade License", 105, 20);
    resolve(doc.output("dataurlstring"));
  });
};

export const downloadCertificate = (dataUrl, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};