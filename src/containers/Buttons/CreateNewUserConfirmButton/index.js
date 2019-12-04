import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { addUser } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const CreateNewUserConfirmButton = props => {
  const { classes, firstName, lastName, sex, age, password } = props;
  const newUser = {
    firstName,
    lastName,
    sex,
    age,
    password
  };

  const onClickCreateUserConfirmHandler = newUser => {
    props.addUser(newUser);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        size="medium"
        disabled={props.disabled}
        onClick={() => onClickCreateUserConfirmHandler(newUser)}
      >
        <AccountBoxIcon className={classes.leftIcon} />
        Create User
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: newUser => {
      dispatch(addUser(newUser));
    }
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(CreateNewUserConfirmButton)
);
