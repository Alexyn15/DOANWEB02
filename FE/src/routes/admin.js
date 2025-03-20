import React, { useState } from 'react';
import '../App.css';
import LogoApp from '../LogoApp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function Admin() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="wrapper-admin">
      <div className="header-admin"> 
          <div className="Logo">
            <a href=""><img src={LogoApp}/> </a>
          </div>

          <div class="search-container">
            <input type="text" placeholder="Tìm kiếm..." class="search-input" />
            <button class="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>

          <a href="" className="header-top-admin">
            <FontAwesomeIcon  icon={faHouseChimneyWindow} />
            <p> Trang chủ </p>
          </a>

          <a href="" className="header-top-admin">
            <FontAwesomeIcon icon={faBell} />
            <p> Thông báo </p>
          </a>

          <a href="" className="header-top-admin"> Tài khoản </a>
      </div>

      <div>
          <FontAwesomeIcon 
            className={`bars-admin ${menuActive ? 'active' : ''}`} 
            icon={faBars} 
            onClick={toggleMenu} 
          />

          <div className={`left-menu-user ${menuActive ? 'active' : ''}`}>
            <p>Nội dung menu bên trái</p>
          </div>
      </div>

      <div className="about-admin">
        <div className="information">
          <p> Thông tin admin </p>
          <hr style={{margin: '10px 30px'}}/>
        </div>

        <div className="news">
          <div className="notification">
            Tin tức
          </div>

          <div className="Schedule">
            <div className="study">
              Thông tin thành viên
            </div>
            <div className="exam">
              Thông tin thành viên vip
            </div>
          </div>
        </div>
      </div>

      <div className="menu-middle-admin">
        <div>
          Thêm tin tức
        </div>

        <div>
          Cập nhật tin tức
        </div>

        <div>
          Thêm khách hàng
        </div>

        <div>
          Cập nhật khách hàng
        </div>

        <div>
          Thêm mẫu
        </div>

        <div>
          Cập nhật mẫu
        </div>

        <div>
          Thêm tài liệu
        </div>

        <div>
          Cập nhật tài liệu
        </div>

      </div>

      <div className="achievement">
        <div>
          hello
        </div>

        <div>
          Nhận phản hồi 
        </div>  
      </div>
    </div>
  );
}
