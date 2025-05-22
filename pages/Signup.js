import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Signup() {
    const navigate = useNavigate();

    const [mode, setMode] = useState('signup'); // 'signup' hoặc 'profile'
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Kiểm tra nếu đã đăng nhập (có user trong localStorage)
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (currentUser) {
            const foundUser = users.find(u => u.email === currentUser.email);
            if (foundUser) {
                setName(foundUser.name);
                setDob(foundUser.dob);
                setEmail(foundUser.email);
                setPassword(foundUser.password);
                setMode('profile'); // Chuyển sang chế độ hiển thị thông tin
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra email đã đăng ký chưa
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert('Email này đã được đăng ký.');
            return;
        }

        const newUser = { name, dob, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify({ email }));

        alert('Đăng ký thành công!');
        navigate('/signup'); // Reload lại trang để hiển thị thông tin
    };

    return (
        <div className="login">
            <h2>{mode === 'signup' ? 'Đăng ký tài khoản' : 'Thông tin khách hàng'}</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    Họ tên:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        readOnly={mode === 'profile'}
                        placeholder="Nhập họ tên"
                    />
                </label>
                <label>
                    Ngày sinh:
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        readOnly={mode === 'profile'}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        readOnly={mode === 'profile'}
                        placeholder="Nhập email"
                    />
                </label>
                <label>
                    Mật khẩu:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        readOnly={mode === 'profile'}
                        placeholder="Nhập mật khẩu"
                    />
                </label>

                {mode === 'signup' && (
                    <button type="submit">Hoàn thành</button>
                )}
            </form>

            {/*  {mode === 'profile' && (
                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/login');
                    }}>
                        Đăng xuất
                    </button>
                </div>
            )}*/}
        </div>
    );
}

export default Signup;
