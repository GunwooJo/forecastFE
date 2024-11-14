import {useEffect, useState} from "react";
import axios from "axios";
import {useRecoilState} from "recoil";
import {regionsState} from "../state.js";
import {useNavigate} from "react-router-dom";

function MemberJoin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    alerts: [],
  });
  const navigate = useNavigate();

  const [regions, setRegions] = useRecoilState(regionsState);

  const fetchRegions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/regions`);
      setRegions(response.data.data);
      localStorage.setItem("regions", JSON.stringify(response.data.data));

    } catch (error) {
      console.error("error:", error);
      alert("지역 목록을 불러오는데 실패했습니다.");
    }
  }

  useEffect(() => {
    fetchRegions()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === "regions") {
      const regionArray = value.split(" ");
      const foundRegion = regions.filter((region) => {
        return region.r1 === regionArray[0] && region.r2 === regionArray[1] && region.r3 === regionArray[2];
      }).pop();

      setForm({
        ...form,
        alerts: [foundRegion],
      });

    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      console.log("회원가입 시도: ", {
        email: form.email,
        password: form.password,
        alerts: form.alerts
      })
     const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/join`, {
        email: form.email,
        password: form.password,
        alerts: form.alerts
      });

      alert("회원가입에 성공했습니다.");

      navigate("/");

    } catch (error) {
      console.error("error:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="region">지역:</label>
          <select name="regions" onChange={handleChange}>
            <option value="">지역을 선택하세요</option>
            {
              regions.map((region, idx) => {
                return (
                  <option key={idx} value={region.r1 + " " + region.r2 + " " + region.r3}>
                    {region.r1 + " " + region.r2 + " " + region.r3}
                  </option>
                )
              })
            }
          </select>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default MemberJoin;
