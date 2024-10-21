import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import FilterComboSearch from './FilterComboSearch'
import ResultComboSearch from './ResultComboSearch'

import someCombodata from '../../../../data/someCombodata'

function ListCombo() {
  return (
    <>
      <Helmet>
        <title>Danh sách combo món ăn</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListComboWrapper>
        <FilterComboSearch />
        <ListComboMainWrapper className="container">
          <ResultComboSearch resultSearch={someCombodata} />
        </ListComboMainWrapper>
      </ListComboWrapper>
      <Footer />
    </>
  )
}

const ListComboWrapper = styled.main``
const ListComboMainWrapper = styled.section``

export default ListCombo
