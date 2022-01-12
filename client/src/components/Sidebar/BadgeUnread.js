import React from "react";
import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  badge: {
    backgroundColor: "#3F92FF",
    color: "white",
    marginRight: 20,
  },
}));

const UnreadBadge = (props) => {
  const classes = useStyles();
  const { unreadCount } = props;

  return (
    <Badge
    classes={{ badge: `${classes.badge}` }}
    overlap="circle"
    badgeContent={unreadCount}
    max={99}
    />
  );
};

export default UnreadBadge;
