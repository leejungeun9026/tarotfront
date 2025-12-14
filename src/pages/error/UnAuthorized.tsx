import { useNavigate } from "react-router-dom";

function UnAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="UnAuthorized py-5">
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 className="display-1">401</h2>
          <p>권한 없음! 이 주소로 접근이 거부되었습니다.</p>
          <div onClick={() => navigate(-1)} className="btn btn-link">
            뒤로가기
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorized;
