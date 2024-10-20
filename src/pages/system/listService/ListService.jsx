import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

function ListService() {
  return (
    <>
      <Helmet>
        <title>Danh sách dịch vụ</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <Footer />
    </>
  )
}



const ListServiceWrapper = styled.main``

export default ListService
