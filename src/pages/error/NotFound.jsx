import { useNavigate } from "react-router-dom"

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='NotFound py-5'>
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 className="display-1">404</h2>
          <p>주소가 변경되었거나 페이지를 찾을 수 없습니다.</p>
          <div onClick={() => navigate(-1)} className='btn btn-link'>뒤로가기</div>
        </div>
      </div>
    </div>
  )
}

export default NotFound