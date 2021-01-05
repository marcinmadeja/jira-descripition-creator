const addDescription = document.getElementById('add-description');

addDescription.onclick = function(element) {
  const typeValue = document.querySelector('input[name="type"]:checked').value;
  const optionsCheckboxes = document.querySelectorAll('input[name="option"]:checked');
  const selectedOptions = [];

  for (var i = 0; i < optionsCheckboxes.length; i++) {
    selectedOptions.push(optionsCheckboxes[i].value)
  }


  console.log('typeValue', typeValue);
  console.log('selectedOptions', selectedOptions);

  chrome.storage.sync.set({type: typeValue});
  chrome.storage.sync.set({options: selectedOptions});

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const xxx = '1';
    chrome.tabs.executeScript(
        tabs[0].id,
        {
          file: "description.js",
          allFrames: true
        });
    // chrome.tabs.executeScript(
    //     tabs[0].id,
    //     {code: `document.getElementById('description').value = '${description}';`});
  });
};
