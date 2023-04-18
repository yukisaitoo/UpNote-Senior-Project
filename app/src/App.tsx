import Collection from "pages/Collection/Collection";
import EditVideo from "pages/EditVideo/EditVideo";
import Landing from "pages/Landing/Landing";
import Login from "pages/Login/Login";
import SignUp from "pages/Login/SignUp";
import Search from "pages/Search/Search";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/search" element={<Search />} />
      <Route path="/video-edit" element={<EditVideo />} />
    </Routes>
  );
};

export default App;
