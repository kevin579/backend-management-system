import type { AppDispatch } from "../index";

export const add = () => ({
  type: "configItem/add",
  payload: 5,
});

export const add2 = () => (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch({
      type: "configItem/add",
      payload: 15,
    });
  }, 1000);
};
