import React from 'react';
import { Link } from "react-router-dom";
import '../scss/_landing.scss';
import logo from '../img/logo3.png';
import bgImage from '../img/bg1.jpg'
const LandingHeader = () => {
	return (
		<>
		<header className="landing-header">
			<div className="landing-header__section">
				<img className="landing-header__logo" src={logo} />
			</div>
			<div className="landing-header__section">
				<ul className="landing-header__list">
					<li className="landing-header__li">
						<Link to="/signin" className="btn-transparent">
							Đăng nhập
						</Link>
					</li>
					<li className="landing-header__li">
						<Link to="/signup" className="btn">
						Đăng kí miễn phí
						</Link>
					</li>
				</ul>
			</div>
		</header>
		<body> 
		<div className="landing-banner">
            <img className="landing-banner__image" src={bgImage} />
            <div className="landing-banner__content">
                <h1 className="landing-banner__title">
                    Flow Work cho phép bạn làm việc cộng tác hơn và hoàn thành nhiều việc hơn
                </h1>
                <h4 className="landing-banner__subtitle">
				Bảng, danh sách và thẻ Flow Works cho phép bạn sắp xếp và ưu tiên các dự án của mình một cách thú vị, linh hoạt và bổ ích.
                </h4>
                <Link to="/signup" className="btn">
				Đăng kí miễn phí
                </Link>
            </div>
        </div>
		</body>
		</>
	);
}

export default LandingHeader;
