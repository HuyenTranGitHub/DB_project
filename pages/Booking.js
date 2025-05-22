import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/Booking.css';

function Booking() {
    const location = useLocation();
    const navigate = useNavigate();

    //lay du lieu concert
    const concert = location.state;

    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [available, setAvailable] = useState(concert?.available || 100);// nếu không có thông tin về available thì mặc định là 100
    const [total, setTotal] = useState(0);

    //lay thong tin khach hang
    // const [name, setName] = useState('');
    //const [phone, setPhone] = useState('');
    //const [dateOfBirth, setDateOfBirth] = useState('');

    //neu vao trang booking ma chua dang nhap hoac khong co du lieu -> redirect, về lại trang menu nếu k có user hoặc concert
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !concert) {
            navigate('/menu');
        }
    }, [navigate, concert]);
    //Tính tổng tiền mỗi khi số lượng (quantity) thay đổi
    useEffect(() => {
        const priceNumber = Number(concert?.price?.replace(/[^\d]/g, '') || 0); //Đây là regular expression (biểu thức chính quy) dùng để loại bỏ tất cả ký tự không phải là chữ số khỏi chuỗi concert.price.
        setTotal(priceNumber * quantity);
    }, [quantity, concert]);
    if (!concert) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                Không tìm thấy thông tin concert. Quay lại trang Menu nhé!
            </div>
        );
    }

    const handleBooking = () => {
        //if (!name || !phone || !dateOfBirth) {
        if (quantity === 0) {
            alert("Please chose quantity...");
            return;
        }
        if (quantity > available) {
            alert("The number of tickets exceeds the number of tickets remaining.");
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));

        const bookingData = {
            concertName: concert.name,
            date: concert.ngay,
            time: concert.gio,
            price: concert.price,
            quantity,
            totalPrice: total.toLocaleString() + '$',
            location: concert.location || 'Korea',
            userEmail: user.email,
            //customerInfo: {
            //  name,
            //phone,
            // dateOfBirth
            //},
            bookingTime: new Date().toLocaleDateString(),
        };

        const existing = JSON.parse(localStorage.getItem('bookings')) || [];
        existing.push(bookingData);
        localStorage.setItem('bookings', JSON.stringify(existing));

        setAvailable((prev) => prev - quantity);
        setBookingSuccess(true);

        //reset form
        // setName('');
        //setPhone('');
        //setDateOfBirth('');
        setQuantity(0);
    };

    return (
        <div className='booking'>
            {/* LEFT SIDE - Concert Info */}
            <div className='concert-form'>
                <h2>Concert Detail</h2>
                <p><strong>Name:</strong>{concert.name}</p>
                <p><strong>Date:</strong>{concert.ngay}</p>
                <p><strong>Time:</strong>{concert.gio}</p>
                <p><strong>Price:</strong>{concert.price}</p>
                <p><strong>Location:</strong>{concert.location || 'Korea'}</p>

            </div>
            {/*right side-booking form*/}
            <div className='booking-form'>
                <h3> information booking</h3>
                {/*Phan nay tu dien tu thong tin cua concert co san trong menu*/}
                <p><strong>Concert:</strong> {concert.name}</p>
                <p><strong>Date:</strong> {concert.ngay}</p>
                <p><strong>Time:</strong> {concert.gio}</p>
                <p><strong>Price:</strong> {concert.price}</p>
                <p><strong>Available:</strong> {available}</p>


                <label>Quantity:</label>
                <input
                    type="number"
                    min="0"
                    max={available}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />

                <p><strong>Tổng tiền:</strong> {total.toLocaleString()} $</p>

                {/*Booking button*/}
                <button onClick={handleBooking}>
                    Book
                </button>
                {bookingSuccess && (
                    <p className='success-message'>
                        ✅ Successfully!
                    </p>
                )}
            </div>
        </div>
    )
}

export default Booking
