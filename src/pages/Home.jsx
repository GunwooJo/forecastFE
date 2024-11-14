import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {accessTokenState} from "../state.js";

function Home() {
  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(accessTokenState);

  return (
    <div>
      {
        localStorage.getItem("accessToken") ? (
          <button onClick={() => {
            localStorage.removeItem("accessToken");
            setAccessToken("");
            navigate("/");
          }}><h1>로그아웃</h1></button>
        ) : <button onClick={() => navigate("/member/login")}><h1>로그인</h1></button>
      }
      <button onClick={() => navigate("/member/join")}><h1>회원가입</h1></button>
      <button onClick={() => navigate("/alerts")}><h1>날씨 알림 설정</h1></button>
    </div>
  )
}

export default Home;
