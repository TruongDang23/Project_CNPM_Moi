import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import FilterThiepSearch from './FilterThiepSearch'
import ResultThiepSearch from './ResultThiepSearch'

import someThiepData from '../../../../data/someThiepData'

function ListThiep() {
  return (
    <>
      <Helmet>
        <title>Danh sách thiệp</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListThiepWrapper>
        <FilterThiepSearch />
        <ListThiepMainWrapper className="container">
          <ResultThiepSearch resultSearch={someThiepData} />
        </ListThiepMainWrapper>
      </ListThiepWrapper>
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

const ListThiepWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`
const ListThiepMainWrapper = styled.section``

export default ListThiep
