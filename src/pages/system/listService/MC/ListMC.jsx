import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import FilterMCSearch from './FilterMCSearch'
import ResultMCSearch from './ResultMCSearch'

import someMCData from '../../../../data/someMCData'

function ListMC() {
  return (
    <>
      <Helmet>
        <title>Danh sách MC</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListMCWrapper>
        <FilterMCSearch />
        <ListMCMainWrapper className="container">
          <ResultMCSearch resultSearch={someMCData} />
        </ListMCMainWrapper>
      </ListMCWrapper>
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

const ListMCWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`
const ListMCMainWrapper = styled.section``

export default ListMC
