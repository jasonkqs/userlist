import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { setFilter } from "../../actions";

const styles = theme => ({
  textField: {
    float: "right",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const SearchField = props => {
  const onChangeSearchFieldHandler = e => {
    props.setFilter(e.target.value);
  };
  const { classes } = props;

  return (
    <TextField
      id="outlined-search"
      label="Search"
      type="search"
      className={classes.textField}
      margin="normal"
      variant="outlined"
      onChange={onChangeSearchFieldHandler}
      autoFocus
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: filter => {
      dispatch(setFilter(filter));
    }
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(SearchField)
);
