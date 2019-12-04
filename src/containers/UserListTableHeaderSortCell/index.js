import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Typography from "@material-ui/core/Typography";

import { sortUsers } from "../../actions";

const UserListTableCell = withStyles(theme => ({
  head: {
    fontSize: theme.spacing.unit * 3,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    textAlign: "left"
  }
}))(TableCell);

const styles = theme => ({
  firstName: {
    minWidth: theme.spacing.unit * 15
  },
  lastName: {
    minWidth: theme.spacing.unit * 15
  },
  totalButton: {
    display: "flex",
    flexWrap: "wrap",
    float: "left"
  },
  clickable: {
    cursor: "pointer"
  }
});

const UserListTableHeaderSortCell = props => {
  const onClickSortUsersHandler = sortedBy => {
    props.sortUsers(sortedBy);
  };
  const { classes, header, value, sort } = props;

  const { sortedBy, sortedAscendingly } = sort;

  return (
    <UserListTableCell className={classNames(classes.root, classes[header])}>
      <div className={classes.totalButton}>
        {sortedBy === header &&
          ((sortedAscendingly && <KeyboardArrowUpIcon />) || (
            <KeyboardArrowDownIcon />
          ))}
        <Typography
          variant="inherit"
          color="inherit"
          className={classes.clickable}
          onClick={() => onClickSortUsersHandler(header)}
        >
          {value}
        </Typography>
      </div>
    </UserListTableCell>
  );
};

UserListTableHeaderSortCell.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    sort: state.sort
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sortUsers: sortedBy => {
      dispatch(sortUsers(sortedBy));
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserListTableHeaderSortCell)
);
