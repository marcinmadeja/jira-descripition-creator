const addDescription = document.getElementById('add-description');

addDescription.onclick = function(element) {
  const description = getDescription();
  // console.log('description', description);
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

const getDescription = () => {
  let description = '';
  description += "{panel:title=My title} Some text with a title {panel}";
  description += "{panel:title=My title} Some text with a title 2{panel}";


  return description;
}