import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberJoin from './pages/MemberJoin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/member/join" element={<MemberJoin/>} />
      </Routes>
    </Router>
  );
}

export default App;
