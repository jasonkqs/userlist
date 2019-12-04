const sort = (
  state = { isSorted: false, sortedBy: "", sortedAscendingly: false },
  action
) => {
  switch (action.type) {
    case "SORT_USERS":
      const { isSorted, sortedAscendingly } = state;
      const prevSortedBy = state.sortedBy;
      const nextSortedBy = action.sortedBy;

      if (nextSortedBy !== prevSortedBy) {
        return {
          ...state,
          isSorted: true,
          sortedBy: nextSortedBy,
          sortedAscendingly: true
        };
      }
      if (isSorted && !sortedAscendingly) {
        return {
          ...state,
          isSorted: false,
          sortedBy: "",
          sortedAscendingly: false
        };
      }
      const nextSortedAscendingly = !sortedAscendingly;
      return {
        ...state,
        isSorted: true,
        sortedBy: nextSortedBy,
        sortedAscendingly: nextSortedAscendingly
      };
    default:
      return state;
  }
};

export default sort;
