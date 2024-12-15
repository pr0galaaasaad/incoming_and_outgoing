import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import DisplayDetails from '../displayDetels/DisplayDetels'; // استيراد مكون DisplayDetails

function Incoming() {
  const [incomingData, setIncomingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null); // حالة لتخزين السطر المحدد

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL('https://mary.pythonanywhere.com/incomings/');
        const params = {
          page: page,
          title: searchTerm,
        };

        Object.keys(params).forEach(key => {
          if (params[key]) {
            url.searchParams.append(key, params[key]);
          }
        });

        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTotalCount(data.count);

        const formattedData = data.results.map(item => ({
          id: item.id, // افترض أن هناك خاصية id في البيانات
          priority: item.urgency === 'very urgent' ? 'عالي' : 'عادي',
          sender: item.sender,
          subject: item.title,
          notes: item.notes,
          date: item.date,
          file: item.file,
        }));

        setIncomingData(formattedData);
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

  const handleRowClick = (item) => {
    setSelectedItem(item); // حفظ السطر المحدد
  };

  const handleBack = () => {
    setSelectedItem(null); // إعادة تعيين السطر المحدد
  };

  const filteredData = incomingData.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.priority.toLowerCase().includes(searchTermLower) ||
      item.sender.toLowerCase().includes(searchTermLower) ||
      item.subject.toLowerCase().includes(searchTermLower) ||
      item.notes.toLowerCase().includes(searchTermLower) ||
      item.date.toLowerCase().includes(searchTermLower) ||
      (item.file && item.file.toLowerCase().includes(searchTermLower))
    );
  });

  if (selectedItem) {
    return <DisplayDetails item={selectedItem} onBack={handleBack} />; // عرض تفاصيل السطر المحدد
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">الارشيف</h1>
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

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <strong>إجمالي السجلات: {filteredData.length}</strong>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">الاولوية</th>
            <th scope="col">جهة الارسال</th>
            <th scope="col">الموضوع</th>
            <th scope="col">الملاحظات</th>
            <th scope="col">التاريخ</th>
            <th scope="col">الملف</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item)}> {/* النقر على السطر */}
              <td className={`text-${item.priority === 'عالي' ? 'danger' : 'success'}`}>{item.priority}</td>
              <td>{item.sender}</td>
              <td>{item.subject}</td>
              <td >{item.notes}</td>
              <td>{item.date}</td>
              <td><a href={item.file} target="_blank" rel="noopener noreferrer">Download</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page} of {Math.ceil(totalCount / 10)}</span>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Incoming;