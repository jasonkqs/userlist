import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import { nextPage } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const NextPageButton = props => {
  const { classes, data } = props;

  const onClickNextPageHandler = () => {
    props.nextPage();
  };

  return (
    <IconButton
      className={classes.button}
      aria-label="NextPage"
      onClick={onClickNextPageHandler}
      disabled={data.curPage >= data.maxPage}
    >
      <KeyboardArrowRightIcon />
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
    nextPage: () => {
      dispatch(nextPage());
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NextPageButton)
);
