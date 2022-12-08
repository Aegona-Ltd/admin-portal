// ** MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// ** React & hooks Imports
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useConfirm } from 'material-ui-confirm'

// ** Formik & Yup Imports
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'

// **  Components Imports
import BackDrop from 'src/@core/components/back-drop'
import Table from 'src/@core/components/datatable'
import { FormTextField } from 'src/@core/components/FormTextField'
import Modal from 'src/@core/components/modal'
import PageHeader from 'src/@core/components/page-header'
import { displayToast } from 'src/utils/helpers/utility'
import { PaginationParams } from 'src/models/common'

// ** Services Imports
import { useCreateLearnerMutation, useGetLearnersQuery, useDeleteLearnersMutation } from 'src/services/learner'

// ** Next Imports
import Link from 'next/link'

import NewReleasesIcon from '@mui/icons-material/NewReleases'

interface FormValues {
  fullName: string
  email: string
  password: string
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Vui lòng nhập vào email đúng định dạng').required('Vui lòng không bỏ trống'),
  fullName: yup.string().required('Vui lòng không bỏ trống'),
  password: yup.string().required('Vui lòng không bỏ trống')
})

const Students = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const confirm = useConfirm()
  const [searchText, setSearchText] = useState<string>('')
  const [filter, setFilter] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    search: ''
  })

  const debouncedSearchText = useDebounce<string>(searchText, 1000)[0]

  const [createLearner, { isLoading: isLoadingCreate }] = useCreateLearnerMutation()
  const [deleteLearners, { isLoading: isLoadingDelete }] = useDeleteLearnersMutation()
  const { data, isFetching, isLoading: isLoadingGetList, refetch: getListLearner } = useGetLearnersQuery(filter)

  const columns = [
    {
      name: 'profile',
      label: 'Mã',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => (
          <Link href='/learners/3008'>
            <a className='text-purple-DF hover:text-black font-semibold transition-all'>{value.code}</a>
          </Link>
        )
      }
    },
    {
      name: 'profile',
      label: 'Email',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => value.email
      }
    },
    {
      name: 'profile',
      label: 'Họ & Tên',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => value.fullName
      }
    },
    {
      name: 'profile',
      label: 'Số điện thoại',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => value.phoneNumber
      }
    }
  ]

  useEffect(() => {
    if (debouncedSearchText) {
      setFilter({ ...filter, search: debouncedSearchText })
    } else {
      setFilter({ ...filter, search: '' })
    }
  }, [debouncedSearchText])

  const onChangeFilter = (action: string, state) => {
    switch (action) {
      case 'changeRowsPerPage':
        setFilter({ ...filter, limit: state.rowsPerPage })
        break

      case 'changePage':
        setFilter({ ...filter, page: state.page + 1 })
        break

      case 'search':
        setSearchText(state.searchText)
        break
    }
  }

  const confirmOptions = {
    title: (
      <div>
        <NewReleasesIcon />
        Xác nhận xóa
      </div>
    ),
    confirmationText: 'Xóa',
    cancellationText: 'Hủy',
    content: <p>Bạn có chắc chắn muốn xóa?</p>
  }

  const onDelete = async rowsDeleted => {
    confirm(confirmOptions).then(async () => {
      const listId = rowsDeleted.data
        .map(row => ({
          Ids: data.data[row.dataIndex].id
        }))
        .map(id => `Ids=${id.Ids}&`)
        .join('')

      try {
        const res = await deleteLearners(listId).unwrap()
        if (res.success) {
          getListLearner()
          displayToast('success', 'Xóa thành công!')
        }
      } catch (e) {
        displayToast('error', e.data.ErrorMessage)
      }
    })

    return false
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    formikHelpers.setSubmitting(false)
    try {
      const res = await createLearner(values).unwrap()
      if (res.success) {
        getListLearner()
        handleClose()
        displayToast('success', 'Create new learner success!')
      }
    } catch (e) {
      displayToast('error', e.data.ErrorMessage)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader titlePage='Quản lý học viên' handleOpen={handleOpen} />

        {data && (
          <Table
            title={'Bảng danh sách học viên'}
            data={data.data}
            columns={columns}
            total={data.total}
            onChangeFilter={onChangeFilter}
            filter={filter}
            onDelete={onDelete}
          />
        )}

        <Modal title='Thêm mới học viên' open={open} handleClose={handleClose}>
          <Formik
            initialValues={{
              email: '',
              fullName: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form noValidate autoComplete='off'>
              <Field
                required
                autoFocus
                fullWidth
                id='fullName'
                name='fullName'
                label='Họ & Tên'
                component={FormTextField}
              />
              <Field required fullWidth id='email' name='email' label='Email' component={FormTextField} />
              <Field
                required
                label='Password'
                id='password'
                name='password'
                type='password'
                component={FormTextField}
              />
              <div className='custom-modal__footer'>
                <Button type='submit' size='small' variant='contained'>
                  Lưu
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal>
        <BackDrop isOpen={isLoadingCreate || isLoadingGetList || isLoadingDelete || isFetching} />
      </Grid>
    </Grid>
  )
}

export default Students
