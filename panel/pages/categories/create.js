import React from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { useMutation } from '../../lib/graphql'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'

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
    <div>
      <Layout>
        <div className=' my-2'>
          <Title>DevShop - Create Categories</Title>
        </div>
        <div className='flex flex-row mt-8'>
          <div className=' flex min-w-full shadow-lg rounded-lg bg-gray-400'>
            <form onSubmit={form.handleSubmit}>
              <div className=' p-3 m-4 space-x-2'>
                <label for='name'>Name</label>
                <input
                  className=' p-2 rounded-lg'
                  type='text'
                  name='name'
                  onChange={form.handleChange}
                  value={form.values.name}
                />
              </div>
              <div className=' p-3 m-4 space-x-2'>
                <label for='slug'>Slug</label>
                <input
                  className=' p-2 rounded-lg'
                  type='text'
                  name='slug'
                  onChange={form.handleChange}
                  value={form.values.slug}
                />
              </div>
              <button
                className=' p-3 m-4 rounded-lg bg-gray-900 text-white hover:bg-gray-600'
                type='submit'
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default CreateCategories
