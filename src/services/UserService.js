const sql = require('mssql');
const { v4: uuidv4 } = require('uuid'); // để tạo custid ngẫu nhiên
const User = require('../models/UserModel'); // bạn vẫn giữ const User, dùng class là hợp lý
const bcrypt = require("bcrypt")

const createUser = async (newUser) => {
  const { name, email, password, confirmpassword, phone, isAdmin } = newUser;

  try {
    // Generate unique customer ID
    const custid = uuidv4();
    const dateofbirth = new Date(); // bạn có thể sửa theo dữ liệu thực tế nếu có
    const gender = 'M'; // tạm cứng, có thể thay đổi tuỳ frontend

    const request = new sql.Request();

    // Kiểm tra email đã tồn tại chưa
    const check = await request
      .input('email', sql.VarChar(30), email)
      .query('SELECT * FROM customer WHERE acc = @email');

    if (check.recordset.length > 0) {
      return {
        status: 'ERR',
        message: 'The email is already registered',
      };
    }
    const hash = bcrypt.hashSync(password,10)
    console.log('hash',hash)

    // Thêm user vào database
    const insertRequest = new sql.Request();
    insertRequest.input('custid', sql.VarChar(36), custid);
    insertRequest.input('name', sql.VarChar(30), name);
    insertRequest.input('phone', sql.Int, phone);
    insertRequest.input('dateofbirth', sql.Date, dateofbirth);
    insertRequest.input('gender', sql.VarChar(1), gender);
    insertRequest.input('acc', sql.VarChar(30), email); // dùng acc là email
    insertRequest.input('pass', sql.VarChar(30), password);

    await insertRequest.query(`
      INSERT INTO customer (custid, name, phone, dateofbirth, gender, acc, pass)
      VALUES (@custid, @name, @phone, @dateofbirth, @gender, @acc, @pass)
    `);

    // Trả kết quả
    const user = new User({
      custid,
      name,
      phone,
      dateofbirth,
      gender,
      acc: email,
      password
    });

    return {
      status: 'OK',
      message: 'User created successfully',
      data: user
    };
  } catch (error) {
    console.error('❌ SQL Error:', error);
    return {
      status: 'ERR',
      message: 'Something went wrong',
      error: error.message
    };
  }
};

const loginUser = async (userlogin) => {
  const { email, password } = userlogin;

  try {
    // 🔧 Thêm dòng này để khởi tạo request
    const request = new sql.Request();

    // Kiểm tra email có tồn tại
    const result = await request
      .input('email', sql.VarChar(30), email)
      .query('SELECT * FROM customer WHERE acc = @email');

    const user = result.recordset[0];

    if (!user) {
      return {
        status: 'ERR',
        message: 'Email not found',
      };
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã hash trong DB
    const isMatch = bcrypt.compare(password, user.pass);

    if (!isMatch) {
      return {
        status: 'ERR',
        message: 'Invalid password',
      };
    }

    // Trả thông tin user nếu đăng nhập thành công
    return {
      status: 'OK',
      message: 'Login successful',
      data: {
        custid: user.custid,
        name: user.name,
        email: user.acc
      }
    };
  } catch (error) {
    console.error('❌ SQL Error:', error);
    return {
      status: 'ERR',
      message: 'Something went wrong',
      error: error.message
    };
  }
};

module.exports = {
  createUser,
  loginUser
};
