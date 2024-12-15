import React, { useState } from 'react';
import './Main.css';
import Incoming from '../incoming/Incoming';
import Outgoing from '../outgoing/Outgoing';
import Archives from '../archives/Archives';
import OutgoingBook from '../outgoingBook/OutgoingBook';


function Main() {
  const [userData] = useState({
    name: 'الاء',
    picture: '/img/usericon.png',
  });

  const [activeContent, setActiveContent] = useState('incoming');

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="MainComponent">
      <header className="header">
        <h1>نظام الوارد والصادر</h1>
      </header>
      <div className="Main-container">
        <aside className="sidebar">
          <div className="user-info">
            <img src="img\usericon.png" alt="User" className="img-fluid rounded-circle" />
            <h2>{userData.name}</h2>
          </div>
          <button
            className={`button ${activeContent === 'incoming' ? 'active' : ''}`}
            onClick={() => handleButtonClick('incoming')}
          >
            <img src="img\inbox.png" alt="Incoming" className="button-icon" /> الوارد
          </button>
          <button
            className={`button ${activeContent === 'sent' ? 'active' : ''}`}
            onClick={() => handleButtonClick('sent')}
          >
            <img src="img\inbox (1).png" alt="Sent" className="button-icon" /> الصادر
          </button>
          <button
            className={`button ${activeContent === 'archived' ? 'active' : ''}`}
            onClick={() => handleButtonClick('archived')}
          >
            <img src="img\inbox (2).png" alt="Archived" className="button-icon" /> الأرشيف
          </button>
          <button
            className={`button ${activeContent === 'addOutgoing' ? 'active' : ''}`}
            onClick={() => handleButtonClick('addOutgoing')}
          >
            <img src="img\add-post.png" alt="Add Outgoing" className="button-icon" /> إضافة كتاب صادر
          </button>
        </aside>
        <main className="Main-content">
          {activeContent === 'incoming' && <Incoming className="pages"/>}
          {activeContent === 'sent' && <Outgoing className="pages"/>}
          {activeContent === 'archived' && <Archives className="pages"/>}
          {activeContent === 'addOutgoing' && <OutgoingBook className="pages"/>}
        </main>
      </div>
    </div>
  );
}

export default Main;
