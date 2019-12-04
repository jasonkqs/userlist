import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";

import { redirectToHome } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const CancelButton = props => {
  const { classes } = props;

  const onClickCancelHandler = () => {
    props.redirectToHome();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        size="medium"
        onClick={onClickCancelHandler}
      >
        <CancelIcon className={classes.leftIcon} />
        Cancel
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    redirectToHome: () => {
      dispatch(redirectToHome());
    }
  };
};

export default withRouter(
  withStyles(styles)(
    connect(
      null,
      mapDispatchToProps
    )(CancelButton)
  )
);
