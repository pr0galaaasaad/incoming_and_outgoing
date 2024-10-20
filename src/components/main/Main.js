import React, { useState } from 'react';
import './Main.css';

function Main() {
  const [userData, setUser ] = useState({
    name: 'الاء', // الاسم باللغة العربية
    picture: '/img/usericon.png',
  });

  const [reportCounts, setReportCounts] = useState({
    incoming: 10,
    sent: 20,
    archived: 30,
  });

  const [activeContent, setActiveContent] = useState('incoming');

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="MainComponent" style={{ direction: 'rtl', textAlign: 'right' }}>
      <header className="header">
        <h1>الوارد والصادر</h1> {/* العربية لـ "Incoming and Outgoing" */}
      </header>
      <div className="container">
        <aside className="sidebar">
          <div className="user-info">
            <img src={userData.picture} alt="User  " />
            <h2>{userData.name}</h2>
          </div>
          <button
            className={`button ${activeContent === 'incoming' ? 'active' : ''}`}
            onClick={() => handleButtonClick('incoming')}
          >
            الوارد <span className="badge">{reportCounts.incoming}</span>
          </button>
          <button
            className={`button ${activeContent === 'sent' ? 'active' : ''}`}
            onClick={() => handleButtonClick('sent')}
          >
            الصادر <span className="badge">{reportCounts.sent}</span>
          </button>
          <button
            className={`button ${activeContent === 'archived' ? 'active' : ''}`}
            onClick={() => handleButtonClick('archived')}
          >
            الأرشيف <span className="badge">{reportCounts.archived}</span>
          </button>
        </aside>
        <main className="content">
          {activeContent === 'incoming' && <h2>التقارير الواردة</h2>}
          {activeContent === 'sent' && <h2>التقارير الصادرة</h2>}
          {activeContent === 'archived' && <h2>التقارير المؤرشفة</h2>}
        </main>
      </div>
    </div>
  );
}

export default Main;