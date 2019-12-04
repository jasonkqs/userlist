import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import { prevPage } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const PrevPageButton = props => {
  const { classes, data } = props;

  const onClickPrevPageHandler = () => {
    props.prevPage();
  };

  return (
    <IconButton
      className={classes.button}
      aria-label="PrevPage"
      onClick={onClickPrevPageHandler}
      disabled={data.curPage <= 1}
    >
      <KeyboardArrowLeftIcon />
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
    prevPage: () => {
      dispatch(prevPage());
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrevPageButton)
);
