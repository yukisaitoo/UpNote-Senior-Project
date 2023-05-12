import "./Collection.scss";

import Button from "components/Button/Button";
import NavBar from "components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const navigate = useNavigate();

  return (
    <div className="collection-content">
      <NavBar />
      <div className="c-body">
        <div className="c-header">
          <h1>Collection</h1>
          <Button color={"blue"} onClick={() => navigate("/search")}>
            <>Create</>
          </Button>
        </div>
        <div className="c-table">
          <div className="c-tc-thead">
            <div className="c-tc-thead-title">
              <>Title</>
            </div>
            <div className="c-tc-thead-date">
              <>Date</>
            </div>
            <div className="c-tc-thead-video">
              <>Video Link</>
            </div>
            <div className="c-tc-thead-delete"></div>
          </div>
          <div className="c-tc-content">
            {/* <div className="c-tc-content-wrap">
              <div className="c-tc-c-title">
                <>Q&A: The History of Columbus </>
              </div>
              <div className="c-tc-c-date">
                <>5/20/21</>
              </div>
              <div className="c-tc-c-video">
                <>Video</>
              </div>
              <div className="c-tc-c-delete"></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
