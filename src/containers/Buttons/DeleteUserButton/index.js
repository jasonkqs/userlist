import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteUser } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const DeleteUserButton = props => {
  const { classes, _id } = props;

  const onClickDeleteUserHandler = _id => {
    props.deleteUser(_id);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => onClickDeleteUserHandler(_id)}
      >
        Delete
        <DeleteIcon className={classes.rightIcon} />
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: _id => {
      dispatch(deleteUser(_id));
    }
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(DeleteUserButton)
);
