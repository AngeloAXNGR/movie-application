import RootLayout from "./layout/RootLayout"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"

function App() {

  return (
    <RootLayout>
      <Header/>
      <Home/>
      <Footer/>
    </RootLayout>
  )
}

export default App
