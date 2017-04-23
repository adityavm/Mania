// get currents
const getCurrents = (state = {}, count = true) => {
  const
    query = state.currentQuery,
    step = state.queries[state.currentQuery].currentStep;

  return {
    query: count ? query : state.queries[query],
    step: count ? step : state.queries[query].steps[step],
  };
};

exports.getCurrents = getCurrents;
