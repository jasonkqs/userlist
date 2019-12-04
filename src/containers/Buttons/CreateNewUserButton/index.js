import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { redirectToCreateUser } from "../../../actions";

const styles = theme => ({
  button: {
    minWidth: theme.spacing.unit * 24,
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const CreateNewUserButton = props => {
  const { classes } = props;

  const onClickCreateUserHandler = () => {
    props.redirectToCreateUser();
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="medium"
        onClick={onClickCreateUserHandler}
      >
        <AccountBoxIcon className={classes.leftIcon} />
        Create New User
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    redirectToCreateUser: () => {
      dispatch(redirectToCreateUser());
    }
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(CreateNewUserButton)
);
