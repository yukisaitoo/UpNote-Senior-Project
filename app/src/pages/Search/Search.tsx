import "./Search.scss";

import Button from "components/Button/Button";
import NavBar from "components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  return (
    <div className="search">
      <NavBar />
      <div className="s-body">
        <form className="s-form">
          <input
            className="s-form-field"
            type="text"
            placeholder="Youtube URL"
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
