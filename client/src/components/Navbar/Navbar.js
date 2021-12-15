import React, { Fragment, useContext } from 'react'
import { UIContext } from '../../App'
import useStyles from './styles'
import MiddleMenu from './MiddleMenu'
import RightMenu from './RightMenu'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import logoo from '../../logo.png'
// client/public/logo.png
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip, 
} from '@material-ui/core'
import {Menu as MenuIcon } from '@material-ui/icons'
import SearchFriends from '../Friends/SearchFriends'
function Navbar() {
  const { uiState, uiDispatch } = useContext(UIContext)
  const classes = useStyles()
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.between(960, 1400))
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Fragment>
      <AppBar
        color="default"
        className={classes.root}
        style={{
          backgroundColor: !uiState.darkMode ? '#76cfbb' : 'rgb(36,37,38)',
          color: !uiState.darkMode ? 'blue' : null,
          zIndex:"10000"
        }}
        elevation={1}
      
      >
        <Toolbar>
          <div className={classes.leftMenu}>
            {/* <FontAwesomeIcon
              icon={logoo}
              size={xsScreen ? 'xs' : '2x'}
              style={{
                width: '40px',
                height: '40px',
                color: !uiState.darkMode ? 'rgb(0,133,243)' : null,
                marginRight: '8px',
              }}
            /> */}

            <img src={logoo} alt=""
            size={xsScreen ? 'xs' : '2x'}
            style={{
              width: '70px',
              height: '60px',
              color: !uiState.darkMode ? 'rgb(0,133,243)' : null,
              marginRight: '8px',
            }}
            />
            
             <SearchFriends />

            
            
            {!uiState.mdScreen && uiState.navDrawerMenu && (
              <Tooltip
                title={
                  uiState.drawer
                    ? 'click to close drawer '
                    : ' click to open drawer'
                }
                arrow
              >
                <IconButton
                  onClick={() =>
                    uiDispatch({ type: 'SET_DRAWER', payload: !uiState.drawer })
                  }
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>

          {uiState.mdScreen && (
            <div className={classes.middleMenu}>
              <MiddleMenu />
            </div>
          )}
          <div className={classes.rightMenu}>
            <RightMenu />
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Navbar
