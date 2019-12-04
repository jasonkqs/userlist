import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";

import { lastPage } from "../../../actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const LastPageButton = props => {
  const { classes, data } = props;

  const onClickLastPageHandler = () => {
    props.lastPage();
  };

  return (
    <IconButton
      className={classes.button}
      aria-label="LastPage"
      onClick={onClickLastPageHandler}
      disabled={data.curPage >= data.maxPage}
    >
      <LastPageIcon />
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
    lastPage: () => {
      dispatch(lastPage());
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LastPageButton)
);
