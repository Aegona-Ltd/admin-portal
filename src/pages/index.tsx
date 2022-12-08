// ** React Imports
import { MouseEvent, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Formik & Yup Imports
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'

// **  Components & helpers Imports
import { FormTextField } from 'src/@core/components/FormTextField'
import { displayToast } from 'src/utils/helpers/utility'
import { saveToken } from 'src/utils/helpers/localStorage'

// ** Icons Imports
import Facebook from 'mdi-material-ui/Facebook'
import Google from 'mdi-material-ui/Google'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BackDrop from 'src/@core/components/back-drop'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Services Import
import { useLoginMutation } from 'src/services/auth'

interface FormValues {
  userName: string
  password: string
}

const validationSchema = yup.object().shape({
  userName: yup.string().email('Vui lòng nhập vào email đúng định dạng').required('Vui lòng không bỏ trống'),
  password: yup.string().required('Vui lòng không bỏ trống')
})

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  const [postLogin, { isLoading }] = useLoginMutation()
  const router = useRouter()

  const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    formikHelpers.setSubmitting(false)
    try {
      const res = await postLogin(values).unwrap()
      console.log(res)

      if (res.success) {
        saveToken(res?.data?.token)
        displayToast('success', 'Đăng nhập thành công!')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
    } catch (e) {
      console.log(e)

      displayToast('error', e.data.ErrorMessage)
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName} 👋🏻
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Chào mừng bạn đến với {themeConfig.templateName}!
            </Typography>
            <Typography variant='body2'>Vui lòng đăng nhập để truy cập vào hệ thống </Typography>
          </Box>
          <Formik
            initialValues={{
              userName: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form noValidate autoComplete='off'>
              <Field
                required
                fullWidth
                autoFocus
                size='medium'
                id='userName'
                name='userName'
                label='Email'
                component={FormTextField}
              />
              <Field
                required
                label='Mật khẩu'
                id='password'
                name='password'
                type='password'
                size='medium'
                sx={{ minHeight: '80px' }}
                component={FormTextField}
              />

              <Box
                sx={{
                  mb: 4,
                  mt: 0,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end'
                }}
              >
                <Link passHref href='/forgot-password'>
                  <LinkStyled>Quên mật khẩu?</LinkStyled>
                </Link>
              </Box>
              <Button type='submit' fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }}>
                Đăng nhập
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  Bạn chưa có tài khoản?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/register'>
                    <LinkStyled>Đăng ký ngay!</LinkStyled>
                  </Link>
                </Typography>
              </Box>
              <Divider sx={{ my: 5 }}>Hoặc đăng nhập với</Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link href='/' passHref>
                  <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                    <Facebook sx={{ color: '#497ce2' }} />
                  </IconButton>
                </Link>

                <Link href='/' passHref>
                  <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                    <Google sx={{ color: '#db4437' }} />
                  </IconButton>
                </Link>
              </Box>
            </Form>
          </Formik>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
      <BackDrop isOpen={isLoading} />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
