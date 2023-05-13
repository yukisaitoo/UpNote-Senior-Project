import "./Collection.scss";

import Button from "components/Button/Button";
import NavBar from "components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const navigate = useNavigate();

  let allVideoInfos = JSON.parse(localStorage.getItem("videos") as string);

  if (allVideoInfos === null) allVideoInfos = { title: "", date: "", link: "" };

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
            <div className="c-tc-content-wrap">
              {
                <>
                  <div className="c-tc-c-title">
                    <>{allVideoInfos.title} </>
                  </div>
                  <div className="c-tc-c-date">
                    <>{allVideoInfos.date}</>
                  </div>
                  <div className="c-tc-c-video">
                    {allVideoInfos.link.length > 1 ? (
                      <a href={`${allVideoInfos.link}`}> Link</a>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
