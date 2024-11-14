import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../axiosConfig.js";

function AlertSetting() {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  const fetchAlerts = async () => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/alerts`);
      setAlerts(response.data.data);

    } catch (error) {
      if (error.response.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/member/login");
        return;
      }
      console.error("error:", error);
      alert("등록된 지역 알림 목록을 불러오는데 실패했습니다.");
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, []);

  const handleDelete = async (a) => {
    try {
      await axiosInstance.delete(`${import.meta.env.VITE_SERVER_URL}/alert/delete/${a.id}`);
      window.location.reload();

    } catch (error) {
      console.error("error:", error);

      if (error.response.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/member/login");

      } else if (error.response.status === 400) {
        alert(error.response.data.msg); //spring에서 넘겨준 예외 메시지

      } else if (error.response.status === 500) {
        alert("서버 오류가 발생했습니다.");
      }
    }
  }

    return (
      <div>
        <button onClick={() => navigate("/alerts/add")}>지역 추가</button>
        <button onClick={() => navigate("/")}>홈</button>

        <h2>날씨 알림 설정된 지역 목록</h2>
        <ul>
          {
            alerts.map((a) => {
              return (
                <li key={a.id}>
                  <span>{a.r1} {a.r2} {a.r3}</span>
                  <button onClick={() => handleDelete(a)}>삭제</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )

}

export default AlertSetting;
