(function() {
  const description = document.getElementById('description');

  const getDescription = (options) => {
    let description = '';

    description += addWarning();

    if (options.includes('notes')) description += addNotes();

    description += addDescription();

    if (options.includes('scenario')) description += addScenario();

    if (options.includes('regression')) description += addRegression();

    if (options.includes('todo')) description += addTodo();

    return description;
  }

  const addWarning = () => {
    return `
      {panel:title=Notes|bgColor=#fefae6}Remove this message after a ticket is completed.{panel}
    `;
  };

  const addNotes = (options) => {
    return `
      {panel:title=Notes|bgColor=#eae6ff}
        Require role *role_name*

        *Test also:*
        * responsiveness
        * accessibility
        * edge cases (full length of text, no white spaces)
        * cross browser
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

  const addTodo = () => {
    return `
      {panel:title=To do before ready for review}
        * Check responsiveness / create a ticket
        * Check accessibility / create a ticket
        * Test in safari / firefox / ie / edge
        * Check edge cases (full length of text, no white spaces)
        * Create unit, cypress, playwright tests / create ticket
        * Update tests if necessary
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