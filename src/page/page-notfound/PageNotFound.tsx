import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  const handleNavigateDashboard = () => {
      navigate("/");
  };
  return (
    <div className="h-full flex items-center justify-center">
      <div className="page-content">
        <div className="text-center">
          <h1>404</h1>
          <h2>Page NotFound</h2>
          <div className="mt-12">
            <Button className="btn" type="primary" onClick={handleNavigateDashboard}>
            Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
