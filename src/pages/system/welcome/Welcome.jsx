import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import someHallData from '../../../data/someHallData'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import HeroSection from './HeroSection'
import SomeHall from './SomeHall'
import SecondHeroSection from './SecondHeroSection'
import IntroService from './IntroService'

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
        <WelcomMainWrapper className="container">
          <SomeHall someHallData={someHallData} />
          <IntroService />
        </WelcomMainWrapper>
        <SecondHeroSection />
      </WelcomeWrapper>
      <Footer />
    </>
  )
}

const WelcomMainWrapper = styled.section``

const WelcomeWrapper = styled.main`
  height: auto;
`

export default Welcome