import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'
import { useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

function Welcome() {
  return (
    <>
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <WelcomeWrapper>
        <h1>Welcome to the system</h1>
      </WelcomeWrapper>
      <Footer />
    </>
  )
}

const WelcomeWrapper = styled.main`
  height: 150vh;
`

export default Welcome
