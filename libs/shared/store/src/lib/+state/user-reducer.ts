import { createReducer, on } from '@ngrx/store';
import { UserState } from './user';
import { userActions } from './user-actions';

export const userKey = 'userStore';

export const initialState: UserState = {
  loggedInUser: { name: 'John', address: '', phone: '', roles: [''] },
};

export const userReducer = createReducer(
  initialState,
  on(userActions.CreateUser, (state, { user }) => {
    return {
      ...state,
      loggedInUser: user,
    };
  })
);
