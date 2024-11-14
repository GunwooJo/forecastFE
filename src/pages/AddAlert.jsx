import {useRecoilValue} from "recoil";
import {regionsState} from "../state.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../axiosConfig.js";

function AddAlert () {

  const regions = useRecoilValue(regionsState);
  const [regionAlert, setRegionAlert] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const regionArray = e.target.value.split(" ");
    const foundRegion = regions.filter((region) => {
      return region.r1 === regionArray[0] && region.r2 === regionArray[1] && region.r3 === regionArray[2];
    }).pop();

    setRegionAlert(foundRegion);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post(`${import.meta.env.VITE_SERVER_URL}/alert/setting`, {
        r1: regionAlert.r1,
        r2: regionAlert.r2,
        r3: regionAlert.r3,
        nx: regionAlert.nx,
        ny: regionAlert.ny
      });
      navigate("/alerts")

    } catch (error) {
      console.error("error:", error);
      if (error.response.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/member/login");
        return;

      } else if (error.response.status === 500) {
        alert("서버 오류가 발생했습니다.");
        return;
      }
    }

  }

  return (
    <div>
      <h1>날씨 알림 추가</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">알림 설정</button>
      </form>
    </div>
  )
}

export default AddAlert;
