import React, { useState, useEffect } from 'react';
import { AppBar, IconButton } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { useScrollTrigger } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom"
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';


import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: "1.25em"
    }
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down('xs')]: {
      height: "5.5em"
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '50px',
    height: "45px",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px"
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIcon: {

  },

  drawerIconContainer: {
    marginLeft: 'auto',
    "&:hover": {
      backgroundColor: 'transparent'
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelectedStyle: {
    opacity: 1
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1
  }


}))



export default function Header(props) {
  const classes = useStyles()
  const theme = useTheme()
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"))

  const [openDrawer, setOpenDrawer] = useState(false)
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null)
    setOpenMenu(false)
    setSelectedIndex(i)

  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const menuOptions = [
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    { name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex: 1 },
    { name: "Mobile App Development", link: "/mobileapps", activeIndex: 1, selectedIndex: 2 },
    { name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3 },
  ]

  const routes = [{ name: "Home", link: "/", activeIndex: 0 },
  { name: "Services", link: "/services", activeIndex: 1, ariaOwns: anchorEl ? "simple-menu" : undefined, ariaPopup: anchorEl ? "true" : undefined, mouseOver: event => handleClick(event) },
  { name: "The Revolution", link: "/revolution", activeIndex: 2 },
  { name: "About Us", link: "/about", activeIndex: 3 },
  { name: "Contact Us", link: "/contact", activeIndex: 4 }]

  useEffect(() => {
    [...menuOptions, ...routes].forEach(route => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex)
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex)
            }
          }
          break;
        default:
          break;
      }
    })
  }, [value, menuOptions, selectedIndex, routes])


  const tabs = (
    <>

      <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
        {routes.map((route, index) => (
          <Tab key={`${route}${index}`} className={classes.tab} component={Link} to={route.link} label={route.name} aria-owns={route.ariaOwns} aria-haspopup={route.ariaPopup} onMouseOver={route.mouseOver} />
        ))}
      </Tabs>
      <Button variant='contained' color='secondary' className={classes.button}>
        Free Estimate
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} Menu={Menu} open={openMenu} onClose={handleClose} classes={{ paper: classes.menu }} style={{ zIndex: 1302 }} MenuListProps={{ onMouseLeave: handleClose }} elevation={0} keepMounted>
        {
          menuOptions.map((option, i) => (
            <MenuItem key={option.name} component={Link} to={option.link} classes={{ root: classes.menuItem }} onClick={(event) => { handleMenuItemClick(event, i); setValue(1); handleClose() }} selected={i === selectedIndex && value === 1}>
              {option.name}
            </MenuItem>
          ))
        }
      </Menu>
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer classes={{ paper: classes.drawer }} disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}>
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map(route => (
            <ListItem key={`${route}${route.activeIndex}`} onClick={() => { setOpenDrawer(false); setValue(route.activeIndex) }} divider button component={Link} to={route.link} selected={value === route.activeIndex}>
              <ListItemText className={value === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelectedStyle] : classes.drawerItem} disableTypography>{route.name}</ListItemText>
            </ListItem>
          ))}

          <ListItem className={classes.drawerItemEstimate} onClick={() => { setOpenDrawer(false); setValue(5) }} divider button component={Link} selected={value === 5} to="/estimate">
            <ListItemText className={value === 5 ? [classes.drawerItem, classes.drawerItemSelectedStyle] : classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple className={classes.drawerIconContainer}>
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>

    </>
  )

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed' className={classes.appBar}>

          <Toolbar disableGutters>
            <Button component={Link} to="/" className={classes.logoContainer} disableRipple onClick={() => setValue(0)}>
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            {
              matches ? drawer : tabs
            }
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )

}
