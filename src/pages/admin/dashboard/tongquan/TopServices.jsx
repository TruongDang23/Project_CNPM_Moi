import styled from 'styled-components';
function TopServices({data}) {
  return (
    <TopServicesWrapper>
      <h3>Những hội trường và dịch vụ đứng đầu:</h3>
      <ul>
        {data.map((service, index) => (
          <li key={index}>
            <span className="service-name">{service.name}</span>
            <span className="service-orders">{service.orders} lượt đặt</span>
            <span className="service-success">Thành công: <SuccessRate>{service.successRate}</SuccessRate></span>
          </li>
        ))}
      </ul>
    </TopServicesWrapper>
  );
}

const TopServicesWrapper = styled.div`
  padding: 20px;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Chia thành 2 cột */
    gap: 10px; /* Tạo khoảng cách giữa các mục */
    grid-auto-flow: row; /* Hiển thị từ trên xuống dưới và rồi sang phải */
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between; /* Giúp các phần tử bên trong căn đều giữa tên dịch vụ và số lượng */
    align-items: center;
    padding: 10px;
    font-size: 1.2rem;
    border-bottom: 1px solid #e0e0e0;

    .service-name {
      flex: 1;
      text-align: left;
    }

    .service-orders {
      flex: 1;
      text-align: center;
    }

    .service-success {
      flex: 1;
      text-align: right;
    }
  }
`;

const SuccessRate = styled.span`
  background-color: #d4edda;
  color: #28a745;
  padding: 2px 8px;
  border-radius: 5px;
`;


export default TopServices;
