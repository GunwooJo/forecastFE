import {useEffect, useState} from "react";
import axios from "axios";
import {atom, useSetRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";
import {accessTokenState} from "../state.js";

function MemberLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(accessTokenState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("accessToken", response.data.data.accessToken);
      setAccessToken(response.data.data.accessToken);
      navigate("/");
    } catch (error) {
      console.error("error:", error);

      if (error.response.status === 401) {
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
        return;

      } else if (error.response.status === 500) {
        alert("서버 오류가 발생했습니다.");
        return;
      }
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => navigate("/member/join")}>회원가입</button>
    </div>
  );
}

export default MemberLogin;
