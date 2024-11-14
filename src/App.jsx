import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberJoin from './pages/MemberJoin';
import Home from "./pages/Home.jsx";
import AlertSetting from "./pages/AlertSetting.jsx";
import MemberLogin from "./pages/MemberLogin.jsx";
import AddAlert from "./pages/AddAlert.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/member/join" element={<MemberJoin/>} />
        <Route path="/member/login" element={<MemberLogin/>} />
        <Route path="/alerts" element={<AlertSetting/>} />
        <Route path="/alerts/add" element={<AddAlert/>} />
      </Routes>
    </Router>
  );
}

export default App;
