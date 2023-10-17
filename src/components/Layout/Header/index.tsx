import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { APP_NAME, LINKS } from '@/config/constants'

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

  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        sx={{ backgroundColor: '#222222' }}
      >
        <Toolbar>
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
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
            <Button
              onClick={() => handleGoToExternalLink(LINKS.WHITEPAPER)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Whitepaper
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
