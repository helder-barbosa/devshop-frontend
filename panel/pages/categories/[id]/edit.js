import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '../../../lib/graphql'
import { useFormik } from 'formik'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'

const UPDATE_CATEGORY = `
    mutation updateCategory($id: String!, $name: String!, $slug: String!){
      updateCategory (input: {
        id: $id,
        name: $name,
        slug: $slug
      }) {
        id
        name
        slug
      }
    }
  `

const Edit = () => {
  const router = useRouter()
  const { data } = useQuery(`
    query{
      getCategoryById(id:"${router.query.id}"){
        name
        slug
      }
    }
  `)

  const [updatedData, updateCategory] = useMutation(UPDATE_CATEGORY)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    onSubmit: async values => {
      console.log(values)
      const category = {
        ...values,
        id: router.query.id
      }
      await updateCategory(category)
      router.push('/categories')
    }
  })
  useEffect(() => {
    if (data && data.getCategoryById) {
      form.setFieldValue('name', data.getCategoryById.name)
      form.setFieldValue('slug', data.getCategoryById.slug)
    }
  }, [data])

  return (
    <div>
      <Layout>
        <div className=' my-2'>
          <Title>Edit Category {JSON.stringify(router.query.id)}</Title>
        </div>
        <div className='flex flex-row mt-8'>
          <div className=' container p-2 min-w-full shadow-lg rounded-lg bg-gray-400'>
            <form onSubmit={form.handleSubmit}>
              <div className=' p-3 m-4 space-x-2'>
                <input
                  className=' p-2 rounded-lg'
                  type='text'
                  name='name'
                  placeholder='name'
                  onChange={form.handleChange}
                  value={form.values.name}
                />
              </div>
              <div className=' p-3 m-4 space-x-2'>
                <input
                  className=' p-2 rounded-lg'
                  type='text'
                  name='slug'
                  placeholder='slug'
                  onChange={form.handleChange}
                  value={form.values.slug}
                />
              </div>
              <button
                className=' p-3 m-4 rounded-lg bg-gray-900 text-white hover:bg-gray-600'
                type='submit'
              >
                Edit Category
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Edit
