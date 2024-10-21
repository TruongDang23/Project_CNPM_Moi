import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import FilterHallSearch from './FilterHallSearch'
import ResultHallSearch from './ResultHallSearch'

import someHallData from '../../../../data/someHallData'

function ListHall() {
  return (
    <>
      <Helmet>
        <title>Danh sách hội trường</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListHallWrapper>
        <FilterHallSearch />
        <ListHallMainWrapper className="container">
          <ResultHallSearch resultSearch={someHallData} />
        </ListHallMainWrapper>
      </ListHallWrapper>
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

const ListHallMainWrapper = styled.section``

const ListHallWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`

export default ListHall
