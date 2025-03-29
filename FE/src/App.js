import './App.css';
import { Outlet, Link } from "react-router-dom";
import LogoApp from './LogoApp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGem } from '@fortawesome/free-solid-svg-icons';

function Menu() {
    return (
        <div className="wapper">
            <div className="Logo">
                <a href=""><img src={LogoApp}/> </a>
            </div>

            <div className="menu">
                <a href=""> Hỗ trợ <FontAwesomeIcon icon={faPhone} /></a>
            </div>

            <div className="menu">
                <a href=""> Lịch học <FontAwesomeIcon icon={faCalendarDays} /></a>
            </div>

            <div className="menu">
                <a href=""> Tra cứu <FontAwesomeIcon icon={faMagnifyingGlass} /></a>
            </div>

            <div className="menu">
                <a href=""> Tài liệu <FontAwesomeIcon icon={faBook} /></a>
            </div>

            <div className="menu">
                <a href=""> ZeziPlusPro <FontAwesomeIcon icon={faGem} /></a>
            </div>

            <div className="login">
                <a href="Login"> Đăng nhập </a>         
            </div>

            <div className="register">
                <a href="Register"> Đăng kí </a>
            </div>
        </div>
    );
}

function Footer(){
    return(
        <div className="footer">
            <div className="footer-content">
                <p></p>
            </div>

            <div className="footer-content">
                <p></p>
            </div>

            <div className="footer-content">
                <p> Địa chỉ: </p>
                <p> Học viện hàng không - Cơ sở 2: Đường Cộng Hòa, Phường 4, Tân Bình, TP.HCM </p>
            </div>

            <div className="footer-content">
                <p> Liên hệ: 0338609223 </p>
                <p> Email: 2331540072@vaa.edu.vn </p>
                <p> Bán hàng: 10 số </p>
            </div>
        </div>
    );
}
function App() {
    return (
        <div>
            <Menu></Menu>

            <div>
                <div>
                    <img src="https://img5.thuthuatphanmem.vn/uploads/2021/09/22/background-hoc-tap-de-thuong_094719551.jpg" className="banner"/>
                </div>               
                <div className="intro">
                    <span className="color1"> Plans with 
                        <span className="color2"> ZeziPlus </span> <br />
                        "Study more effectively with plans" <br />
                        -- Almost everybody -- <hr />
                        <span className="color3"> Create and deliver bell-to-bell curriculum <br />
                                                resources that meet the needs of every student.
                        </span> <br /> <br />

                        <div className="community"> 
                            <span> Community <br />
                            Sign up for free &gt; </span>

                        </div>
                        <div className="professional">
                            <span> Professional <br />
                            Sign up for free &gt; </span> 
                        </div>
                    </span>
                </div>
                <div className="clear"></div>
            </div>

            <Footer></Footer>
        </div>
    );
//https://treobangron.com.vn/wp-content/uploads/2022/09/background-hoc-tap-54-768x512.jpg
//https://img5.thuthuatphanmem.vn/uploads/2021/09/22/background-hoc-tap-de-thuong_094719551.jpg
}

export default App;