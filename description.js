(function() {
  const description = document.getElementById('description');

  const getDescription = (options) => {
    let description = '';

    if (options.includes('todo')) description += addTodo();

    if (options.includes('notes')) description += addNotes();

    description += addDescription();

    if (options.includes('scenario')) description += addScenario();

    if (options.includes('regression')) description += addRegression();

    return description;
  }

  const addNotes = (options) => {
    return `
      {panel:title=Notes for testers}
        Require role *role_name*

        *Check also:*
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
      {panel:title=Check fallowing points before moving to ready for review|bgColor=#eae6ff}
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