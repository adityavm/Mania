const assert = require("assert");

describe("AppState", () => {

  let App = require("../src/js/reducers/app");

  it("should exist", () => {
    assert(App !== undefined);
  });

  it("should add a step", () => {
    // arrange
    let initState = { queries: [{ steps: [], currentStep: -1 }], currentQuery: 0 };

    // act
    let newState = App.default(initState, { type: "ADD_STEP", query: 0 });

    // assert
    assert(newState.queries !== initState.queries, "should make new `queries` array");
    assert(newState.queries[0].steps !== initState.queries[0].steps, "should make new `steps` array");
    assert(newState.queries[0].steps.length === 1, "should add a step");
    assert(newState.queries[0].currentStep === 0, "should increment currentStep");
  });

  describe("when removing step", () => {

    it("should remove specified step", () => {
      // arrange
      let initState = { queries: [{ steps: [{}, {}], currentStep: 0 }], currentQuery: 0 };

      // act
      let newState = App.default(initState, { type: "REMOVE_STEP", query: 0, step: 0 });

      // assert
      assert(newState.queries !== initState.queries, "should make new `queries` array");
      assert(newState.queries[0].steps !== initState.queries[0].steps, "should make a new `steps` array");
      assert(newState.queries[0].steps.length === 1, "should remove a step");
    });

    it("should set currentStep to new last step", () => {
      // arrange
      let initState = { queries: [{ steps: [{}, {}], currentStep: 1 }], currentQuery: 0 };

      // act
      let newState = App.default(initState, { type: "REMOVE_STEP", query: 0, step: 0 });

      // assert
      assert(newState.queries[0].currentStep === 0);
    });

    it("should not change currentStep", () => {
      // arrange
      let initState = { queries: [{ steps: [{}, {}], currentStep: 1 }], currentQuery: 0 };

      // act
      let newState = App.default(initState, { type: "REMOVE_STEP", query: 0, step: 1 });

      // assert
      assert(newState.queries[0].currentStep === 0);
    });

  });

  it("should activate a given step", () => {
    // arrange
    let initState = { queries: [{ steps: [{}, {}], currentStep: 1 }], currentQuery: 0 };

    // act
    let newState = App.default(initState, { type: "ACTIVATE_STEP", query: 0, step: 0 });

    // assert
    assert(newState.queries[0].currentStep === 0);
  });

  it("should reorder given step", () => {
    // arrange
    let initState = { queries: [{ steps: [{ url: "1234" }, { url: "2345" }], currentStep: 1 }], currentQuery: 0 };

    // act
    let newState = App.default(initState, { type: "REORDER_STEP", query: 0, from: 0, to: 1 });

    // assert
    assert(newState.queries[0].steps !== initState.queries[0].steps, "case 1 / steps should be different");
    assert(newState.queries[0].steps[0].url === "2345", "case 1 / first step should be previously second");
    assert(newState.queries[0].steps[1].url === "1234", "case 1 / second step should be previously first");

    let newState2 = App.default(newState, { type: "REORDER_STEP", query: 0, from: 0, to: 1 });

    assert(newState2.queries[0].steps !== newState.queries[0].steps, "case 2 / steps should be different");
    assert(newState2.queries[0].steps[1].url === "2345", "case 2 / first step should be previously second");
    assert(newState2.queries[0].steps[0].url === "1234", "case 2 / second step should be previously first");
  });

  it("should change current step method to POST", () => {
    // arrange
    let initState = { queries: [{ steps: [{ method: "GET" }], currentStep: 0 }], currentQuery: 0 };

    // act
    let newState = App.default(initState, { type: "TOGGLE_STEP_METHOD" });

    // assert
    assert(newState.queries[0].steps[0].method === "POST");
  });

  describe("when setting step value", () => {

    it("should return new `steps` array", () => {
      // arrange
      let initState = { queries: [{ steps: [{ method: "GET" }, { url: "1234" }], currentStep: 0 }], currentQuery: 0 };

      // act
      let newState = App.default(initState, { type: "SET_CURRENT_STEP_VALUE", key: "url", value: "1234" });
      let newState2 = App.default(initState, { type: "SET_STEP_VALUE", query: 0, step: 1, key: "method", value: "POST" });

      // assert
      assert(newState.queries[0].steps !== initState.queries[0].steps, "return new array when replacing in current step");
      assert(newState2.queries[0].steps !== initState.queries[0].steps, "return new array when replacing in arbitrary step");
    });

    it("should set value in current step", () => {
      // arrange
      let initState = { queries: [{ steps: [{ method: "GET" }], currentStep: 0 }], currentQuery: 0 };

      // act
      let newState = App.default(initState, { type: "SET_CURRENT_STEP_VALUE", key: "url", value: "1234" });

      // assert
      assert(newState.queries[0].steps[0].url === "1234");
    });

    it("should set value in arbitrary step", () => {
      // arrange
      let initState = { queries: [{ steps: [{ method: "GET" }, { url: "1234" }], currentStep: 0 }], currentQuery: 0 };

      // act
      let newState = App.default(initState, { type: "SET_STEP_VALUE", query: 0, step: 0, key: "url", value: "1234" });
      let newState2 = App.default(initState, { type: "SET_STEP_VALUE", query: 0, step: 1, key: "method", value: "POST" });

      // assert
      assert(newState.queries[0].steps[0].url === "1234", "set url to 1234 in first step");
      assert(newState2.queries[0].steps[1].method === "POST", "set method to POST in second step");
    });

  });

  it("should add a new blank query", () => {
    // arrange / set up responses
    let initState = { queries: [], currentQuery: 0 };

    // act
    let newState = App.default(initState, { type: "ADD_QUERY", key: "url", value: "1234" });

    // assert
    assert(newState.queries !== initState.queries, "return new `queries` array");
    assert(newState.queries.length === 1, "add a new query");
  });

  describe("when evaluating step runner", () => {

    it("should run code against step response", () => {
      // arrange / set up responses
      let code = `return response.items`;
      let response = `{ "items": [1, 2, 3] }`;
      let initState = { queries: [{ steps: [{ method: "GET", modifier: code, response: { text: response, status: 200, time: 0 } }], currentStep: 0 }], currentQuery: 0 };

      // act
      let newState = App.default(initState, { type: "EVALUATE_STEP_RUNNER", query: 0, step: 0 });

      // assert
      let evalResponse = newState.queries[0].steps[0].evaluation.response;
      assert(evalResponse[0] === 1, "first response value is 1");
      assert(evalResponse[1] === 2, "second response value is 2");
      assert(evalResponse[2] === 3, "third response value is 3");
      assert(evalResponse[3] === undefined, "fourth response value doesn't exist");
    });

    it("should add assertions", () => {
      // arrange / set up responses
      let code = `assert(response.items[0] === 1, "labelled assertion");
      assert(response.items[0] === 2);`;
      let response = `{ "items": [1, 2, 3] }`;
      let initState = { queries: [{ steps: [{ method: "GET", modifier: code, response: { text: response, status: 200, time: 0 } }], currentStep: 0 }], currentQuery: 0 };

      // act
      let newState = App.default(initState, { type: "EVALUATE_STEP_RUNNER", query: 0, step: 0 });

      // assert
      let assertions = newState.queries[0].steps[0].evaluation.assertions;
      assert(assertions[0][0] === true, "first assertion is true");
      assert(assertions[0][1] === "labelled assertion", "first assertion has a label");
      assert(assertions[1][0] === false, "second assertion is false");
      assert(assertions[1][1] === "unlabeled assertion 2", "second assertion has automatic label");
    });

  });


});
