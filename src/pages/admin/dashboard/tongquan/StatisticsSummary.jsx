import styled from 'styled-components';
function StatisticsSummary({data}) {
  return (
    <StatisticsWrapper>
      <h3>Thống kê chung:</h3>
      <div className="stats-grid">
        {data.map((stat, index) => (
          <StatCard key={index} color={stat.color}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </StatCard>
        ))}
      </div>
    </StatisticsWrapper>
  );
}

const StatisticsWrapper = styled.div`
  padding: 20px;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 20px;
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 425px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  .stat-icon {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 16px;
  }
`;

export default StatisticsSummary;
