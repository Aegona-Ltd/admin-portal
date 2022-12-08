// ** React Imports
import { ElementType, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { NavLink } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'

// ** Utils
import { handleURLQueries } from 'src/@core/layouts/utils'

import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

interface Props {
  item: NavLink
  settings: Settings
  navVisible?: boolean
  toggleNavVisibility: () => void
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',
  '&.active, &.active:hover': {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
  },
  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }: Props) => {
  // ** Hooks
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const IconTag: ReactNode = item.icon

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  const isSubNavLinkActive = (nav: any) => {
    if (router.pathname === nav.path) {
      return true
    } else {
      return false
    }
  }
  useEffect(() => {
    item.children?.map(nav => {
      if (nav.path === router.pathname) {
        setOpen(true)
      }
    })
  }, [item.children, router.pathname])

  return (
    <ListItem
      disablePadding
      className='nav-link'
      disabled={item.disabled || false}
      sx={{ mt: 1.5, px: '0 !important' }}
    >
      {item?.children?.length > 0 ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            width: '230px'
          }}
          onClick={() => setOpen(!open)}
        >
          <Card sx={{ minWidth: 190, border: 'none', backgroundColor: 'unset', boxShadow: 'none' }}>
            <CardHeader
              title={item.title}
              avatar={
                <ListItemIcon
                  sx={{
                    mr: 2.5,
                    ml: 5.5,
                    color: 'text.primary',
                    transition: 'margin .25s ease-in-out'
                  }}
                >
                  <UserIcon icon={IconTag} />
                </ListItemIcon>
              }
              sx={{
                p: 0
              }}
              action={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            ></CardHeader>
            <Collapse in={open} sx={{ marginTop: '8px' }}>
              <CardContent sx={{ p: 0, paddingBottom: 0, fontSize: '14px' }}>
                {item.children?.map((item, index) => (
                  <Link key={index} passHref href={item.path === undefined ? '/' : `${item.path}`}>
                    <MenuNavLink
                      component={'a'}
                      className={isSubNavLinkActive(item) ? 'active' : ''}
                      {...(item.openInNewTab ? { target: '_blank' } : null)}
                      onClick={e => {
                        if (item.path === undefined) {
                          e.preventDefault()
                          e.stopPropagation()
                        }
                        if (navVisible) {
                          toggleNavVisibility()
                        }
                      }}
                      sx={{
                        pl: 3,
                        ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          mr: 2.5,
                          color: 'text.primary',
                          transition: 'margin .25s ease-in-out'
                        }}
                      >
                        <UserIcon icon={item.icon} />
                      </ListItemIcon>

                      <MenuItemTextMetaWrapper>
                        <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
                        {item.badgeContent ? (
                          <Chip
                            label={item.badgeContent}
                            color={item.badgeColor || 'primary'}
                            sx={{
                              height: 20,
                              fontWeight: 500,
                              marginLeft: 1.25,
                              '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                            }}
                          />
                        ) : null}
                      </MenuItemTextMetaWrapper>
                    </MenuNavLink>
                  </Link>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ) : (
        <Link passHref href={item.path === undefined ? '/' : `${item.path}`}>
          <MenuNavLink
            component={'a'}
            className={isNavLinkActive() ? 'active' : ''}
            {...(item.openInNewTab ? { target: '_blank' } : null)}
            onClick={e => {
              if (item.path === undefined) {
                e.preventDefault()
                e.stopPropagation()
              }
              if (navVisible) {
                toggleNavVisibility()
              }
            }}
            sx={{
              pl: 5.5,
              ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
            }}
          >
            <ListItemIcon
              sx={{
                mr: 2.5,
                color: 'text.primary',
                transition: 'margin .25s ease-in-out'
              }}
            >
              <UserIcon icon={IconTag} />
            </ListItemIcon>

            <MenuItemTextMetaWrapper>
              <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
              {item.badgeContent ? (
                <Chip
                  label={item.badgeContent}
                  color={item.badgeColor || 'primary'}
                  sx={{
                    height: 20,
                    fontWeight: 500,
                    marginLeft: 1.25,
                    '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                  }}
                />
              ) : null}
            </MenuItemTextMetaWrapper>
          </MenuNavLink>
        </Link>
      )}
    </ListItem>
  )
}

export default VerticalNavLink
