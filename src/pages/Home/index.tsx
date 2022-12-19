/* eslint-disable react/no-unescaped-entities */
// CSS
import { HomeContainer, FormIntro, IntroButton } from './styles'
// Icons
import { ArrowCircleRight } from 'phosphor-react'
// Components
import { HomeForm } from './HomeForm'

export function Home() {
  return (
    <HomeContainer>
      <Description />
      <HomeForm />
    </HomeContainer>
  )
}

const Description = () => {
  const FormFocus = () => {
    document.getElementById('companyName')?.focus()
  }

  return (
    <FormIntro>
      <div>
        <h1>Welcome to GeoMarker!</h1>
        <p>
          GeoMarker is a website that registers users votes for the best
          companies around the world!
        </p>
        <p>
          Each vote will be given a score which will be tallied by the end of
          the year so hurry up and vote while you still can!
        </p>
        <p>
          All you have to do is write down the name of the company and it's
          geographical location (Latitude & Longitude)
        </p>
        <p>Go on give it a try!</p>
        <IntroButton onClick={FormFocus}>
          <ArrowCircleRight />
        </IntroButton>
      </div>
    </FormIntro>
  )
}
