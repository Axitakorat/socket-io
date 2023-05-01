import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";
import Protected from "./Protected";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
