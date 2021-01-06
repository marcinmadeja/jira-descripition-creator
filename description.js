(function() {
  const description = document.getElementById('description');

  const getDescription = (options) => {
    let description = '';

    if (options.includes('todo')) description += addTodo(options);

    if (options.includes('notes')) description += addNotes(options);

    description += addDescription();

    if (options.includes('scenario')) description += addScenario();

    if (options.includes('regression')) description += addRegression();

    return description;
  }

  const addNotes = (options) => {
    let optionsString = '';

    if (options.includes('responsive')) optionsString += "* responsiveness\n";
    if (options.includes('accessibility')) optionsString += "* accessibility\n";
    if (options.includes('edge-cases')) optionsString += "* edge-cases\n";
    if (options.includes('cross-browser')) optionsString += "* cross-browser\n";

    return `
      {panel:title=Notes for testers}
        Require role *role_name*

        *Check also:*
        ${optionsString}
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
    let optionsString = '';

    if (options.includes('responsive')) optionsString += "* Check responsiveness / create a ticket\n";
    if (options.includes('accessibility')) optionsString += "* Check accessibility / create a ticket\n";
    if (options.includes('cross-browser')) optionsString += "* Test in safari / firefox / ie / edge\n";
    if (options.includes('edge-cases')) optionsString += "* Check edge cases (full length of text, no white spaces)\n";
    if (options.includes('tests')) {
      optionsString += "* Create unit, cypress, playwright tests / create ticket\n";
      optionsString += "* Check tests and update them if necessary\n";
    }

    return `
      {panel:title=Check fallowing points before moving to ready for review|bgColor=#eae6ff}
        ${optionsString}
        * Add no test if needed
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