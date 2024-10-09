import styled from 'styled-components'

function Footer() {
  return (
    <FooterWrapper>
      <div className="container">
        <h3>Đồ án Đặt và Quản lý tổ chức Sự kiện</h3>
        <div className="footer-content">
          <ul>
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
  }

  .footer-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
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
  }
`
export default Footer
