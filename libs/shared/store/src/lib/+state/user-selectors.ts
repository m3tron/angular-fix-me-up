import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user';
import { userKey } from './user-reducer';

const userState = createFeatureSelector<UserState>(userKey);

const user = createSelector(userState, (state) => {
  console.log(state.loggedInUser);
  console.log(state);
  return state.loggedInUser;
});

const userName = createSelector(user, (state) => {
  return state ? state.name : '';
});

export const userSelectors = {
  user,
  userName,
};
