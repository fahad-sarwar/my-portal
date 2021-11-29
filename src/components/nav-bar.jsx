import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/client";
import Image from "next/image";
import NotificationsPopover from "./NotificationsPopover";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const menuId = "account-menu";

const NavBar = () => {
  const [anchorElement, setAnchorElement] = useState();
  const [showDrawer, setShowDrawer] = useState(false);

  const [session, loading] = useSession();
  const { push } = useRouter();

  const handleAccountMenuOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorElement(null);
  };

  const renderAccountDropdown = (
    <Menu
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElement)}
      onClose={handleAccountMenuClose}
    >
      <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
    </Menu>
  );

  const rightSideMenu = session ? (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 5, sm: 5, m: 5 }}
      >
        <Button
          key="home"
          onClick={() => push(`/`)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Home
        </Button>
        <Button
          key="bills"
          onClick={() => push(`/bills`)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Bills
        </Button>
        <Button
          key="orders"
          onClick={() => push(`/orders`)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Orders
        </Button>
        <Button
          key="services"
          onClick={() => push(`/services`)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Services
        </Button>
        <Button
          key="help"
          onClick={() => push(`/help`)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Help
        </Button>
        {/* <NotificationsPopover /> */}
        <Avatar
          sx={{ ":hover": { cursor: "pointer" } }}
          alt={session?.user?.name.charAt(0).toUpperCase()}
          src="/images/avatars/avatar_1.jpg"
          onClick={handleAccountMenuOpen}
        >
          {session?.user?.name.charAt(0).toUpperCase()}
        </Avatar>
      </Stack>
    </>
  ) : (
    <>
      <Button variant="outline" onClick={() => signIn("openid-connect")}>
        Sign In
      </Button>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Image
            src="/images/zen-logo.png"
            alt="Zen Internet"
            width={64}
            height={64}
          />
          {/* <IconButton
            onClick={() => setShowDrawer(!showDrawer)}
            edge="start"
            sx={{ mr: 2, ...(showDrawer && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ marginLeft: 1, flexGrow: 1 }}
          >
            Zen - My Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {rightSideMenu}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          onClick={() => setShowDrawer(false)}
          onKeyDown={() => setShowDrawer(false)}
        >
          <List>
            <ListItem button key={""} onClick={() => push(`/`)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key={"bills"} onClick={() => push(`/bills`)}>
              <ListItemText primary="Bills" />
            </ListItem>
            <ListItem button key={"orders"} onClick={() => push(`/orders`)}>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button key={"services"} onClick={() => push(`/services`)}>
              <ListItemText primary="Services" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {renderAccountDropdown}
    </Box>
  );
};

export default NavBar;
