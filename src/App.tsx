import { Routes, Route } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Movies from "./pages/Movies"

function App() {

  return (
    <RootLayout>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies/:category" element={<Movies/>}/>
      </Routes>
      <Footer/>
    </RootLayout>
  )
}

export default App
