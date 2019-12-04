const data = (
  state = {
    isLoading: false,
    error: "",
    users: [],
    filter: "",
    usersAfterFilter: [],
    curPage: 1,
    usersPerPage: 5,
    maxPage: 1,
    selectedUser: null
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_GET_USERS_START":
      return {
        ...state,
        isLoading: true
      };
    case "REQUEST_GET_USERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        users: action.users,
        usersAfterFilter: action.users,
        maxPage: Math.ceil(action.users.length / state.usersPerPage)
      };
    case "REQUEST_GET_USERS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case "REQUEST_GET_USER_START":
      return {
        ...state,
        isLoading: true
      };
    case "REQUEST_GET_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        selectedUser: action.user
      };
    case "REQUEST_GET_USER_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case "REQUEST_DELETE_USER_START":
      return {
        ...state,
        isLoading: true
      };
    case "REQUEST_DELETE_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };
    case "REQUEST_DELETE_USER_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case "REQUEST_ADD_USER_START":
      return {
        ...state,
        isLoading: true
      };
    case "REQUEST_ADD_USER_SUCCESS":
      return {
        ...state,
        isLoading: false
      };
    case "REQUEST_ADD_USER_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case "REQUEST_SAVE_CHANGES_START":
      return {
        ...state,
        isLoading: true
      };
    case "REQUEST_SAVE_CHANGES_SUCCESS":
      return {
        ...state,
        isLoading: false
      };
    case "REQUEST_SAVE_CHANGES_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case "SET_FILTER": {
      const { filter } = action;
      const { users, usersPerPage, curPage } = state;
      let usersAfterFilter = [];
        usersAfterFilter = users.filter(user => {
          for (let prop in user) {
            if (prop === "_id" || prop === "password") {
              continue;
            }
            if (
              user[prop]
                .toString()
                .toLowerCase()
                .includes(filter.toString().toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });
      const maxPage = Math.ceil(usersAfterFilter.length / usersPerPage);

      return {
        ...state,
        filter: action.filter,
        usersAfterFilter,
        curPage: maxPage === 0 ? 1 : curPage > maxPage ? maxPage : curPage,
        maxPage
      };
    }
    case "PREV_PAGE":
      return {
        ...state,
        curPage: state.curPage - 1
      };
    case "NEXT_PAGE":
      return {
        ...state,
        curPage: state.curPage + 1
      };
    case "FIRST_PAGE":
      return {
        ...state,
        curPage: 1
      };
    case "LAST_PAGE":
      return {
        ...state,
        curPage: state.maxPage
      };
    case "SET_USERS_PER_PAGE":
      const { curPage, usersAfterFilter } = state;

      const maxPage = Math.ceil(usersAfterFilter.length / action.usersPerPage);

      return {
        ...state,
        usersPerPage: action.usersPerPage,
        curPage: maxPage === 0 ? 1 : curPage > maxPage ? maxPage : curPage,
        maxPage
      };
    default:
      return state;
  }
};



export default data;
