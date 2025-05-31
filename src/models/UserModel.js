const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');

const createUser = async (userData) => {
  const { name, phone, dateofbirth, gender, acc, password } = userData;
  try {
    const pool = await sql.connect(); // đảm bảo kết nối pool
    const custid = uuidv4();

    const request = pool.request();

    request.input('custid', sql.VarChar(36), custid);
    request.input('name', sql.VarChar(30), name);
    request.input('phone', sql.Int, phone);
    request.input('dateofbirth', sql.Date, dateofbirth);
    request.input('gender', sql.VarChar(1), gender);
    request.input('acc', sql.VarChar(30), acc);
    request.input('pass', sql.VarChar(30), password);

    await request.query(`
      INSERT INTO customer (custid, name, phone, dateofbirth, gender, acc, pass)
      VALUES (@custid, @name, @phone, @dateofbirth, @gender, @acc, @pass)
    `);

    return {
      status: 'OK',
      message: 'User created successfully',
      data: { custid, name, acc }
    };
  } catch (err) {
    console.error('❌ Error creating user in DB:', err);
    throw err;
  }
};
