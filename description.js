(function() {
  const getDescription = () => {
    let description = '';
    description += `
    {panel:title=Notes|bgColor=#eae6ff}
      Require role *role_name*

      *Test also:*
      * responsiveness
      * accessibility
      * edge cases (full length of text, no white spaces)
      * cross browser
    {panel}

    {panel:title=Description}
      ...
    {panel}

    {panel:title=Scenario 1}
      *Steps:*

      *Expected Results:*

      *Actual Results:*
    {panel}

    {panel:title=To do before ready for review}
      * Check responsiveness / create a ticket
      * Check accessibility / create a ticket
      * Test in safari / firefox / ie / edge
      * Check edge cases (full length of text, no white spaces)
      * Create unit, cypress, playwright tests / create ticket
      * Update tests if necessary
    {panel}
    `;

    return description;
  }

  const description = document.getElementById('description');
  description.value = getDescription();
})();