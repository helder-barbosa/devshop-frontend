import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '../../../lib/graphql'
import { useFormik } from 'formik'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

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
    <Layout>
      <Title>Edit Category {JSON.stringify(router.query.id)}</Title>
      <Button.LinkOutline href='/categories'>Back</Button.LinkOutline>
      <div className='flex flex-row mt-8'>
        <div className=' align-middle inline-block min-w-full bg-gray-300 rounded p-4 shadow overflow-hidden'>
          <form onSubmit={form.handleSubmit}>
            <Input
              label='Category Name'
              type='text'
              placeholder='Type a name for Category'
              name='name'
              onChange={form.handleChange}
              value={form.values.name}
            />

            <Input
              label='Category Slug'
              type='text'
              placeholder='Type a slug for Category'
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

export default Edit
