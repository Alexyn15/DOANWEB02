import "../App.css";
import { useState, useEffect } from "react";
import { createSchedule, updateSchedule, deleteSchedule } from "../api";
import api from "../api"; // Import api
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const token = localStorage.getItem("token");
if (!token) {
  console.error("Token không tồn tại. Vui lòng đăng nhập lại.");
}

export default function ProjectUser() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    name: "",
    description: "",
    time: "",
    start_time: "",
    end_time: "",
  });
  const [message, setMessage] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await api.get("/schedules");
      const schedules = response.data;
      setSchedules(schedules);
      setEvents(
        schedules.map((schedule) => ({
          id: schedule.id,
          title: schedule.name,
          start: schedule.start_time,
          end: schedule.end_time,
        }))
      );
    } catch (error) {
      setMessage("Không thể tải lịch. Vui lòng thử lại sau.");
    }
  };

  const toggleCreateDiv = () => {
    setIsDivVisible(!isDivVisible);
    setIsUpdateVisible(false);
    setScheduleData({
      name: "",
      description: "",
      time: "",
      start_time: "",
      end_time: "",
    });
  };

  const toggleUpdateDiv = (id) => {
    const schedule = schedules.find((schedule) => schedule.id === id);
    if (!schedule) {
      setMessage("Lịch không tồn tại!");
      return;
    }

    setIsUpdateVisible(!isUpdateVisible);
    setIsDivVisible(false);
    setUpdateId(id);
    setScheduleData({
      name: schedule.name,
      description: schedule.description,
      time: schedule.time,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      const data = await createSchedule(
        scheduleData.name,
        scheduleData.description,
        scheduleData.time,
        formatDateTime(scheduleData.start_time),
        formatDateTime(scheduleData.end_time)
      );

      setMessage("Tạo lịch thành công!");
      setSchedules([...schedules, data.schedule]);
      setEvents([
        ...events,
        {
          id: data.schedule.id,
          title: data.schedule.name,
          start: data.schedule.start_time,
          end: data.schedule.end_time,
        },
      ]);
      setIsDivVisible(false);
    } catch (error) {
      setMessage(error.message || "Lỗi tạo lịch! Kiểm tra lại thông tin.");
    }
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    try {
      await updateSchedule(
        updateId,
        scheduleData.name,
        scheduleData.description,
        scheduleData.time,
        formatDateTime(scheduleData.start_time),
        formatDateTime(scheduleData.end_time)
      );

      setMessage("Cập nhật lịch thành công!");
      await fetchSchedules();
      setIsUpdateVisible(false);
    } catch (error) {
      setMessage(error.message || "Lỗi cập nhật lịch! Kiểm tra lại thông tin.");
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await deleteSchedule(id);
      setMessage("Xóa lịch thành công!");
      await fetchSchedules();
    } catch (error) {
      setMessage(error.message || "Lỗi xóa lịch! Thử lại sau.");
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="wrappper-project-user">
      <div className="App">
        <h1></h1>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
      </div>

      <div className="Create-project">
        <a href="#" onClick={toggleCreateDiv}>
          Tạo Lịch
        </a>
      </div>
      {isDivVisible && (
        <div className="content">
          <form onSubmit={handleCreateSchedule}>
            <div className="form-group">
              <label htmlFor="name">Tên dự án</label>
              <input
                type="text"
                id="name"
                name="name"
                value={scheduleData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên dự án của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Mô tả</label>
              <input
                type="text"
                id="description"
                name="description"
                value={scheduleData.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Thời gian</label>
              <input
                type="text"
                id="time"
                name="time"
                value={scheduleData.time}
                onChange={handleInputChange}
                placeholder="Nhập thời gian của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="start_time">Thời gian bắt đầu</label>
              <input
                type="datetime-local"
                id="start_time"
                name="start_time"
                value={scheduleData.start_time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end_time">Thời gian kết thúc</label>
              <input
                type="datetime-local"
                id="end_time"
                name="end_time"
                value={scheduleData.end_time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <button type="submit" className="Create-button">Tạo</button>
            </div>
          </form>
        </div>
      )}

      <div className="Create-project">
        <a href="#" onClick={() => toggleUpdateDiv(1)}>
          Cập nhật Lịch
        </a>
      </div>
      {isUpdateVisible && (
        <div className="content">
          <form onSubmit={handleUpdateSchedule}>
            <div className="form-group">
              <label htmlFor="name">Tên dự án</label>
              <input
                type="text"
                id="name"
                name="name"
                value={scheduleData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên dự án của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Mô tả</label>
              <input
                type="text"
                id="description"
                name="description"
                value={scheduleData.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Thời gian</label>
              <input
                type="text"
                id="time"
                name="time"
                value={scheduleData.time}
                onChange={handleInputChange}
                placeholder="Nhập thời gian của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="start_time">Thời gian bắt đầu</label>
              <input
                type="datetime-local"
                id="start_time"
                name="start_time"
                value={scheduleData.start_time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end_time">Thời gian kết thúc</label>
              <input
                type="datetime-local"
                id="end_time"
                name="end_time"
                value={scheduleData.end_time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <button type="submit" className="Create-button">Cập nhật</button>
            </div>
          </form>
        </div>
      )}

      <div className="Delete-project">
        <h2>Danh sách lịch</h2>
        <ul className="schedule-list">
          {schedules.map((schedule) => (
            <li key={schedule.id} className="schedule-item">
              <span>{schedule.name}</span>
              <button onClick={() => toggleUpdateDiv(schedule.id)}>Sửa</button>
              <button onClick={() => handleDeleteSchedule(schedule.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}