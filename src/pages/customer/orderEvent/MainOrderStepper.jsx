import { useContext, useState } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { OrderContext } from '../../../context/OrderContext'
import styled from 'styled-components'
import Loading from '../../system/Loading'

import StepHall from './OrderStep/StepHall'
import StepMC from './OrderStep/StepMC'
import StepNC from './OrderStep/StepNC'
import StepCombo from './OrderStep/StepCombo'
import StepThiep from './OrderStep/StepThiep'
import StepInfor from './OrderStep/StepInfor'

const steps = [
  'Chọn hội trường',
  'Chọn MC',
  'Chọn Nhạc Công',
  'Chọn Thực Đơn',
  'Chọn Thiệp',
  'Thông tin đặt'
]

function MainOrderStepper() {
  const { markdata, getAllSelections, canCompleteOrder } =
    useContext(OrderContext)
  const { LuuHoiTruong, LuuMC, LuuNhacCong, LuuCombo, LuuThiep } = markdata
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const renderStepContent = (step) => {
    switch (step) {
    case 0:
      return <StepHall luuHoiTruong={LuuHoiTruong} />
    case 1:
      return <StepMC luuMC={LuuMC} />
    case 2:
      return <StepNC luuNhacCong={LuuNhacCong} />
    case 3:
      return <StepCombo luuCombo={LuuCombo} />
    case 4:
      return <StepThiep luuThiep={LuuThiep} />
    case 5:
      return <StepInfor/>
    default:
      return <Typography>Không có bước này</Typography>
    }
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleReset = () => {
    const { valid, message } = canCompleteOrder()
    if (!valid) {
      alert(message)
      return
    } else {
      alert('Đặt hàng thành công')
    }
    console.log(getAllSelections())
  }

  const handleComplete = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      handleReset()
    }, 3000)
  }

  return (
    <MainOrderStepperWrapper>
      {isLoading && <Loading />}
      <div className={isLoading ? 'blur-content' : ''}>
        <CustomStepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </CustomStepper>

        <div className="order-stepper-content">
          {renderStepContent(activeStep)}
        </div>

        <div className="order-stepper-action">
          {activeStep > 0 && (
            <button color="inherit" onClick={handleBack} id="btn-secoundary">
              Quay lại
            </button>
          )}
          <button
            id="btn-primary"
            onClick={
              activeStep === steps.length - 1 ? handleComplete : handleNext
            }
          >
            {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp'}
          </button>
        </div>
      </div>
    </MainOrderStepperWrapper>
  )
}

// eslint-disable-next-line no-unused-vars
const CustomStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: '20px',
  '& .MuiStep-root': {
    '& .MuiStepLabel-label': {
      color: 'var(--primary-color)',
      fontSize: '1.6rem'
    },
    '& .MuiStepIcon-root': {
      color: 'var(--primary-color)',
      fontSize: '2.4rem'
    }
  }
}))

const MainOrderStepperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .blur-content {
    filter: blur(5px);
    pointer-events: none; /* Ngăn chặn tương tác với nội dung khi đang loading */
  }

  .order-stepper-content {
    flex-grow: 1;
    min-height: 400px;
  }

  .order-stepper-action {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 100%; /* Đảm bảo nó chiếm chiều rộng đầy đủ */
  }

  @media (max-width: 768px) {
    .order-stepper-action {
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  }

  @media (max-width: 480px) {
    .order-stepper-action {
      padding: 10px;
    }
  }
`

export default MainOrderStepper
