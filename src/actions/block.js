import { socialgraph as api } from '../api';
import { Actors as ACTORS } from '../constants';

// -- Block

function blockRequest() {
  return {
    type: ACTORS.BLOCK.REQUEST,
  };
}

function blockSuccess(response) {
  return {
    type: ACTORS.BLOCK.SUCCESS,
    actor: response.data,
  };
}

function blockFailure(error) {
  return {
    type: ACTORS.BLOCK.FAILURE,
    error: error.message,
  };
}

export function blockActor(viewer, actor) {
  return (dispatch) => {
    dispatch(blockRequest());
    return new Promise((resolve, reject) => {
      api.blockActor(viewer, actor)
        .then((result) => {
          dispatch(blockSuccess(result));
          return resolve();
        }, (response) => {
          dispatch(blockFailure(response));
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}

// -- Unblock

function unblockRequest() {
  return {
    type: ACTORS.UNBLOCK.REQUEST,
  };
}

function unblockSuccess(response) {
  return {
    type: ACTORS.UNBLOCK.SUCCESS,
    actor: response.data,
  };
}

function unblockFailure(error) {
  return {
    type: ACTORS.UNBLOCK.FAILURE,
    error: error.message,
  };
}

export function unblockActor(viewer, actor) {
  return (dispatch) => {
    dispatch(unblockRequest());
    return new Promise((resolve, reject) => {
      api.unblockActor(viewer, actor)
        .then((result) => {
          dispatch(unblockSuccess(result));
          return resolve();
        }, (response) => {
          dispatch(unblockFailure(response));
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}
