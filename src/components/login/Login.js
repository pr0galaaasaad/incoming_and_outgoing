// Login.js
import React, { useState } from 'react';
import './login.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const response = await fetch('https://mary.pythonanywhere.com/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            // يمكنك إعادة توجيه المستخدم أو تخزين التوكن هنا
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.detail || 'حدث خطأ غير متوقع');
        }

        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <div className="illustration">
                <img src="img/LogonIMG.jpg" alt="Illustration" />
            </div>
            <div className="login-form">
                <h1>نظام الصادر والوارد</h1>
                <p>يرجى إدخال معلومات الحساب لاستخدام النظام</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="اسم المستخدم"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'جاري التحقق...' : 'تسجيل دخول'}
                    </button>
                </form>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Login;