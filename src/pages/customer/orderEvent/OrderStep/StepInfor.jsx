import styled from 'styled-components'
import { OrderContext } from '../../../../context/OrderContext'
import { useContext, useState } from 'react'
import {
  TextField,
  Grid
} from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'

function StepInfor() {
  const [formData, setFormData] = useState({
    startTime: dayjs(),
    endTime: dayjs(),
    tableCount: 0,
    invitationCount: 0,
    note: ''
  })

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Form data:', formData)
  }

  return (
    <>
      <StepInforWrapper>
        <h3>Thông tin đặt sự kiện</h3>
        <div className='content'>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DateTimePicker
                  label="Thời điểm bắt đầu sự kiện"
                  value={formData.startTime}
                  onChange={(newValue) => handleChange('startTime', newValue)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      InputLabelProps={{ sx: { fontSize: '1.6rem' } }}
                      sx={{ fontSize: '1.6rem', '& .MuiInputBase-input': { fontSize: '1.6rem' } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  label="Thời điểm kết thúc sự kiện"
                  value={formData.endTime}
                  onChange={(newValue) => handleChange('endTime', newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} InputLabelProps={{ sx: { fontSize: '1.6rem' } }}
                    sx={{ fontSize: '1.6rem', '& .MuiInputBase-input': { fontSize: '1.6rem' } }}
                  />}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Số lượng bàn ăn"
                  type="number"
                  value={formData.tableCount}
                  InputLabelProps={{ sx: { fontSize: '1.6rem' } }}
                  inputProps={{ min: 0 }}
                  onChange={(e) => handleChange('tableCount', e.target.value)}
                  sx={{ fontSize: '1.6rem', '& .MuiInputBase-input': { fontSize: '1.6rem' } }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Số lượng thiệp mời"
                  type="number"
                  value={formData.invitationCount}
                  InputLabelProps={{ sx: { fontSize: '1.6rem' } }}
                  inputProps={{ min: 0 }}
                  onChange={(e) => handleChange('invitationCount', e.target.value)}
                  sx={{ fontSize: '1.6rem', '& .MuiInputBase-input': { fontSize: '1.6rem' } }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Ghi chú"
                  value={formData.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  InputLabelProps={{ sx: { fontSize: '1.6rem' } }}
                  sx={{ fontSize: '1.6rem', '& .MuiInputBase-input': { fontSize: '1.6rem' } }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </div>
      </StepInforWrapper>
    </>
  )
}

const StepInforWrapper = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }
  .content {
    width: 70%;
    margin: 0 auto; /* Căn giữa */
    padding-top: 50px;
  }
`
export default StepInfor
