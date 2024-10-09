import styled from 'styled-components'

function Footer() {
  return (
    <FooterWrapper>
      <div className="container">
        <h3>Đồ án Đặt và Quản lý tổ chức Sự kiện</h3>
        <div className="footer-content">
          <ul>
            <li>＼(・ω・＼) 🧑‍💻 (／・ω・)／</li>
            <li>Lê Thành Vinh</li>
            <li>Đặng Quang Trường</li>
            <li>Vũ Hoàng Gia Bảo</li>
          </ul>
          {/* THêm ảnh gif */}
          <img src="https://i.ibb.co/TK9DgQZ/76332.gif" alt="footer" />
          <a
            href="https://github.com/TruongDang23/Project_CNPM_Moi"
            target="_blank"
            rel="noreferrer"
          >
            Github Repository:
            <br />
            https://github.com/TruongDang23/Project_CNPM_Moi
          </a>
        </div>
      </div>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  background-color: #212121;
  color: #fff;
  padding: 40px 20px;

  h3 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 40px;
    text-align: center;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.6rem;
    line-height: 1.6;
    margin-top: 20px;
    display: block;
    text-align: center;
  }

  .footer-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  }

  li {
    margin: 0 10px;
    font-size: 1.6rem;
    margin-bottom: 10px;
    line-height: 1.6;
  }

  img {
    width: 200px;
    height: 100%;
    object-fit: cover;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  }
`

export default Footer
