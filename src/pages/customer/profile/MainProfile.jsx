import { useContext, useState } from 'react'
import styled from 'styled-components'

import { ProfileContext } from '../../../context/ProfileContext'
import AvatarUser from '../../../components/AvatarUser'

function MainProfile() {
  const { profile } = useContext(ProfileContext)
  console.log(profile)
  return (
    <MainProfileWrapper className="container">
      <div className="profile-heading">
        <h2>Thông tin cá nhân</h2>
        <hr />
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-info-img">
            <AvatarUser name={profile.HoTen} size={150} />
          </div>

          <div className="profile-info-content">
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ Tên:</label>
                  <input
                    type="text"
                    value={profile.HoTen}
                    onChange={(e) => setHoTen(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Giới Tính:</label>
                  <select
                    value={profile.GioiTinh}
                    onChange={(e) => setGioiTinh(e.target.value)}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input
                    type="tel"
                    value={profile.SDT}
                    onChange={(e) => setSDT(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={profile.Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày sinh:</label>
                  <input
                    type="date"
                    value={profile.NgaySinh}
                    onChange={(e) => setNgaySinh(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Nơi sống:</label>
                  <input
                    type="text"
                    value={profile.NoiSong}
                    onChange={(e) => setNoiSong(e.target.value)}
                  />
                </div>
              </div>
              <button id="btn-primary" onClick={() => updateProfile(profile)}>
                Lưu
              </button>
            </form>
          </div>
        </div>

        <div className="profile-luu">
          <h3>Các mục đã lưu</h3>
          <hr />
          <div className="profile-luu-content">
            <div className="profile-luu-item">
              <h4>Hội trường</h4>
              <ul>
                {profile.LuuHoiTruong.map((item) => (
                  <li key={item.MaHoiTruong}>{item.TenHoiTruong}</li>
                ))}
              </ul>
            </div>

            <div className="profile-luu-item">
              <h4>MC</h4>
              <ul>
                {profile.LuuMC.map((item) => (
                  <li key={item.MaMC}>{item.HoTen}</li>
                ))}
              </ul>
            </div>

            <div className="profile-luu-item">
              <h4>Nhạc công</h4>
              <ul>
                {profile.LuuNhacCong.map((item) => (
                  <li key={item.MaNhacCong}>{item.HoTen}</li>
                ))}
              </ul>
            </div>

            <div className="profile-luu-item">
              <h4>Thiệp mời</h4>
              <ul>
                {profile.LuuThiepMoi.map((item) => (
                  <li key={item.MaThiepMoi}>{item.LoaiThiep}</li>
                ))}
              </ul>
            </div>

            <div className="profile-luu-item">
              <h4>Combo</h4>
              <ul>
                {profile.LuuCombo.map((item) => (
                  <li key={item.MaCombo}>{item.TenCombo}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainProfileWrapper>
  )
}

const MainProfileWrapper = styled.section`
  .profile-heading {
    text-align: center;
    margin-top: 2rem;
    h2 {
      font-size: 2.5rem;
    }
    hr {
      width: 100%;
      margin: 1rem auto;
    }
  }

  .profile-content {
    color: var(--primary-color);
    font-size: 1.6rem;
    transition: all 0.4s;
    .profile-info {
      display: flex;
      margin-top: 2rem;
      justify-content: center;
      align-items: center;
      .profile-info-img {
        display: flex;
        justify-content: center;
        width: 40%;
        margin-right: 20px;
      }

      .profile-info-content {
        width: 60%;
        .form-group {
          margin-bottom: 15px;
          button {
            float: right;
            margin-top: 10px;
          }
        }

        .form-row {
          display: flex;
          gap: 10px;
        }

        label {
          font-weight: bold;
          margin-bottom: 5px;
          display: block;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--primary-color);
          border-radius: 5px;
        }

        input.disabled {
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          cursor: not-allowed;
        }

        textarea {
          min-height: 100px;
        }

        .button-row {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
        }
      }
    }

    .profile-luu {
      margin-top: 2rem;
      h3 {
        font-size: 2rem;
      }
      hr {
        width: 100%;
        margin: 1rem auto;
      }
      .profile-luu-content {
        display: flex;
        gap: 20px;
        .profile-luu-item {
          h4 {
            font-size: 1.8rem;
          }
          ul {
            list-style: none;
            padding: 0;
            li {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
`

export default MainProfile
