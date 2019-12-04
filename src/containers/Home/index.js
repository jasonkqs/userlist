import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

import SearchField from "../SearchField";
import Pagination from "../Pagination";
import UserListTable from "../UserListTable";
import CreateNewUserButton from "../Buttons/CreateNewUserButton";
import { getUsers } from "../../actions";

class Home extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        <Typography variant="h1" color="black">
          User List
        </Typography>
        <div style={{display: "flex"}}>
          <CreateNewUserButton />
          <SearchField />
        </div>
        <UserListTable />
        <Pagination />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
