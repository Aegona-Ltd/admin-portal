// ** React Imports

// ** MUI Imports
// import Button from '@mui/material/Button'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'

interface CustomModalProps {
  title: string
  open: boolean
  handleClose: () => void
  children: JSX.Element[] | JSX.Element
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,
  borderRadius: 1
}

const CustomModal = (props: CustomModalProps) => {
  const { title, open, handleClose, children } = props

  return (
    <Modal
      open={open}
      className='custom-modal'
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'

      // onClose={handleClose} disable click outsite modal -> close modal
    >
      <Box sx={style}>
        <div className='custom-modal__header'>
          <p>{title}</p>
          <CloseIcon onClick={handleClose} className='close-icon' />
        </div>
        <div className='custom-modal__body'>{children}</div>
      </Box>
    </Modal>
  )
}

export default CustomModal
