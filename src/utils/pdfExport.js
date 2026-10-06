import html2pdf from 'html2pdf.js';

/**
 * Exports a target DOM element to a clean, high-resolution A4 PDF.
 * @param {HTMLElement} element - The DOM node to render into PDF
 * @param {string} fileName - Desired file name for download
 */
export const exportToPdf = async (element, fileName = 'resume.pdf') => {
  if (!element) {
    throw new Error('Element to export was not found.');
  }

  const opt = {
    margin: [10, 10, 10, 10], // mm margins
    filename: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
