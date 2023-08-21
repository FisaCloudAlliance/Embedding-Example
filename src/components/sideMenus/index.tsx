import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { sideNavigations } from "../../appRoute";
const RootGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  width: "100%",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
type Props = {};

const SideMenu: React.FCX<Props> = (props) => {
  const theme = useTheme();
  return (
    <List
      sx={{
        padding: theme.spacing(1),
        width: "100%",
      }}
    >
      {sideNavigations.map((x, i) => {
        return <Menu text={x.title} to={x.to} key={`menu-${i}`} />;
      })}
    </List>
  );
};

type MenuProps = {
  text: string;
  to: string;
  //   icon: JSX.Element;
};
const StyledLink = styled(Link)(({ theme }) => ({
  width: "100%",
  textDecoration: "none",
  color: "gray",
}));
const Menu: React.FCX<MenuProps> = (props) => {
  const { text, to } = props;
  return (
    <StyledLink to={to}>
      <ListItem key={text} disablePadding>
        <ListItemButton>
          {/* <ListItemIcon>{icon}</ListItemIcon> */}
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </StyledLink>
  );
};

export default SideMenu;
