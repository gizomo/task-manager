import { SHOW_LOADER, ADD_TASK, FETCH_TASKS, REMOVE_TASK } from '../types';
const handlers = {
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [ADD_TASK]: (state, {payload}) => ({...state, tasks: [...state.tasks, payload]}),
  [FETCH_TASKS]: (state, {payload}) => ({...state, tasks: payload, loading: false}),
  [REMOVE_TASK]: (state, {payload}) => ({...state, tasks: state.tasks.filter(task => task.id !== payload)}),
  DEFAULT: (state) => state,
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
