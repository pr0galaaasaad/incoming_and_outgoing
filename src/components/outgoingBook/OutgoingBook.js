import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './outgoingBook.css'; // ملف CSS المخصص لإضافة الأنماط

const OutgoingBook = () => {
    const [formData, setFormData] = useState({
        sender: '',
        subject: '',
        number: '',
        date: '',
        priority: '',
        notes: '',
        file: null // إضافة حالة لتخزين الملف
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0] // تخزين الملف المحدد
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // إعداد البيانات لإرسالها إلى واجهة برمجة التطبيقات
        const dataToSend = new FormData();
        dataToSend.append('title', formData.subject);
        dataToSend.append('sender', formData.sender);
        dataToSend.append('notes', formData.notes);
        dataToSend.append('urgency', formData.priority === 'high' ? 'very urgent' : (formData.priority === 'medium' ? 'urgent' : 'normal'));
        dataToSend.append('number', Number(formData.number));
        if (formData.file) {
            dataToSend.append('file', formData.file); // إضافة الملف إلى البيانات
        }

        try {
            const response = await fetch('https://mary.pythonanywhere.com/outgoings/', {
                method: 'POST',
                body: dataToSend // إرسال البيانات كـ FormData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Form submitted successfully:', responseData);
            
            // إظهار رسالة نجاح
            alert('تم إضافة البيانات بنجاح!');
            
            // إعادة تحميل الصفحة
            window.location.reload();

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">إنشاء كتاب صادر</h2>
            <form onSubmit={handleSubmit} className="text-right">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="subject">الموضوع</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">التاريخ</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes">الملاحظات</label>
                            <input
                                type="text"
                                className="form-control"
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="sender">جهة الإرسال</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sender"
                                name="sender"
                                value={formData.sender}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">العدد</label>
                            <input
                                type="number"
                                className="form-control"
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">الأولوية</label>
                            <select
                                className="form-control"
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="">اختر أولوية</option>
                                <option value="high">عالية</option>
                                <option value="medium">متوسطة</option>
                                <option value="low">منخفضة</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">إرفاق ملف</label>
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                name="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="button btn-primary btn-block">إضافة</button>
            </form>
        </div>
    );
};

export default OutgoingBook;
