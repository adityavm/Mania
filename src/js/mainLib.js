import * as Constants from "js/app/constants";
import StepActions from "js/app/actions/stepActions";

const persistState = store => {
  let timeout = null;
  const savedState = () => document.querySelector(".saved-status");

  store.subscribe(() => {
    savedState().classList.add("saving");
    const state = store.getState();
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    };
    timeout = setTimeout(() => {
      localStorage.setItem("state", JSON.stringify(state));
      timeout = null;
      console.log("Saved @ ", new Date());
      savedState().classList.remove("saving");
    }, 2000);
  });
};

const handleKeyboard = (store, msg) => {
  console.log(msg);
  switch (msg) {
  case Constants.EVENT.NEXT_STEP: store.dispatch(StepActions.activateStep(0, 1)); break;
  case Constants.EVENT.PREVIOUS_STEP: store.dispatch(StepActions.activateStep(0, 0)); break;
  }
};

exports.persistState = persistState;
exports.handleKeyboard = handleKeyboard;
