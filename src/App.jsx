import './App.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import { Signup } from './pages/SignUp'
import { Signin } from './pages/SignIn'
import { SendMoney } from './components/SendMoney'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
