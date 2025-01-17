import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Theme } from '@material-ui/core/styles'
import { Box, useTheme, List, ListItem, ListItemIcon, Drawer, ListItemText, Tooltip } from '@material-ui/core'
import {
  ExitToApp
} from '@material-ui/icons'
import history from '../../services/history'
import { useDispatch } from 'react-redux'
import { signOut } from '../../store/modules/auth/actions'
import * as TIIcons from 'react-icons/ti'
import * as AIIcons from 'react-icons/ai'
import * as GIIcons from 'react-icons/gi'
import * as FAIcons from 'react-icons/fa'

const Nav: React.FC = () => {
  const dispatch = useDispatch()

  const theme = useTheme()

  const CustomTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      fontSize: theme.typography.pxToRem(15)

    }
  }))(Tooltip)

  const routes = [
    { path: '/home', label: 'Início', icon () { return <AIIcons.AiFillHome style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } },
    { path: '/schedule', label: 'Consultas', icon () { return <TIIcons.TiCalendar style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } },
    { path: '/insurances', label: 'Convênios', icon () { return <GIIcons.GiHealthNormal style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } },
    { path: '/doctors', label: 'Doutores', icon () { return <FAIcons.FaUserMd style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } },
    { path: '/patients', label: 'Pacientes', icon () { return <FAIcons.FaUsers style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } }
  ]

  function handleLogout () {
    dispatch(signOut())
  }

  return <Box width="8rem" position="fixed" margin="6rem 2rem 0 0" height="calc(100vh - 6rem)"
    borderRadius="0 20rem 0 0"
    boxShadow="0px 0px 20px rgba(0,0,0,0.1)"
    bgcolor={theme.palette.type === 'dark' ? theme.palette.background.paper
      : theme.palette.primary.main}>
    <Box display="flex" flexDirection="column" padding="1rem 0" justifyContent="space-between" alignItems="center" height="100%">

      <Box justifySelf="center" marginTop="6rem" alignSelf="center" style={{ width: '100%' }} >
        <List component="ul">
          {routes.map(route => (
            <CustomTooltip title={route.label}
              placement="right-start"
              key={route.path} aria-label={route.label}>
              <ListItem
                disableGutters

                button
                component="li"
                onClick={() => history.push(route.path)}
                style={{
                  // padding: '1rem 0',
                  margin: '2rem 0',
                  width: '100% !important',
                  alignSelf: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                <ListItemIcon style={{ display: 'flex', flex: 1, justifyContent: 'center', margin: 0, padding: '0 1rem' }}>
                  {route.icon()}
                </ListItemIcon>
                <div className="grow-animate" style={{
                  width: '.3rem',
                  height: '2rem',
                  borderRadius: '.3rem',
                  marginRight: '.3rem',
                  backgroundColor: history.location.pathname === route.path ? `${theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default}` : 'transparent'
                }}></div>
                {/* <ListItemText style={{
                color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default,
                fontWeight: 'bold'
              }}>{route.label}</ListItemText> */}
              </ListItem>
            </CustomTooltip>
          ))}
        </List>
      </Box>
      <Box justifySelf="center" alignSelf="center" style={{ width: '100%' }}>
        <List component="ul">
          <ListItem component="li" onClick={handleLogout} button style={{ margin: '1.5rem 0 0 0' }}>
            <ListItemIcon style={{ display: 'flex', width: '100%', justifyContent: 'center', margin: 0, padding: 0 }}>
              <ExitToApp style={{ fontSize: '1.75rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Box>
  </Box>
}

type NavResponsiveProps = {
  isOpen: boolean;
  handleClose: () => void;
}

export const NavResponsive: React.FC<NavResponsiveProps> = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch()

  const theme = useTheme()

  const CustomTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      fontSize: theme.typography.pxToRem(15)

    }
  }))(Tooltip)

  const routes = [
    { path: '/home', label: 'Início', icon () { return <AIIcons.AiFillHome style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } },
    { path: '/schedule', label: 'Consultas', icon () { return <TIIcons.TiCalendar style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } },
    { path: '/insurances', label: 'Convênios', icon () { return <GIIcons.GiHealthNormal style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } },
    { path: '/doctors', label: 'Doutores', icon () { return <FAIcons.FaUserMd style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } },
    { path: '/patients', label: 'Pacientes', icon () { return <FAIcons.FaUsers style={{ fontSize: '1.50rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} /> } }
  ]

  function handleLogout () {
    dispatch(signOut())
  }

  return <Drawer anchor="left" PaperProps={{
    style: {
      backgroundColor: 'transparent',
      boxShadow: 'none'

    }
  }} open={isOpen} onClose={handleClose}>

    <Box width="10rem" margin="2rem 0 2rem 0" height="calc(100vh - 6rem)"
      borderRadius="0 20rem 20rem 0"
      boxShadow="0px 0px 20px rgba(0,0,0,0.1)"
      bgcolor={theme.palette.type === 'dark' ? theme.palette.background.paper
        : theme.palette.primary.main}>
      <Box display="flex" flexDirection="column" padding="1rem 0" justifyContent="space-between" alignItems="center" height="100%">

        <Box justifySelf="center" marginTop="6rem" alignSelf="center" style={{ width: '100%' }} >
          <List component="ul">
            {routes.map(route => (
              <CustomTooltip title={route.label}
                placement="right-start"
                key={route.path} aria-label={route.label}>
                <ListItem
                  disableGutters

                  button
                  component="li"
                  onClick={() => history.push(route.path)}
                  style={{
                    // padding: '1rem 0',
                    margin: '2rem 0',
                    width: '100% !important',
                    alignSelf: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                  <ListItemIcon style={{ display: 'flex', flex: 1, justifyContent: 'center', margin: 0, padding: '0 1rem' }}>
                    {route.icon()}
                  </ListItemIcon>

                  <ListItemText style={{
                    color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default,
                    fontWeight: 'bold'
                  }}>{route.label}</ListItemText>
                  <div className="grow-animate" style={{
                    width: '.3rem',
                    height: '2rem',
                    borderRadius: '.3rem',
                    marginRight: '.3rem',
                    backgroundColor: history.location.pathname === route.path ? `${theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default}` : 'transparent'
                  }}></div>
                </ListItem>
              </CustomTooltip>
            ))}
          </List>
        </Box>
        <Box justifySelf="center" alignSelf="center" margin="2rem 0" style={{ width: '100%' }}>
          <List component="ul">
            <ListItem component="li" onClick={handleLogout} button style={{ margin: '1.5rem 0 0 0' }}>
              <ListItemIcon style={{ display: 'flex', width: '100%', justifyContent: 'center', margin: 0, padding: 0 }}>
                <ExitToApp style={{ fontSize: '1.75rem', color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.default }} />
              </ListItemIcon>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  </Drawer>
}

NavResponsive.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}
export default Nav
