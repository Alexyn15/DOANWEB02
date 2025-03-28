
import '../App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faGem } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function User() {
    return (
        <div className="wapper-user">
            <div className="title-user">
                <p><FontAwesomeIcon icon={faCircleInfo} /> Tiết kiệm thời gian với bản kế hoạch của bạn. </p> 
            </div>

            <div className="content-user">
                <div className="menu-left-user">
                    <a href="">
                        <FontAwesomeIcon className="icon-user" icon={faHouseChimneyWindow} />
                        <p className="note-icon">  Trang chủ  </p>
                    </a>

                    <a href="">
                        <FontAwesomeIcon className="icon-user" icon={faCalendarDays} />
                        <p className="note-icon">  Lịch học  </p>
                    </a>

                    <a href="">
                        <FontAwesomeIcon className="icon-user" icon={faFolder} />
                        <p className="note-icon">  Dự án  </p>
                    </a> 

                    <a href="">
                        <FontAwesomeIcon className="icon-user" icon={faTable} />
                        <p className="note-icon">  Mẫu  </p>
                    </a>
                                       
                </div>
                
                <div className="content-main-user">
                    <a href=""> Tài khoản </a>

                    <div className="Intro-ZeziPlusPro" >
                        <div style={{pointerEvents: 'none'}}>
                            <span style={{ fontSize: '20px', marginbottom: '250px' }}> ZeziPlusPro <FontAwesomeIcon icon={faGem} /> </span><br />
                            Rất nhiều tính năng hay đang chờ bạn khám phá! <br />
                            <a href=""style={{ pointerEvents: 'auto' }}> Dùng thử 30 ngày ZeziPlusPro </a>                                                  
                        </div>
                    </div>

                    <div>
                        <p className="intro-project-user"> Lịch của tôi </p> 
                        <FontAwesomeIcon className="list-project-user" icon={faList} />
                    </div>

                    <div className="project-user">
                        <div> 
                            <a href="project_user">
                                <FontAwesomeIcon icon={faPlus} />
                            </a>
                        </div>
                        <div> hello </div>
                        <div> hello </div>
                    </div>
                </div>
            </div>
        </div>            
    );
}