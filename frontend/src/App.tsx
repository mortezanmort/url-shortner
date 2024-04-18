import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
import Login from "@/pages/Login";
import Register from "./pages/Register";
import ErrorPage from "@/pages/Error";
import UpdateURL from "./pages/UpdateURL";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen w-full">
        <Navbar />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/url/update/:id" element={<UpdateURL />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
