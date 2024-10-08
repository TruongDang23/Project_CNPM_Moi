import styled from 'styled-components'
import Logo from '../assets/logo.png'
import ListService from './ListService'

import Badge from '@mui/material/Badge'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AvatarUser from './AvatarUser'

function Header() {
  const token = true // Change to true to see the logged in state: true or false

  {
    if (token) {
      return (
        <Navbar>
          <a className="nav-brand" href="/">
            <img src={Logo} alt="Udemy Logo" />
          </a>
          <div className="nav-link">
            <a href="/" className="link">
              Trang chủ
            </a>
            <ListService />
            <a href="/" className="link">
              Đặt dịch vụ
            </a>
          </div>
          <div className="authButtons">
            <a className="login">Đăng nhập</a>
            <a className="signup">Đăng ký</a>
          </div>
        </Navbar>
      )
    } else {
      return (
        <Navbar>
          <a className="nav-brand" href="/">
            <img src={Logo} alt="Udemy Logo" />
          </a>
          <div className="nav-link">
            <a href="/" className="link">
              Trang chủ
            </a>
            <ListService />
            <a href="/" className="link">
              Đặt dịch vụ
            </a>
          </div>
          <div className="nav-other">
            <a>
              <StyledBadge badgeContent={4} color="error">
                <BookmarkIcon />
              </StyledBadge>
            </a>
            <AvatarUser />
          </div>
        </Navbar>
      )
    }
  }
}

const StyledBadge = styled(Badge)`
  cursor: pointer;
  color: #252525;
  transition: all 0.3s;
  ${'' /* giảm kích thước của badge */}
  .MuiBadge-badge {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0 2px;
  }
  .MuiSvgIcon-root {
    width: 2.6rem;
    height: 2.6rem;
    &:hover,
    &:focus {
      color: #000;
      ${'' /* Phóng to một chút */}
      transform: scale(1.1);
      transition: all 0.3s;
    }
  }
`

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 2px solid #f1f3f5;
  box-shadow: 0 2px 4px rgba(9, 8, 18, 0.07);

  .nav-brand {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 100px;
      margin-right: 10px;
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 20px;

    .link {
      font-size: 16px;
      color: #252525;
      font-weight: 700;
      text-decoration: none;
      position: relative;
      padding: 5px 0;

      &:hover {
        color: #000; /* Màu chữ khi hover */
      }

      &:hover::before {
        transform: scaleX(1);
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -7px;
        width: 100%;
        height: 2px;
        background-color: #000; /* Màu viền */
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.3s ease-in-out;
      }
    }
  }

  .authButtons {
    display: flex;
    align-items: center;
    gap: 10px;

    .login,
    .signup {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      cursor: pointer;
    }

    .login {
      background-color: #252525;
      color: #fff;

      &:hover,
      &:visited {
        background-color: #3a3a3a;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Add shadow */
        transition: all 0.3s;
      }
    }

    .signup {
      background-color: #f1f3f5;
      color: #252525;
      border: none;

      &:hover,
      &:visited {
        background-color: #e0e3e7; /* Change background on hover */
        color: #000; /* Darken the text */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Add shadow */
        transition: all 0.3s;
      }
    }
  }

  .nav-other {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;

    .nav-brand {
      img {
        width: 80px;
      }
    }

    .nav-link {
      gap: 10px;
      .link {
        font-size: 14px;
      }
    }

    .authButtons {
      gap: 5px;
      .login,
      .signup {
        padding: 8px 16px;
        font-size: 12px;
      }
    }

    .nav-other {
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    .nav-link {
      display: none; /* Hide navigation links on very small screens */
    }

    .authButtons {
      flex-direction: column; /* Stack buttons vertically */
      .login,
      .signup {
        width: 100%;
        text-align: center;
      }
    }

    .nav-other {
      display: none; /* Hide other items like avatar or badge on very small screens */
    }
  }
`
export default Header
