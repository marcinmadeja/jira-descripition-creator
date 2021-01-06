(function() {
  const description = document.getElementById('description');

  const getDescription = (options) => {
    const selectedOptions = [];


    if (options.includes('todo')) selectedOptions.push(addTodo(options));

    if (options.includes('notes')) selectedOptions.push(addNotes(options));

    selectedOptions.push(addDescription());

    if (options.includes('scenario')) selectedOptions.push(addScenario());

    if (options.includes('regression')) selectedOptions.push(addRegression());

    return selectedOptions.join("\n");
  }

  const addNotes = (options) => {
    const selectedOptions = [];

    if (options.includes('responsive')) selectedOptions.push("responsiveness");
    if (options.includes('accessibility')) selectedOptions.push("accessibility");
    if (options.includes('edge-cases')) selectedOptions.push("edge-cases");
    if (options.includes('cross-browser')) selectedOptions.push("cross-browser");

    return `
      {panel:title=Notes for testers}
        Require role *role_name*

        *Check also:*
        ${selectedOptions.map((string) => "* " + string).join("\n")}
      {panel}
    `;
  }


  const addDescription = () => {
    return `
      {panel:title=Description}
      ...
      {panel}
    `;
  }

  const addScenario = () => {
    return `
      {panel:title=Scenario 1}
        *Steps:*

        *Expected Results:*

        *Actual Results:*
      {panel}
    `;
  }

  const addRegression = () => {
    return `
      {panel:title=Regression scenario 1}
        Add info about potential regression related to this ticket.
      {panel}
    `;
  }

  const addTodo = (options) => {
    const selectedOptions = [];

    if (options.includes('responsive')) selectedOptions.push("Check responsiveness / create a ticket");
    if (options.includes('accessibility')) selectedOptions.push("Check accessibility / create a ticket");
    if (options.includes('cross-browser')) selectedOptions.push("Test in safari / firefox / ie / edge");
    if (options.includes('edge-cases')) selectedOptions.push("Check edge cases (full length of text, no white spaces)");
    if (options.includes('tests')) {
      selectedOptions.push("Create unit, cypress, playwright tests / create ticket");
      selectedOptions.push("Check tests and update them if necessary");
    }

    selectedOptions.push("Add no test if needed");

    return `
      {panel:title=Check fallowing points before moving to ready for review|bgColor=#eae6ff}
        ${selectedOptions.map((string) => "* " + string).join("\n")}
      {panel}
    `;
  }

  const init = () => {
    chrome.storage.sync.get(['type', 'options'], function(result) {
      const { type, options } = result;
      description.value = getDescription(options);
    });
  }

  if (!!description) {
    init();
  }
})();