import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField' // Ví dụ component tùy chỉnh
import FormControl from '@mui/material/FormControl' // Ví dụ component tùy chỉnh
// Import các component khác mà bạn muốn sử dụng cho từng bước

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

// Tạo các component hoặc nội dung cho từng bước
const StepContent = (step) => {
  switch (step) {
    case 0:
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Select Campaign Settings</Typography>
          <TextField
            label="Campaign Name"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          {/* Thêm các trường hoặc component khác cho bước này */}
        </Box>
      )
    case 1:
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Create an Ad Group</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            {/* Ví dụ: Các trường hoặc lựa chọn cho Ad Group */}
            <TextField label="Ad Group Name" variant="outlined" />
          </FormControl>
          {/* Thêm các component khác nếu cần */}
        </Box>
      )
    case 2:
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Create an Ad</Typography>
          {/* Thêm các component hoặc nội dung cho bước tạo ad */}
          <TextField
            label="Ad Title"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Ad Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          {/* Thêm các component khác nếu cần */}
        </Box>
      )
    default:
      return 'Unknown step'
  }
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())

  const isStepOptional = (step) => {
    return step === 1 // Ví dụ: Bước thứ 2 là tùy chọn
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            )
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Hiển thị nội dung tùy chỉnh cho từng bước */}
          {StepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}
