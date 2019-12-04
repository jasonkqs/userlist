import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

import { saveChanges } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const SaveChangesButton = props => {
  const { classes, _id, firstName, lastName, sex, age, password } = props;
  const editedUser = {
    _id,
    firstName,
    lastName,
    sex,
    age,
    password
  };

  const onClickSaveChangesHandler = editedUser => {
    props.saveChanges(editedUser);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        size="medium"
        disabled={props.disabled}
        onClick={() => onClickSaveChangesHandler(editedUser)}
      >
        <SaveAltIcon className={classes.leftIcon} />
        Save Changes
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveChanges: editedUser => {
      dispatch(saveChanges(editedUser));
    }
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(SaveChangesButton)
);
