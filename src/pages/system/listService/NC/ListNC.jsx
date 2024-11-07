import { useEffect, useState } from 'react'
import APIClient from '../../../../api/client'
import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import FilterNCSearch from './FilterNCSearch'
import ResultNCSearch from './ResultNCSearch'

function ListNC() {
  const [ncData, setNcData] = useState([])

  useEffect(() => {
    const apiClient = new APIClient('nhaccong')
    apiClient
      .find()
      .then((response) => {
        setNcData(response.data.nhaccong || []) // Gán dữ liệu vào state
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  console.log(ncData)

  return (
    <>
      <Helmet>
        <title>Danh sách nhạc công</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListNCWrapper>
        <FilterNCSearch />
        <ListNCMainWrapper className="container">
          <ResultNCSearch resultSearch={ncData} />
        </ListNCMainWrapper>
      </ListNCWrapper>
      <Footer />
    </>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const ListNCWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`
const ListNCMainWrapper = styled.section``

export default ListNC
