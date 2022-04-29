import React from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { useMutation } from '../../lib/graphql'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import Input from '../../components/Input'

const CREATE_CATEGORY = `
    mutation createCategory($name: String!, $slug: String!){
      createCategory (input: {
        name: $name,
        slug: $slug
      }) {
        id
        name
        slug
      }
    }
  `

const CreateCategories = () => {
  const router = useRouter()
  const [data, createCategory] = useMutation(CREATE_CATEGORY)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    onSubmit: async values => {
      await createCategory(values)
      router.push('/categories')
    }
  })

  return (
    <Layout>
      <Title>DevShop - Create Categories</Title>
      <Button.LinkOutline href='/categories'>Back</Button.LinkOutline>

      <div className='flex flex-row mt-8'>
        <div className=' align-middle inline-block min-w-full bg-gray-300 rounded p-4 shadow overflow-hidden'>
          <form onSubmit={form.handleSubmit}>
            <Input
              label='Category Name'
              type='text'
              placeholder='Type a name for new Category'
              name='name'
              onChange={form.handleChange}
              value={form.values.name}
            />
            <Input
              label='Category Slug'
              type='text'
              placeholder='Type a slug for new Category'
              name='slug'
              onChange={form.handleChange}
              value={form.values.slug}
            />

            <Button type='submit'>Save</Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategories
