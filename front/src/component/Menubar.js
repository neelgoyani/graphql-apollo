import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

const Menubar = () => {
  const [{ user }, dispatch] = useStateValue();
  const pathname = window.location.pathname;
  let path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      {!user ? (
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />

            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>
      ) : (
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name={user}
            active
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={handleLogout} />
          </Menu.Menu>
        </Menu>
      )}
    </>
  );
};

export default Menubar;
