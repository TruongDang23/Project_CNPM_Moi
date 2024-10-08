import { useState } from 'react'
import imgLogin from '../../../assets/admin-login.jpg'
import BgLogin from '../../../assets/bg-login.png'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [message, setMessage] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    if (username === '' || pass === '') {
      setMessage('Vui lòng nhập đầy đủ thông tin')
    } else {
      setMessage('')
    }
    try {
      const res = await axios.post('http://localhost:3000/ad/login', {
        username,
        pass
      })
      if (res.data === 'error') setMessage('An error occurred when login!')
      else if (res.data === 'not found')
        setMessage('Tài khoản hoặc mật khẩu không đúng')
      else {
        const { userID } = res.data
        const userData = JSON.stringify({ userID })
        alert('Login successfully')
        localStorage.setItem('userAuth', userData)
        // navigate(`/`)
      }
    } catch (error) {
      alert('An error occurred while trying to log in.')
      //console.error(error)
    }
  }

  const handleCancel = () => {
    // Load lại trang
    window.location.reload()
  }

  return (
    <>
      <Helmet>
        <title>Đăng nhập Admin</title>
      </Helmet>
      <LoginWrapper>
        <div className="wrapper">
          <div className="container">
            <div className="image">
              <img src={imgLogin} alt="Image" />
            </div>
            <div className="content">
              <h1>Đăng Nhập Admin</h1>

              <div className="input-username">
                <label>
                  Tên tài khoản: <span>*</span>
                </label>
                <br />
                <div className="input-box">
                  <PersonOutlineIcon className="input-icon" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username or email"
                  />
                </div>
              </div>

              <div className="input-pass">
                <label>
                  Mật khẩu: <span>*</span>
                </label>
                <br />
                <div className="input-box">
                  <LockIcon className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </span>
                </div>
              </div>

              {message && (
                <p
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '1.6rem'
                  }}
                >
                  {message}
                </p>
              )}
              <div className="button">
                <button className="button-login" onClick={handleLogin}>
                  <ExitToAppIcon sx={{ paddingRight: '10px', fontSize: 35 }} />
                  Đăng nhập
                </button>
                <button className="button-cancel" onClick={handleCancel}>
                  <CloseIcon
                    sx={{ paddingRight: '10px', fontSize: 35, color: 'red' }}
                  />
                  Hủy
                </button>
              </div>
              <div className="forgot">
                <a href="#">Quên mật khẩu</a>
              </div>
            </div>
          </div>
        </div>
      </LoginWrapper>
    </>
  )
}

const LoginWrapper = styled.section`
  .wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-image: url(${BgLogin});
    background-size: cover;
    object-fit: cover;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        rgba(34, 25, 29, 0.12),
        rgba(243, 243, 250, 0.9)
      );
      animation: gradientShift 4s infinite alternate;
      z-index: 1;
    }
  }

  @keyframes gradientShift {
    0% {
      transform: translateY(-20%);
    }
    100% {
      transform: translateY(20%);
    }
  }

  .container {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 550px;
    padding-left: 0px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: #0000000f 0px 4px 20px 0px;
    z-index: 2;
    position: relative;
    overflow: hidden;

    .image {
      width: 50%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .content {
      width: 50%;
      flex: 1;
      h1 {
        margin-bottom: 30px;
        color: #252525;
        text-align: center;
        font-size: 4rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.6;
      }

      .input-username,
      .input-pass {
        margin-bottom: 20px;

        label {
          color: #333;
          font-size: 2rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          margin-bottom: 10px;
          span {
            color: red;
          }
        }

        .input-box {
          display: flex;
          align-items: center;
          background: #f1f3f5;
          border-radius: 5px;
          padding: 0 10px;
          margin-top: 10px;
          transition: box-shadow 0.3s ease;

          .input-icon {
            color: #555;
            margin-right: 10px;
            font-size: 2rem;
          }

          input {
            flex: 1;
            height: 40px;
            border: none;
            color: #252525;
            font-size: 1.6rem;
            background: transparent;
            outline: none;

            &::placeholder {
              color: #999;
              font-size: 1.4rem;
            }
          }
          .toggle-password {
            cursor: pointer;
            color: #555;
            font-size: 1.8rem;
            margin-left: 10px;
            display: flex;
            align-items: center;
          }

          &:hover {
            box-shadow: 0 0 0 2px #252525;
          }

          &:focus-within {
            box-shadow: 0 0 0 2px #252525;
          }
        }
      }

      .input-pass .input-box {
        background: #f1f3f5;
      }

      .button {
        display: flex;
        gap: 20px;
        width: 100%;
        margin: 0 auto;
        justify-content: center;
        gap: 30px;
        margin-top: 50px;

        .button-login {
          background-color: #252525;
          color: #fff;
          font-size: 1.6rem;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.6;
          border-radius: 5px;
          padding: 5px 50px;
          border: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: 0.3s all ease;

          &:hover {
            background-color: #252525;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }
        }

        .button-cancel {
          background-color: #fff;
          color: #252525;
          font-size: 1.6rem;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.6;
          border-radius: 5px;
          padding: 5px 50px;
          border: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          transition: 0.3s all ease;

          &:hover {
            box-shadow: 0 0 0 2px #252525;
          }
        }

        @media (max-width: 1185px) {
          flex-direction: column;
          width: 100%;
          gap: 0px;

          .button-login,
          .button-cancel {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }

      .forgot {
        text-align: end;
        margin: 0px 10px;
        margin-top: 20px;
        a {
          color: #555;
          font-size: 1.6rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          text-decoration: none;
          transition: 0.3s all ease;

          &:hover {
            color: #252525;
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      width: 90%;
      height: auto;
      padding: 20px;
      gap: 20px;

      .image {
        width: 100%;
        height: 250px;
      }

      .content {
        width: 100%;

        .input-username .input-box,
        .input-pass .input-box {
          width: 100%;
        }

        .button {
          flex-direction: column;
          width: 100%;

          .button-login,
          .button-cancel {
            width: 100%;
            margin-bottom: 10px;
          }
        }

        .forgot {
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .image {
      display: none;
    }
    .container {
      padding: 10px;

      .content .input-username label,
      .content .input-pass label {
        font-size: 1.6rem;
      }

      .content .input-box input {
        font-size: 1.4rem;
        padding-left: 5px;
      }
      .content .button {
        font-size: 1.4rem;
      }

      .content .forgot a {
        font-size: 1.4rem;
      }
    }
  }
`

export default Login
