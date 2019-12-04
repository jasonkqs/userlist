import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import UserListTableHeaderSortCell from "../UserListTableHeaderSortCell";
import EditUserButton from "../Buttons/EditUserButton";
import DeleteUserButton from "../Buttons/DeleteUserButton";

const UserListTableCell = withStyles(theme => ({
  head: {
    fontSize: theme.spacing.unit * 3,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    textAlign: "left"
  },
  body: {
    fontSize: theme.spacing.unit * 2,
    textAlign: "left"
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const UserListTable = props => {
  const { classes, data, sort } = props;

  const { isSorted, sortedBy, sortedAscendingly } = sort;

  const usersAfterSort = data.usersAfterFilter.slice(0);
  if (isSorted) {
    usersAfterSort.sort((user1, user2) => {
      if (user1[sortedBy] < user2[sortedBy]) {
        return sortedAscendingly ? -1 : 1;
      } else if (user1[sortedBy] > user2[sortedBy]) {
        return sortedAscendingly ? 1 : -1;
      } else {
        if (user1.firstName < user2.firstName) {
          return sortedAscendingly ? -1 : 1;
        } else if (user1.firstName > user2.firstName) {
          return sortedAscendingly ? 1 : -1;
        } else {
          if (user1.lastName < user2.lastName) {
            return sortedAscendingly ? -1 : 1;
          } else if (user1.lastName > user2.lastName) {
            return sortedAscendingly ? 1 : -1;
          } else {
            if (user1.sex < user2.sex) {
              return sortedAscendingly ? -1 : 1;
            } else if (user1.sex > user2.sex) {
              return sortedAscendingly ? 1 : -1;
            } else {
              if (user1.age - user2.age < 0) {
                return sortedAscendingly ? -1 : 1;
              }
              return sortedAscendingly ? 1 : -1;
            }
          }
        }
      }
    });
  }

  const usersToShow = usersAfterSort.slice(
    (data.curPage - 1) * data.usersPerPage,
    data.curPage * data.usersPerPage
  );

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <UserListTableCell>Edit</UserListTableCell>
            <UserListTableCell>Delete</UserListTableCell>
            <UserListTableHeaderSortCell
              header="firstName"
              value="First Name"
            />
            <UserListTableHeaderSortCell header="lastName" value="Last Name" />
            <UserListTableHeaderSortCell header="sex" value="Sex" />
            <UserListTableHeaderSortCell header="age" value="Age" />
          </TableRow>
        </TableHead>
        <TableBody>
          {usersToShow.map(user => (
            <TableRow className={classes.row} key={user._id}>
              <UserListTableCell>
                <EditUserButton _id={user._id} />
              </UserListTableCell>
              <UserListTableCell>
                <DeleteUserButton _id={user._id} />
              </UserListTableCell>
              <UserListTableCell>{user.firstName}</UserListTableCell>
              <UserListTableCell>{user.lastName}</UserListTableCell>
              <UserListTableCell>{user.sex}</UserListTableCell>
              <UserListTableCell>{user.age}</UserListTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data,
    sort: state.sort
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps
  )(UserListTable)
);
