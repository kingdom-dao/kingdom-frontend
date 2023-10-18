import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { APP_NAME, LINKS } from '@/config/constants'

const COLORS = {
  BACKGROUND: '#2e2930',
  FONT: '#ffffff',
  ICON: '#cacbcd',
}

const pages = [
  {
    name: 'Home',
    href: '/',
  },
]

const Header: React.FC = () => {
  const handleGoToExternalLink = (href: string) => {
    window.open(href, '_blank')
  }

  const [drawer, setDrawer] = useState<boolean>(false)

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          backgroundColor: '#222222',
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => toggleDrawer()}
            sx={{ mr: 2, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ mr: 2 }}>
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: 700, color: '#dfa132' }}
            >
              {APP_NAME.substring(0, 4)}
            </Typography>
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: 700, color: '#cacbcd' }}
            >
              {APP_NAME.substring(4, APP_NAME.length)}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.href}
                sx={{ my: 2, color: COLORS.FONT, display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
            <Button
              onClick={() => handleGoToExternalLink(LINKS.WHITEPAPER)}
              sx={{ my: 2, color: COLORS.FONT, display: 'block' }}
            >
              Whitepaper
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer}
        onClose={() => toggleDrawer()}
        PaperProps={{
          sx: {
            backgroundColor: COLORS.BACKGROUND,
          },
        }}
      >
        <Box sx={{ pt: 2, width: 250, overflow: 'auto' }}>
          <List
            subheader={
              <ListSubheader
                sx={{ backgroundColor: COLORS.BACKGROUND, color: COLORS.FONT }}
              >
                Menu
              </ListSubheader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton href="/mint-passport">
                <ListItemIcon sx={{ color: COLORS.ICON }}>
                  <AirplaneTicketIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Mint Passport"
                  sx={{ color: COLORS.FONT }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Header
