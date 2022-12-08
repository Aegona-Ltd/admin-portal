// ** MUI Imports
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Button from '@mui/material/Button'

// ** Icons Imports

interface PageHeaderProps {
  titlePage: string
  handleOpen: () => void
}

const PageHeader = (props: PageHeaderProps) => {
  const { titlePage, handleOpen } = props

  // ** Hook

  return (
    <>
      <div className='page-header'>
        <p className='page-header__title'>{titlePage}</p>
        <Button onClick={handleOpen} size='medium' variant='contained'>
          <PersonAddIcon sx={{ mr: 1 }} /> Thêm mới
        </Button>
      </div>
    </>
  )
}

export default PageHeader
