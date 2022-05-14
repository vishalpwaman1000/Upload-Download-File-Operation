import React from 'react'
import './UserDashBoard.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

export default function UserDashBoard() {
  
  return (
    <div className="UserDashBoard-Container">
      <div className="Sub-Container">
        <div className="Header">
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton
                edge="start"
                className=""
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                User DashBoard
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div className="Body">
          
        </div>
      </div>
    </div>
  )
}
