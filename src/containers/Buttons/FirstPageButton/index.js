import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";

import { firstPage } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const FirstPageButton = props => {
  const { classes, data } = props;

  const onClickFirstPageHandler = () => {
    props.firstPage();
  };

  return (
    <IconButton
      className={classes.button}
      aria-label="FirstPage"
      onClick={onClickFirstPageHandler}
      disabled={data.curPage <= 1}
    >
      <FirstPageIcon />
    </IconButton>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    firstPage: () => {
      dispatch(firstPage());
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FirstPageButton)
);
