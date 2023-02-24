import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddVoucher from "./components/AddVoucher";
import VoucherList from "./components/VoucherList";
import EditVoucher from "./components/EditVoucher";

function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" element={<VoucherList/>}/>
          <Route path="/add" element={<AddVoucher/>}/>
          <Route path="/edit/:id" element={<EditVoucher/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
