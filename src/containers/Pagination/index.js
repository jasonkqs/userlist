import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import PrevPageButton from "../Buttons/PrevPageButton";
import NextPageButton from "../Buttons/NextPageButton";
import FirstPageButton from "../Buttons/FirstPageButton";
import LastPageButton from "../Buttons/LastPageButton";
import { setUsersPerPage } from "../../actions";

const styles = theme => ({
  root: {
    float: "left",
    margin: theme.spacing.unit,
    overflowX: "auto",
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    margin: theme.spacing.unit,
    width: theme.spacing.unit * 7
  },
  numberOfUsersShowed: {
    margin: "auto",
    marginLeft: theme.spacing.unit * 2
  },
  formControl: {
    margin: "auto",
    marginLeft: theme.spacing.unit * 2,
    width: theme.spacing.unit * 12
  },
  usersPerPageWordLabel: {
    marginLeft: theme.spacing.unit * 3
  }
});

const Pagination = props => {
  const { classes, data } = props;

  const { users, curPage, usersPerPage } = data;
  const onChangeUsersPerPageHandler = e => {
    props.setUsersPerPage(e.target.value);
  };

  return (
    <Paper className={classes.root}>
      <FirstPageButton />
      <PrevPageButton />

      <TextField
        id="outlined-page"
        label="Page"
        className={classes.textField}
        value={curPage}
        inputProps={{
          style: { textAlign: "center" }
        }}
        margin="normal"
        variant="outlined"
      />
      <Typography
        component="data"
        variant="body1"
        className={classes.numberOfUsersShowed}
      >
        {`${usersPerPage * (curPage - 1) + 1}-${Math.min(
          usersPerPage * curPage,
          users.length
        )} of ${users.length}`}
      </Typography>
      <FormControl className={classes.formControl}>
        <div>
          <InputLabel
            htmlFor="usersPerPage-simple"
            className={classes.usersPerPageWordLabel}
          >
            per page
          </InputLabel>
        </div>
        <Select
          value={usersPerPage}
          onChange={onChangeUsersPerPageHandler}
          inputProps={{
            name: "usersPerPage",
            id: "usersPerPage-simple"
          }}
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
        </Select>
      </FormControl>
      <NextPageButton />
      <LastPageButton />
    </Paper>
  );
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsersPerPage: usersPerPage => {
      dispatch(setUsersPerPage(usersPerPage));
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Pagination)
);
