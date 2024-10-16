import styled from 'styled-components'
import HorizontalLinearStepper from './HorizontalLinearStepper'

function MainOrder() {
  return (
    <OrderEventWrapper className="container">
      <div className="order-event-heading">
        <h2>Đặt sự kiện</h2>
        <button id="btn-cancel">Quay lại</button>
      </div>
      <hr />
      {/* <HorizontalLinearStepper /> */}
    </OrderEventWrapper>
  )
}

const OrderEventWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 550px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  .order-event-heading {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Align all items to center vertically */
    padding: 1rem;
    width: 100%;
    height: auto;

    h2 {
      margin: 0;
      color: var(--primary-color);
      font-size: 2.4rem;
      margin-bottom: 0;
      align-self: center; 
    }

    #btn-cancel {
      margin-top: 0;
      align-self: center;
    }
  }
`

export default MainOrder
