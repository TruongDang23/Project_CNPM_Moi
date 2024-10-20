import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import FilterSearch from './FilterSearch'
import ResultSearch from './ResultSearch'

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
        <FilterSearch />
        <ListHallMainWrapper className="container">
          <ResultSearch />
        </ListHallMainWrapper>
      </ListHallWrapper>
      <Footer />
    </>
  )
}

const ListHallMainWrapper = styled.section``

const ListHallWrapper = styled.main``

export default ListHall
