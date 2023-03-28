import Landing from "pages/Landing/Landing";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route />
      <Route />
    </Routes>
  );
};

export default App;
