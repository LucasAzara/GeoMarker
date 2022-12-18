// CSS
import { Form, FormInput, FormSubmit } from './styles'
// Popup
import Swal from 'sweetalert2'
// Context
import { FormContext } from '../../../context/FormData'
// Form Functions
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormEvent, useContext, useState } from 'react'
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

export function HomeForm() {
  // Company Id used for Auto-Fill
  const [companyId, setCompanyId] = useState('')

  // Context
  const { handleAddMapData, mapData } = useContext(FormContext)

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

  // Form Funnctions
  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = newCompanyForm

  const formData = async (data: newCompanyFormData) => {
    // Alert for Feedback
    Swal.fire({
      title: 'Registering your vote',
      showConfirmButton: false,
      timer: 4500,
    })

    handleAddMapData(data)
      .then(() => {
        // Success Message
        Swal.fire({
          icon: 'success',
          title: 'Thank you for voting!',
        })
      })
      .then(() => {
        // Navigate to new Screen
        navigate('/map')
      })
      .catch((error) => {
        // Error message if the vote wasn't registered
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Couldn't register you're vote, try again later!`,
        })
        console.error(error)
      })
  }

  // Auto Fill Form if Company already exists
  const FormFiller = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    // Find company name
    const company = mapData.find(
      (data) => data.companyName === target.value.toUpperCase(),
    )

    // If exists, update companyId to help with form coordination auto-fill
    if (company) {
      console.log('working')
      setCompanyId(company.id)
    }
  }

  return (
    <Form onSubmit={handleSubmit(formData)}>
      {/* Form Inputs */}
      <FormInput
        type="text"
        placeholder="Name"
        id="companyName"
        list="companyNames"
        {...register('companyName')}
        onChange={FormFiller}
        required
      />

      <FormInput
        type="number"
        placeholder="Latitude"
        id="companyLat"
        list="companyLats"
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
        list="companyLongs"
        {...register('companyLong', {
          valueAsNumber: true,
        })}
        min={-180}
        max={180}
        step="any"
        required
      />

      <FormSubmit type="submit">Submit</FormSubmit>

      {/* List of already existing companies */}
      {/* Company Names */}
      <datalist id="companyNames">
        {mapData.map((data) => {
          return <option key={`${data.id}-list`} value={data.companyName} />
        })}
      </datalist>

      {/* Companies Latitude */}
      <datalist id="companyLats">
        {companyId &&
          mapData.map((data) => {
            if (companyId === data.id)
              return <option key={`${data.id}-list`} value={data.companyLat} />
            return ''
          })}
      </datalist>

      {/* Companies Longitude */}
      <datalist id="companyLongs">
        {companyId &&
          mapData.map((data) => {
            if (companyId === data.id)
              return <option key={`${data.id}-list`} value={data.companyLong} />
            return ''
          })}
      </datalist>
    </Form>
  )
}
