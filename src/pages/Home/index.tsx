/* eslint-disable react/no-unescaped-entities */
// CSS
import {
  HomeContainer,
  Form,
  FormIntro,
  FormInput,
  FormSubmit,
  IntroButton,
} from './styles'
// Icons
import { ArrowCircleRight } from 'phosphor-react'
// Popup
import Swal from 'sweetalert2/dist/sweetalert2.js'
// Context
import { FormContext, IMap } from '../../context/FormData'
// Form Functions
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const newCompanyValidationSchema = zod.object({
  companyName: zod.string().min(1, { message: 'Fill out company name' }),
  companyLat: zod
    .number()
    .gte(-90, { message: 'Latitude cannot be less than -90' })
    .lte(90, { message: 'Latitude cannot be larger than 90' }),
  companyLong: zod
    .number()
    .gte(-180, { message: 'Longitude cannot be less than -180' })
    .lte(180, { message: 'Longitude cannot be larger than 180' }),
})

type newCompanyFormData = zod.infer<typeof newCompanyValidationSchema>

export function Home() {
  // Context
  const { handleAddMapData } = useContext(FormContext)

  // Router
  const navigate = useNavigate()

  // Form Validation
  const newCompanyForm = useForm<newCompanyFormData>({
    resolver: zodResolver(newCompanyValidationSchema),
    defaultValues: {
      companyName: '',
      companyLat: undefined,
      companyLong: undefined,
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = newCompanyForm

  const formData = async (data: newCompanyFormData) => {
    handleAddMapData(data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Thank you for voting!',
        })
      })
      .then(() => {
        navigate('/map')
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Couldn't register you're vote, try again later!`,
        })
        console.error(error)
      })
  }

  return (
    <HomeContainer>
      <Description />

      <Form onSubmit={handleSubmit(formData)}>
        <FormInput
          type="text"
          placeholder="Name"
          id="companyName"
          {...register('companyName')}
          required
        />

        <FormInput
          type="number"
          placeholder="Latitude"
          id="companyLat"
          {...register('companyLat', {
            valueAsNumber: true,
          })}
          min={-90}
          max={90}
          step="any"
          required
        />

        <FormInput
          type="number"
          placeholder="Longitude"
          id="companyLong"
          {...register('companyLong', {
            valueAsNumber: true,
          })}
          min={-180}
          max={180}
          step="any"
          required
        />

        <FormSubmit type="submit">Submit</FormSubmit>
      </Form>
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
          <ArrowCircleRight size={46} />
        </IntroButton>
      </div>
    </FormIntro>
  )
}
