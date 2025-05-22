import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lấy danh sách người dùng đã đăng ký
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Tìm user có email và password khớp
        const existingUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (existingUser) {
            // Lưu người dùng vào localStorage
            const user = { email };
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/booking');
        } else {
            setError('Email wrong...');
        }
    };
    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                        placeholder='Put email' />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                        placeholder='Put password' />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type='submit'>Login</button>
            </form>

            {/*Chuyển sang trang đăng ký nếu chưa có tài khoản*/}
            <p style={{ marginTop: '15px', fontSize: '14px' }}>
                Chưa có tài khoản ?{' '}
                <span
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => navigate('/signup')}
                >
                    Đăng ký tại đây
                </span>
            </p>
        </div>
    )
}

export default Login;
