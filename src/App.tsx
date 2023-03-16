import { Routes, Route } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import Search from "./pages/Search"

function App() {

  return (
    <RootLayout>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies/:category" element={<Movies/>}/>
        <Route path="/movies/search" element={<Search/>}/>
      </Routes>
      <Footer/>
    </RootLayout>
  )
}

export default App
