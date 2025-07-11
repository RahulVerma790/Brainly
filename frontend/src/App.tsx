import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashBoard } from "./pages/dashboard"
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Twitter } from "./pages/Twitter";
import { Youtube } from "./pages/Youtube";

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<DashBoard/>} />
      <Route path="/tweets" element={<Twitter/>} />
      <Route path="/youtube" element={<Youtube/>} />
    </Routes>
  </BrowserRouter>
}

export default App;