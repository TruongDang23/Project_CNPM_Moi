import StatisticsSummary from './StatisticsSummary';
import TopServices from './TopServices';
import ProfitChart from './ProfitChart';
import styled from 'styled-components'
import someTQData from '../../../../data/someTQData'

function TongQuan() {
  return (
    <div className="tongquan">
      <TongQuanWrapper>
        <h2>Tổng Quan</h2>
        <div className="hall-content">
          <div className="hall-content-detail">
            <StatisticsSummary data={someTQData.statsData}/>
          </div>
          <div className="hall-content-detail">
            <TopServices data={someTQData.servicesData} />
          </div>
          <div className="hall-content-detail">
            <ProfitChart data={someTQData.dataChart} value={someTQData.totalAmount}/>
          </div>
        </div>

      </TongQuanWrapper>
    </div>
  );
}

const TongQuanWrapper = styled.section`
font-family: 'Source Sans 3', sans-serif;
  h2 {
    color: var(--primary-color);
    width: 100%;
    font-size: 2.4rem;
    margin: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .hall-content {
    margin: 20px;
    display: grid;
    grid-template-rows: auto 
    gap: 50px;

    .hall-content-detail {
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  }
`
export default TongQuan;