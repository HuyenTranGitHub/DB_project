import './App.css';
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
//Dòng 15 cần /menu nếu không sẽ ghi đè lên trang home chính
//Dòng 12: Cú pháp React router v6+ để truyền component Home dưới dạng biến thì cần truyền nhưu này , chứ không được truyền {Home}/>//
export default App;
