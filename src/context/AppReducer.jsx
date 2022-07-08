export default (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_TO_WATCHLIST':
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
      case 'REMOVE_ITEM_FROM_WATCHLIST':
        return {
          ...state,
          watchlist: state.watchlist.filter(screenplay => screenplay.id !== action.payload),
        }
    default:
      return state;
  }
};
