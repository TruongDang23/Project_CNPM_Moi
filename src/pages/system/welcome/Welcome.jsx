import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'
import { useState } from 'react'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import HeroSection from './HeroSection'

function Welcome() {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <WelcomeWrapper>
        <HeroSection />
      </WelcomeWrapper>
      <Footer />
    </>
  )
}

const WelcomeWrapper = styled.main`
  height: 150vh;
`

export default Welcome
