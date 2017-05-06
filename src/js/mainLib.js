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

exports.persistState = persistState;
