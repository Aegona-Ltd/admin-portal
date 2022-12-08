// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <div className='footer'>
      <Typography sx={{ mr: 2 }}>
        <span>PTE Mates </span>
        {`© ${new Date().getFullYear()}`}
        <span className='ml-2'>❤️ Made by Aegona</span>
      </Typography>

      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link target='_blank' href='https://aegona.com'>
            License
          </Link>

          <Link target='_blank' href='https://aegona.com/contact-us'>
            Support
          </Link>
        </Box>
      )}
    </div>
  )
}

export default FooterContent
