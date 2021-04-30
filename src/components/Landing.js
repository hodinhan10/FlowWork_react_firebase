import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import '../scss/_landing.scss';
import { Link } from 'react-router-dom';
import bgImage from '../img/bg1.jpg'
const Landing = () => {
    return (
        <div className="landing-banner">
            <img className="landing-banner__image" src={bgImage} />
            <div className="landing-banner__content">
                <h1 className="landing-banner__title">
                FlowWork cho phép bạn làm việc cộng tác hơn và hoàn thành nhiều việc hơn
                </h1>
                <h4 className="landing-banner__subtitle">
                Bảng, danh sách và thẻ FlowWorks cho phép bạn sắp xếp và ưu tiên các dự án của mình một cách thú vị, linh hoạt và bổ ích.
                </h4>
                <Link to="/signup" className="btn">
                Đăng kí miễn phí
                </Link>
            </div>
        </div>
    );
        
    
}


export default Landing
