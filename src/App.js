import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Layout from './features/Layout/Layout';
import Home from './features/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
