import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import i18next, { t } from "i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";
import Translate from "./component/Translate";
const drawerWidth = 240;

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (val) => {
    i18next.changeLanguage(val);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {t('common.benefitManagement')}
          </Typography>
        </Toolbar>
        <Box
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mr="10px"
          ml="auto"
          pr="20px"
        >
          <LanguageIcon />
        </Box>
        <Box display="flex" alignItems="center" pr="20px">
          <Button sx={{ color: "#fff" }}>{t('common.logout')}</Button>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleChangeLanguage("en")}>
            English
          </MenuItem>
          <MenuItem onClick={() => handleChangeLanguage("vi")}>
            VietNam
          </MenuItem>
        </Menu>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[t('common.dashboard'), t('common.vendor'), t('common.customer'),t('common.program'), t('common.product')].map(
              (text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} sx={{ paddingLeft: "10px" }} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {[t('common.user'), t('common.role'), t('common.system'), t('common.masterData')].map(
              (text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} sx={{ paddingLeft: "10px" }} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography component='h1' fontSize={20} fontWeight={700}>{t('common.titleDashboard')}</Typography>
        <Typography component='h1' fontSize={15} fontWeight={500}>{t('common.Welcome')}</Typography>
        <Translate/>
      </Box>
    </Box>
  );
}

export default App;
