import "../App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { createSchedule, updateSchedule } from "../api";

export default function ProjectUser() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    name: "",
    description: "",
    time: "",
    start_time: "",
    end_time: ""
  });
  const [message, setMessage] = useState("");
  const [updateId, setUpdateId] = useState(null); // ID của lịch cần cập nhật
  const [schedules, setSchedules] = useState([]); // State to store the list of schedules

  const toggleCreateDiv = () => {
    setIsDivVisible(!isDivVisible);
    setIsUpdateVisible(false);
    setScheduleData({ name: "", description: "", time: "", start_time: "", end_time: "" }); // Reset form
  };

  const toggleUpdateDiv = (id) => {
    setIsUpdateVisible(!isUpdateVisible);
    setIsDivVisible(false);
    setUpdateId(id); // Thiết lập ID của lịch cần cập nhật
    // Bạn có thể lấy dữ liệu của lịch cần cập nhật từ server và thiết lập vào state ở đây
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      const data = await createSchedule(scheduleData.name, scheduleData.description, scheduleData.time, scheduleData.start_time, scheduleData.end_time);
      setMessage("Tạo lịch thành công!");
      console.log("Dữ liệu trả về:", data);
      setSchedules([...schedules, data]); // Add the new schedule to the state
      setIsDivVisible(false); // Ẩn form sau khi tạo thành công
    } catch (error) {
      setMessage(error.message || "Lỗi tạo lịch! Kiểm tra lại thông tin.");
    }
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    try {
      const data = await updateSchedule(updateId, scheduleData.name, scheduleData.description, scheduleData.time, scheduleData.start_time, scheduleData.end_time);
      setMessage("Cập nhật lịch thành công!");
      console.log("Dữ liệu trả về:", data);
      setIsUpdateVisible(false); // Ẩn form sau khi cập nhật thành công
      // Update the schedule in the state if needed
    } catch (error) {
      setMessage(error.message || "Lỗi cập nhật lịch! Kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="wrappper-project-user">
      <div className="header-project-user">
        <div className="div1"> Ngày - tháng - năm</div>
        <div className="div2">
          <FontAwesomeIcon className="icon-div2" icon={faPlay} /> Today{' '}
          <FontAwesomeIcon className="icon-div-2" icon={faPlay} />
        </div>
        <div className="div3"> Ngày </div>
        <div className="div4"> Tuần </div>
        <div className="div5"> Tháng </div>
        <div className="div6"> Năm </div>
      </div>

      <div className="clear"></div>

      <div className="main-project-user">
        <div className="row">
          <div className="cell"> Buổi\Thứ </div>
          <div className="cell"> Thứ 2 </div>
          <div className="cell"> Thứ 3 </div>
          <div className="cell"> Thứ 4 </div>
          <div className="cell"> Thứ 5 </div>
          <div className="cell"> Thứ 6 </div>
          <div className="cell"> Thứ 7 </div>
          <div className="cell"> Chủ Nhật </div>
        </div>
        <div className="row">
          <div className="cell"> Sáng </div>
          <div className="cell">2</div>
          <div className="cell">3</div>
          <div className="cell">4</div>
          <div className="cell">5</div>
          <div className="cell">6</div>
          <div className="cell">7</div>
          <div className="cell">8</div>
        </div>
        <div className="row">
          <div className="cell"> Trưa </div>
          <div className="cell">2</div>
          <div className="cell">3</div>
          <div className="cell">4</div>
          <div className="cell">5</div>
          <div className="cell">6</div>
          <div className="cell">7</div>
          <div className="cell">8</div>
        </div>
        <div className="row">
          <div className="cell"> Tối </div>
          <div className="cell">2</div>
          <div className="cell">3</div>
          <div className="cell">4</div>
          <div className="cell">5</div>
          <div className="cell">6</div>
          <div className="cell">7</div>
          <div className="cell">8</div>
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
                <label htmlFor="name"> Tên dự án</label>
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
                <label htmlFor="description"> Mô tả </label>
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
                <label htmlFor="time"> Thời gian </label>
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
                <label htmlFor="start_time"> Thời gian bắt đầu </label>
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
                <label htmlFor="end_time"> Thời gian kết thúc </label>
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
                <button type="submit"> Tạo </button>
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
                <label htmlFor="name"> Tên dự án</label>
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
                <label htmlFor="description"> Mô tả </label>
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
                <label htmlFor="time"> Thời gian </label>
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
                <label htmlFor="start_time"> Thời gian bắt đầu </label>
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
                <label htmlFor="end_time"> Thời gian kết thúc </label>
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
                <button type="submit"> Cập nhật </button>
              </div>
            </form>
          </div>
        )}

        <div className="schedule-list">
          {schedules.map(schedule => (
            <div key={schedule.id}>
              <h3>{schedule.name}</h3>
              <p>{schedule.description}</p>
              <p>{schedule.time}</p>
              <p>{schedule.start_time} - {schedule.end_time}</p>
            </div>
          ))}
        </div>

        <div className="Create-project">
          <a href="#"> Xóa Lịch </a>
        </div>
      </div>
    </div>
  );
}