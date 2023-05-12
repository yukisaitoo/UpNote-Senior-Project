import "./Search.scss";

import Button from "components/Button/Button";
import NavBar from "components/NavBar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  localStorage.setItem("url", url);

  return (
    <div className="search">
      <NavBar />
      <div className="s-body">
        <form className="s-form">
          <input
            className="s-form-field"
            type="text"
            placeholder="Youtube URL"
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="s-form-btn">
            <Button color={"blue"} onClick={() => navigate("/video-edit")}>
              <>Search</>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
