import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

import { getUser } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const EditUserButton = props => {
  const { classes, _id } = props;

  const onClickEditUserHandler = () => {
    props.getUser(_id);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="default"
        size="small"
        onClick={onClickEditUserHandler}
      >
        Edit
        <EditIcon className={classes.rightIcon} />
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: _id => {
      dispatch(getUser(_id));
    }
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(EditUserButton)
);
