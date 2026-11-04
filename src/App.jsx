import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/nav-bar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
