import React from 'react';
import './Incoming.css';

function Incoming() {
  return (
    <div className="container">
      <h1>Incoming</h1>
      <input type="text" className="search-box" placeholder="Search..." />

      <table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Sender</th>
            <th>Subject</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Data */}
          <tr>
            <td>High</td>
            <td>john@example.com</td>
            <td>Meeting Reminder</td>
            <td>Discuss project updates</td>
            <td>2023-10-01</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>jane@example.com</td>
            <td>Weekly Report</td>
            <td>Submit by Friday</td>
            <td>2023-10-02</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default Incoming;