import { socialgraph as api } from '../api';
import {
  ACTOR_FOLLOW_REQUEST, ACTOR_FOLLOW_SUCCESS, ACTOR_FOLLOW_FAILURE,
  ACTOR_UNFOLLOW_REQUEST, ACTOR_UNFOLLOW_SUCCESS, ACTOR_UNFOLLOW_FAILURE,
} from '../constants/socialgraph';

// -- Follow

function followRequest() {
  return {
    type: ACTOR_FOLLOW_REQUEST,
  };
}

function followSuccess(response) {
  return {
    type: ACTOR_FOLLOW_SUCCESS,
    person: response.data,
  };
}

function followFailure(error) {
  return {
    type: ACTOR_FOLLOW_FAILURE,
    errorMessage: error.message,
  };
}

export function followPerson(viewer, person) {
  return (dispatch) => {
    dispatch(followRequest());
    return new Promise((resolve, reject) => {
      api.followActor(viewer, person)
        .then((result) => {
          dispatch(followSuccess(result));
          return resolve();
        }, (response) => {
          dispatch(followFailure(response));
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}

// -- Unfollow

function unfollowRequest() {
  return {
    type: ACTOR_UNFOLLOW_REQUEST,
  };
}

function unfollowSuccess(response) {
  return {
    type: ACTOR_UNFOLLOW_SUCCESS,
    person: response.data,
  };
}

function unfollowFailure(error) {
  return {
    type: ACTOR_UNFOLLOW_FAILURE,
    errorMessage: error.message,
  };
}

export function unfollowPerson(viewer, person) {
  return (dispatch) => {
    dispatch(unfollowRequest());
    return new Promise((resolve, reject) => {
      api.unfollowActor(viewer, person)
        .then((result) => {
          dispatch(unfollowSuccess(result));
          return resolve();
        }, (response) => {
          dispatch(unfollowFailure(response));
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}