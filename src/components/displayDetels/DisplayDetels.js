import React from 'react';
import './displayDetels.css';

function DisplayDetails({ item, onBack }) {
  // const pdfFile = require(`./ss (3).pdfs/${item.file}`); // قم بتعديل المسار حسب مكان تخزين الملف

  return (
    <div className="details-container">
      <h2>تفاصيل السجل</h2>
      <div className="detail-item">
        <p><strong>الاولوية:</strong> {item.priority}</p>
      </div>
      <div className="detail-item">
        <p><strong>جهة الارسال:</strong> {item.sender}</p>
      </div>
      <div className="detail-item">
        <p><strong>الموضوع:</strong> {item.subject}</p>
      </div>
      <div className="detail-item">
        <p><strong>الملاحظات:</strong> {item.notes}</p>
      </div>
      <div className="detail-item">
        <p><strong>التاريخ:</strong> {new Date(item.date).toLocaleDateString()}</p>
      </div>
      <div className="file-container">
        <p><strong>عرض الملف:</strong></p>
        <iframe 
          src="img\ss.pdf"
          title="PDF Viewer" 
          className="pdf-viewer" 
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <button onClick={onBack} className="back-button">رجوع</button>
    </div>
  );
}

export default DisplayDetails;
