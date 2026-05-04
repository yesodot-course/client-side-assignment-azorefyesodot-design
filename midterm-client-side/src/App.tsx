import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/home"
import Cart from "./pages/Cart"
import Admin from "./pages/Admin"
import Navbar from "./components/NavBar"

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/admin" element={<Admin />} />
  </Routes>
</BrowserRouter>
  )
}
export default App
