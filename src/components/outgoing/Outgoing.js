import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayDetails from '../displayDetels/DisplayDetels'; // استيراد مكون DisplayDetails

function Outgoing() {
  const [OutgoingData, setOutgoingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDetails, setSelectedDetails] = useState(null); // تفاصيل السجل المحدد

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://mary.pythonanywhere.com/archive/';
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTotalCount(data.length);

        const formattedData = data.map(item => ({
          id: item.id, // تأكد من إضافة id
          priority: item.urgency === 'very urgent' ? 'عالي' : 'عادي',
          sender: item.sender,
          subject: item.title,
          notes: item.notes,
          date: item.archived_at,
          file: item.file,
        }));

        setOutgoingData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, [page]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / 10)) {
      setPage(newPage);
    }
  };

  const filteredData = OutgoingData.filter(item => {
    return (
      item.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(item.date).toLocaleDateString().includes(searchTerm)
    );
  });

  const filteredCount = filteredData.length;

  const handleRowClick = (item) => {
    setSelectedDetails(item); // تعيين التفاصيل المحددة
  };

  const handleBack = () => {
    setSelectedDetails(null); // إعادة تعيين السجل المحدد
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">الصادر</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="بحث..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={() => handlePageChange(1)}>بحث</button>
      </div>

      {error && <div className="alert alert-danger">{error}</ div>}

      <div className="mb-3">
        <strong>إجمالي السجلات: {filteredCount}</strong>
      </div>

      {selectedDetails ? (
        <DisplayDetails item={selectedDetails} onBack={handleBack} /> // عرض تفاصيل السجل المحدد
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">الاولوية</th>
              <th scope="col">جهة الارسال</th>
              <th scope="col">الموضوع</th>
              <th scope ="col">الملاحظات</th>
              <th scope="col">التاريخ</th>
              <th scope="col">الملف</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(item)}> {/* إضافة وظيفة النقر على السطر */}
                <td className={`text-${item.priority === 'عالي' ? 'danger' : 'success'}`}>{item.priority}</td>
                <td>{item.sender}</td>
                <td>{item.subject}</td>
                <td>{item.notes}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td><a href={item.file} target="_blank" rel="noopener noreferrer">Download</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mb-3">
        <strong>إجمالي السجلات الكلية: {totalCount}</strong>
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page} of {Math.ceil(totalCount / 10)}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(totalCount / 10)}>Next</button>
      </div>
    </div>
  );
}

export default Outgoing;