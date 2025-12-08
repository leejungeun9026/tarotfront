import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom"

function OAuth() {
  const { token, expirationTime } = useParams();
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !expirationTime) return;

    const now = new Date().getTime();
    const expires = new Date(now + Number(expirationTime) * 1000);

    setCookie("accessToken", token, { expires, path: "/" });
    navigate("/");

  }, [token])


  return (
    <div>

    </div>
  )
}

export default OAuth