import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import styled from 'styled-components'

// Các component của từng bước

import StepHall from './OrderStep/StepHall'
import StepMC from './OrderStep/StepMC'

const steps = [
  'Chọn hội trường',
  'Chọn MC',
  'Chọn Nhạc Công',
  'Chọn Thực Đơn',
  'Chọn Thiệp'
]

function MainOrderStepper({ orderdata }) {
  const { LuuHoiTruong, LuuMC, LuuNhacCong, LuuCombo, LuuThiep } = orderdata
  const [activeStep, setActiveStep] = useState(0)

  // Hàm để chuyển đổi giữa các component theo step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepHall luuHoiTruong={LuuHoiTruong} />
      case 1:
        return <StepMC luuMC={LuuMC} />
      case 2:
        return <Typography>Chọn Nhạc Công</Typography>
      case 3:
        return <Typography>Chọn Thực Đơn</Typography>
      case 4:
        return <Typography>Chọn Thiệp</Typography>
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
    setActiveStep(0)
  }

  return (
    <MainOrderStepperWrapper>
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
        <button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          id="btn-secoundary"
        >
          Quay lại
        </button>
        <button
          id="btn-primary"
          onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
        >
          {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp'}
        </button>
      </div>
    </MainOrderStepperWrapper>
  )
}

const CustomStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: 'transparent', // Làm nền trong suốt
  padding: '20px', // Thêm padding
  '& .MuiStep-root': {
    '& .MuiStepLabel-label': {
      color: 'var(--primary-color)',
      fontSize: '1.6rem' // Kích thước chữ của label
    },
    '& .MuiStepIcon-root': {
      color: 'var(--primary-color)',
      fontSize: '2.4rem' // Kích thước icon
    }
  }
}))

const MainOrderStepperWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .order-stepper-content {
    flex-grow: 1;
  }

  .order-stepper-action {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`

export default MainOrderStepper
