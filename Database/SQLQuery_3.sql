SELECT bookname FROM Book
WHERE bookid = 3 OR bookid = 6 OR bookid = 8; 

SELECT * FROM Book;

SELECT bookname, price FROM Book
WHERE price <= 10000 OR price >= 20000
ORDER BY price DESC; 

SELECT bookid, bookname, publisher, price FROM Book
WHERE publisher = 'Penguin' AND price >= 20000; 

SELECT bookid, bookname, publisher, price FROM Book
WHERE bookname LIKE 'The%' AND price <= 25000
ORDER BY publisher DESC, price; 

SELECT SUM(saleprice) AS 'SUM', COUNT(bookid) AS 'COUNT' FROM Orders
WHERE custid = 1; 

SELECT publisher ,MAX(price) AS 'MAX', MIN(price) AS 'MIN', COUNT(bookid) AS 'COUNT' FROM Book
GROUP BY publisher; 

SELECT SUM(bookid) AS 'NUMBER' , SUM(saleprice) AS 'SALE PRICE' FROM Orders
WHERE orderdate BETWEEN '2023-01-01' AND '2023-09-30';

SELECT * FROM Orders;
SELECT * FROM Book
WHERE publisher = 'Penguin' OR publisher = 'Harper & Brothers';

SELECT bookid, SUM(saleprice) AS 'SALE PRICE' FROM Orders
GROUP BY bookid
HAVING SUM(saleprice) >= 20000 
ORDER BY SUM(saleprice) DESC;

SELECT orderid, bookname, name, saleprice, orderdate, publisher  FROM Orders, Book, Customer
WHERE Orders.custid = Customer.custid AND Orders.bookid = Book.bookid 
AND saleprice <= 10000 AND (publisher = 'Penguin' OR publisher = 'Harper & Brothers')
ORDER BY saleprice DESC;

SELECT orderid, bookname, name, saleprice, orderdate, publisher  FROM Orders, Book, Customer
WHERE Orders.custid = Customer.custid AND Orders.bookid = Book.bookid 
AND saleprice <= 10000 AND publisher = 'Harper & Brothers' 
ORDER BY saleprice DESC;

SELECT bookname, SUM(saleprice) FROM Book, Orders
WHERE Orders.bookid = Book.bookid 
GROUP BY bookname
HAVING SUM(saleprice) >= 10000;

SELECT * FROM Book, Orders
WHERE Orders.bookid = Book.bookid; 

SELECT bookname, COUNT(orderid) AS 'Number of books', SUM(saleprice) AS 'SUM' FROM Book, Orders
WHERE Orders.bookid = Book.bookid 
GROUP BY bookname
HAVING SUM(saleprice) >= 30000;

SELECT ABS(-3), ABS(4);
SELECT CEILING(3.4);
SELECT ROUND(3.4,1);
SELECT POWER(4.0,2);
SELECT SQRT(4.0);
SELECT LEFT('Happy',4);

SELECT CHAR(65);
SELECT ASCII('Happy');
SELECT UNICODE('Happy');
SELECT UPPER('Happy');

SELECT LTRIM(' Happy ');
SELECT RIGHT('Happy',4);
SELECT LEN('Happy');

SELECT REPLACE('Happy Day', 'Day', 'Boy');
SELECT SUBSTRING('Happy Day', 3,5);

SELECT CHARINDEX('Day', 'Happy Day');

SELECT GETDATE();
SELECT DAY('2013-09-02');
SELECT MONTH('2013-09-02');
SELECT YEAR('2013-09-02');

SELECT DATENAME(MONTH, '2013-09-02');
SELECT DATEPART(MONTH, '2013-09-02');

SELECT DATEDIFF(MONTH, '2014-03-01', '2014-09-01');
SELECT DATEADD(DAY, 5, '2014-09-01');

SELECT name, LEFT(phone,3) +'-****-' + RIGHT(phone,3) FROM Customer;

SELECT DATEPART(YY,orderdate), DATEPART(MM,orderdate), COUNT(orderid) AS 'Count', SUM(saleprice) AS 'Sum of saleprice' FROM Orders
GROUP BY DATEPART(YY,orderdate), DATEPART(MM,orderdate);

SELECT LEFT(orderdate,7) AS 'Year/Month', COUNT(orderid) AS 'Count', SUM(saleprice) AS 'Sum of saleprice' FROM Orders
GROUP BY orderdate;

SELECT * FROM Customer
WHERE phone IS NULL;

SELECT TOP 5 * FROM Customer
ORDER BY name DESC;

UPDATE Book SET bookname = 'DATABASE Modeling', price= 25000
WHERE bookid = 30;

INSERT INTO Customer(custid, name, address, phone) VALUES(30,'Tran Viet Hung','Tongmyong Dormitory', '010-7761-3313');

DELETE FROM Book WHERE bookname = 'Sports Medicine' AND price IS NULL; 

SELECT * FROM Book;

SELECT SUBSTRING('Happy Day',-3,5);