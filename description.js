(function() {
  const getDescription = (options) => {
    let description = '';


    if (options.includes('notes')) {
      description += `
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


    description += `
      {panel:title=Description}
      ...
      {panel}
    `;

    if (options.includes('scenario')) {
      description += `
        {panel:title=Scenario 1}
          *Steps:*

          *Expected Results:*

          *Actual Results:*
        {panel}
      `;
    }

    if (options.includes('regression')) {
      description += `
        {panel:title=Regression scenario 1}
          Add info about potential regression related to this ticket.
        {panel}
      `;
    }

    if (options.includes('todo')) {
      description += `
        {panel:title=To do before ready for review}
          * Check responsiveness / create a ticket
          * Check accessibility / create a ticket
          * Test in safari / firefox / ie / edge
          * Check edge cases (full length of text, no white spaces)
          * Create unit, cypress, playwright tests / create ticket
          * Update tests if necessary
        {panel}
      `;
    }


    return description;
  }

  chrome.storage.sync.get(['type', 'options'], function(result) {
    const { type, options } = result;
    const description = document.getElementById('description');
    description.value = getDescription(options);
  });
})();