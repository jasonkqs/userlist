import axios from "axios";
import history from "../history";
const apiUsersURL = "http://localhost:8081/api/users";

export const redirectToHome = () => {
  return dispatch => {
    history.push("/");
  };
};

export const redirectToCreateUser = () => {
  return dispatch => {
    history.push("/createUser");
  };
};

export const redirectToEditUser = () => {
  return dispatch => {
    history.push("/editUser");
  };
};

const requestGetUsersStart = () => {
  return {
    type: "REQUEST_GET_USERS_START"
  };
};

const requestGetUsersSuccess = users => {
  return {
    type: "REQUEST_GET_USERS_SUCCESS",
    users
  };
};

const requestGetUsersFail = error => {
  return {
    type: "REQUEST_GET_USERS_FAIL",
    error
  };
};

export const getUsers = () => {
  return dispatch => {
    dispatch(requestGetUsersStart());
    axios
      .get(apiUsersURL)
      .then(res => {
        dispatch(requestGetUsersSuccess(res.data));
      })
      .catch(err => {
        dispatch(requestGetUsersFail(err));
      });
  };
};

const requestGetUserStart = () => {
  return {
    type: "REQUEST_GET_USER_START"
  };
};

const requestGetUserSuccess = user => {
  return {
    type: "REQUEST_GET_USER_SUCCESS",
    user
  };
};

const requestGetUserFail = error => {
  return {
    type: "REQUEST_GET_USER_FAIL",
    error
  };
};

export const getUser = _id => {
  return dispatch => {
    dispatch(requestGetUserStart());
    axios
      .get(`${apiUsersURL}/${_id}`)
      .then(res => {
        dispatch(requestGetUserSuccess(res.data));
      })
      .then(() => {
        dispatch(redirectToEditUser());
      })
      .catch(err => {
        dispatch(requestGetUserFail(err));
      });
  };
};

const requestDeleteUserStart = () => {
  return {
    type: "REQUEST_DELETE_USER_START"
  };
};

const requestDeleteUserSuccess = () => {
  return {
    type: "REQUEST_DELETE_USER_SUCCESS"
  };
};

const requestDeleteUserFail = error => {
  return {
    type: "REQUEST_DELETE_USER_FAIL",
    error
  };
};

export const deleteUser = _id => {
  return dispatch => {
    dispatch(requestDeleteUserStart());
    axios
      .delete(`${apiUsersURL}/${_id}`)
      .then(() => {
        dispatch(requestDeleteUserSuccess());
      })
      .then(() => {
        dispatch(getUsers());
      })
      .catch(err => {
        dispatch(requestDeleteUserFail(err));
      });
  };
};

const requestAddUserStart = () => {
  return {
    type: "REQUEST_ADD_USER_START"
  };
};

const requestAddUserSuccess = () => {
  return {
    type: "REQUEST_ADD_USER_SUCCESS"
  };
};

const requestAddUserFail = error => {
  return {
    type: "REQUEST_ADD_USER_FAIL",
    error
  };
};

export const addUser = newUser => {
  return dispatch => {
    dispatch(requestAddUserStart());
    axios
      .post(`${apiUsersURL}`, newUser)
      .then(() => {
        dispatch(requestAddUserSuccess());
        dispatch(redirectToHome());
      })
      .catch(err => {
        dispatch(requestAddUserFail(err));
      });
  };
};

const requestSaveChangesStart = () => {
  return {
    type: "REQUEST_SAVE_CHANGES_START"
  };
};

const requestSaveChangesSuccess = () => {
  return {
    type: "REQUEST_SAVE_CHANGES_SUCCESS"
  };
};

const requestSaveChangesFail = error => {
  return {
    type: "REQUEST_SAVE_CHANGES_FAIL",
    error
  };
};

export const saveChanges = editedUser => {
  return dispatch => {
    dispatch(requestSaveChangesStart());
    axios
      .put(`${apiUsersURL}/${editedUser._id}`, editedUser)
      .then(() => {
        dispatch(requestSaveChangesSuccess());
      })
      .then(() => {
        dispatch(redirectToHome());
      })
      .catch(err => {
        dispatch(requestSaveChangesFail(err));
      });
  };
};

export const sortUsers = sortedBy => {
  return {
    type: "SORT_USERS",
    sortedBy
  };
};

export const setFilter = filter => {
  return {
    type: "SET_FILTER",
    filter
  };
};

export const prevPage = () => {
  return {
    type: "PREV_PAGE"
  };
};

export const nextPage = () => {
  return {
    type: "NEXT_PAGE"
  };
};

export const firstPage = () => {
  return {
    type: "FIRST_PAGE"
  };
};

export const lastPage = () => {
  return {
    type: "LAST_PAGE"
  };
};

export const setUsersPerPage = usersPerPage => {
  return {
    type: "SET_USERS_PER_PAGE",
    usersPerPage
  };
};
