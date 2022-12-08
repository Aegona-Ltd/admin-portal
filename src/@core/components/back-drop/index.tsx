// ** MUI Imports
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// import { styled } from '@mui/material/styles'

interface BackDropProps {
  isOpen: boolean
}

// const BackDropStyled = styled('div')(({ theme }) => ({
//   zIndex: 11,
//   position: 'fixed',
//   right: theme.spacing(6),
//   bottom: theme.spacing(10)
// }))

const BackDrop = (props: BackDropProps) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 999999999 }} open={props.isOpen}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default BackDrop
