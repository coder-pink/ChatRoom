import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'



function App() {


  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route  path="/" element={<Join />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </div>

    </>
  )
}

export default App
