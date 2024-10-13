import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Menu, MenuItem } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Badge } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function NavBar(props) {
  useEffect(() => {});

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const pages =
    user === null
      ? ["Menu", "Contact Us", "Register", "Sign-In"]
      : ["Menu", "Contact Us"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSignInOutClick() {
    setAnchorEl(null);

    if (user !== null) {
      props.persist(); // Saves cart to database before logging out.
      localStorage.removeItem("user");
      props.clear(); // Clears cart contents after log out.
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  }

  function handleAddMenuClick() {
    setAnchorEl(null);

    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);

    navigate("/add", { state: user });
  }

  function handleHistoryMenuClick() {
    setAnchorEl(null);

    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);

    navigate("/history");
  }

  function handleChangePwClick() {
    setAnchorEl(null);

    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);

    navigate("/change", { state: user });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ marginRight: 3, display: { xs: "none", md: "flex" } }}
                >
                  Burger Bonanza!
                </Typography>
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="menu-button"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ pl: 0 }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  disableScrollLock={true}
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link
                        key={page}
                        to={
                          page === "Menu"
                            ? "menu"
                            : page === "Contact Us"
                            ? "contact"
                            : page === "Order"
                            ? "order"
                            : page === "Register"
                            ? "register"
                            : page === "Sign-In"
                            ? "sign-in"
                            : null
                        }
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  mr: 2,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Burger Bonanza!
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Link
                    key={page}
                    to={
                      page === "Menu"
                        ? "menu"
                        : page === "Contact Us"
                        ? "contact"
                        : page === "Order"
                        ? "order"
                        : page === "Register"
                        ? "register"
                        : page === "Sign-In"
                        ? "sign-in"
                        : null
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      key={page}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
              </Box>
              <div>
                <Link to="cart">
                  <IconButton>
                    <Badge badgeContent={props.quantity} color="primary">
                      <ShoppingCart style={{ color: "white" }} />
                    </Badge>
                  </IconButton>
                </Link>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ pr: 0 }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  disableScrollLock={true}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {user !== null && user.username === "admin" ? (
                    <div>
                      <p className="greeting">{user.username}</p>
                      <hr />
                      <MenuItem onClick={handleAddMenuClick}>
                        {user !== null ? "Add Menu Item" : null}
                      </MenuItem>
                      <MenuItem onClick={handleHistoryMenuClick}>
                        {user !== null ? "Order History" : null}
                      </MenuItem>
                      <MenuItem onClick={handleChangePwClick}>
                        {user !== null ? "Change Password" : null}
                      </MenuItem>
                    </div>
                  ) : user !== null && user.username !== "admin" ? (
                    <div>
                      <p className="greeting">{user.username}</p>
                      <hr />
                      <MenuItem onClick={handleHistoryMenuClick}>
                        {user !== null ? "Order History" : null}
                      </MenuItem>
                      <MenuItem onClick={handleChangePwClick}>
                        {user !== null ? "Change Password" : null}
                      </MenuItem>
                    </div>
                  ) : null}

                  <MenuItem onClick={handleSignInOutClick}>
                    {user !== null ? "Sign-out" : "Sign-in"}
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
export default NavBar;
