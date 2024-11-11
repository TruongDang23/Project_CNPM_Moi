import { useEffect, useState, useContext } from 'react'
import APIClient from '../../../../api/client'
import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import Pagination from '../../../../components/Pagination'
import FilterNCSearch from './FilterNCSearch'
import ResultNCSearch from './ResultNCSearch'

import {
  ListNCContext,
  ListNCProvider
} from '../../../../context/ListNCContext'

function ListNC() {
  const { searchParams } = useContext(ListNCContext)
  const [ncData, setNcData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const apiClient = new APIClient('nhaccong')
    const params = { ...searchParams, page: currentPage }
    apiClient
      .findParams(params)
      .then((response) => {
        setNcData(response.data.nhaccong || [])
        setTotalPages(response.data.totalPages || 1)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [searchParams, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

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
        <ListNCProvider>
          <FilterNCSearch />
          <ListNCMainWrapper className="container">
            <ResultNCSearch resultSearch={ncData} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </ListNCMainWrapper>
        </ListNCProvider>
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
