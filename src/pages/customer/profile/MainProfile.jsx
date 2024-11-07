import { useContext, useState } from 'react'
import styled from 'styled-components'

import { ProfileContext } from '../../../context/ProfileContext'
import AvatarUser from '../../../components/AvatarUser'

function MainProfile() {
  const { profile, updateProfile, removeItem } = useContext(ProfileContext)
  console.log(profile)

  const [localProfile, setLocalProfile] = useState(profile)

  const handleRemoveItem = (listName, itemId) => {
    removeItem(listName, itemId)
    setLocalProfile((prevProfile) => ({
      ...prevProfile,
      [listName]: prevProfile[listName].filter((item) => item._id !== itemId)
    }))
  }

  const handleSave = () => {
    updateProfile(localProfile)
  }

  const handleCancelUpdate = () => {
    setLocalProfile(profile)
    // Load lại trang để reset form
    window.location.reload()
  }

  // chuyển date trong profile thành dạng yyyy-mm-dd
  const date = new Date(profile.NgaySinh)
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

  return (
    <MainProfileWrapper className="container">
      <div className="profile-content">
        <div className="profile-heading">
          <h2>Thông tin cá nhân</h2>
          <hr />
        </div>
        <div className="profile-info">
          <div className="profile-info-img">
            <AvatarUser name={profile.HoTen} size={150} />
          </div>
          <div className="profile-info-content">
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ Tên:</label>
                  <input type="text" value={profile.HoTen} />
                </div>
                <div className="form-group">
                  <label>Giới Tính:</label>
                  <select value={profile.GioiTinh}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input type="tel" value={profile.SDT} />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" value={profile.Email} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày sinh:</label>
                  <input type="date" value={formattedDate} />
                </div>
                <div className="form-group">
                  <label>Nơi sống:</label>
                  <input type="text" value={profile.NoiSong} />
                </div>
              </div>
              <button id="btn-primary" onClick={() => updateProfile(profile)}>
                Lưu
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-heading">
          <h2>Các mục đã lưu</h2>
          <hr />
        </div>
        <div className="profile-luu">
          <div className="profile-luu-content">
            <div className="profile-luu-item">
              <h4>Hội trường</h4>
              <ul>
                {profile.LuuHoiTruong.map((item) => (
                  <li key={item._id}>
                    {item.TenHoiTruong}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('LuuHoiTruong', item._id)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="profile-luu-item">
              <h4>MC</h4>
              <ul>
                {profile.LuuMC.map((item) => (
                  <li key={item._id}>
                    {item.HoTen}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('LuuMC', item._id)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="profile-luu-item">
              <h4>Nhạc công</h4>
              <ul>
                {profile.LuuNhacCong.map((item) => (
                  <li key={item._id}>
                    {item.HoTen}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('LuuNhacCong', item._id)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="profile-luu-item">
              <h4>Thiệp mời</h4>
              <ul>
                {profile.LuuThiepMoi.map((item) => (
                  <li key={item._id}>
                    {item.LoaiThiep}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('LuuThiepMoi', item._id)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="profile-luu-item">
              <h4>Combo</h4>
              <ul>
                {profile.LuuCombo.map((item) => (
                  <li key={item._id}>
                    {item.TenCombo}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('LuuCombo', item._id)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="button-row">
            <button id="btn-primary" onClick={handleSave}>
              Lưu
            </button>
            <button id="btn-cancel" onClick={handleCancelUpdate}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </MainProfileWrapper>
  )
}

const MainProfileWrapper = styled.section`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .profile-heading {
    text-align: center;
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
    border: 1px solid #ccc;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: #0000000f 0px 4px 20px 0px;

    .profile-info {
      display: flex;
      margin-top: 2rem;
      margin-bottom: 2rem;
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
          margin-top: 50px;
        }
      }
    }

    .profile-luu {
      margin-top: 2rem;
      text-align: center;

      h3 {
        font-size: 2rem;
      }
      hr {
        width: 100%;
        margin: 1rem auto;
      }
      .profile-luu-content {
        display: flex;
        justify-content: center;
        gap: 50px;
        .profile-luu-item {
          h4 {
            font-size: 1.8rem;
            margin-bottom: 10px;
          }
          ul {
            list-style: none;
            padding: 0;
            li {
              margin-bottom: 10px;
            }
          }

          button {
            background-color: #fff;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            margin-left: 10px;
            cursor: pointer;
            transition: all 0.4s;

            &:hover {
              background-color: #333;
            }
          }
        }
      }
      .button-row {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 20px;
      }
    }
  }
`

export default MainProfile
