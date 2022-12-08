// ** Icon imports
import AccountCircle from 'mdi-material-ui/AccountCircle'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// Find icons here: https://mui.com/material-ui/icons/
import CampaignIcon from '@mui/icons-material/Campaign'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const ROUTE = {
  SPEAKING: {
    READ_ALOUD: '/speaking/read-aloud',
    REPEAT_SENTENCE: '/speaking/repeat-sentence'
  },

  WRITING: {
    WRITE_ESSAY: '/writting/write-essay'
  }
}

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Trang chủ',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      sectionTitle: 'Quản lý'
    },
    {
      title: 'Tài khoản',
      icon: AccountCogOutline,
      path: '/users'
    },
    {
      title: 'Học viên',
      icon: AccountCircle,
      path: '/learners'
    },

    {
      sectionTitle: 'Skills'
    },
    {
      title: 'Speaking',
      icon: CampaignIcon,
      path: ROUTE.SPEAKING.READ_ALOUD,
      children: [
        {
          title: 'Read Aloud',
          icon: AccountCircle,
          path: '/read-aloud'
        },
        {
          title: 'Repeat Sentence',
          icon: CampaignIcon,
          path: '/repeat-sentence'
        }
      ]
    },
    {
      title: 'Writing',
      icon: CampaignIcon,
      path: ROUTE.SPEAKING.READ_ALOUD
    },
    {
      title: 'Repeat Sentence',
      icon: InterpreterModeIcon,
      path: ROUTE.SPEAKING.REPEAT_SENTENCE
    },
    {
      sectionTitle: 'Writing'
    },
    {
      title: 'Write Essay',
      icon: DriveFileRenameOutlineIcon,
      path: ROUTE.WRITING.WRITE_ESSAY
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },

    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
