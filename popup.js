const addDescription = document.getElementById('add-description');
const allTypes = Array.from(document.querySelectorAll('input[name="type"]'));
const allOptions = Array.from(document.querySelectorAll('input[name="option"]'));

const basicValues = [
  'notes',
  'scenario',
  'regression'
];

const standardValues = [
  ...basicValues,
  'todo',
  'responsive',
  'accessibility',
];

function onTypeChange(e) {
	const value = e.currentTarget.value;
  allOptions.forEach((item) => {
  	const optionValue = item.value;
  	if (value === 'basic') {
			if (basicValues.includes(optionValue)) {
      	item.checked = true;
      } else {
      	item.checked = false;
      }
    } else if (value === 'standard') {
			if (standardValues.includes(optionValue)) {
      	item.checked = true;
      } else {
      	item.checked = false;
      }
    } else {
      item.checked = true;
    }
  });
}

allTypes.forEach((type) => {
  type.addEventListener('change', onTypeChange);
});

addDescription.onclick = function(element) {
  const typeValue = document.querySelector('input[name="type"]:checked').value;
  const optionsCheckboxes = document.querySelectorAll('input[name="option"]:checked');
  const selectedOptions = [];

  for (var i = 0; i < optionsCheckboxes.length; i++) {
    selectedOptions.push(optionsCheckboxes[i].value)
  }

  chrome.storage.sync.set({type: typeValue});
  chrome.storage.sync.set({options: selectedOptions});

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {
          file: "description.js",
          allFrames: true
        });
  });
};

const init = () => {
  onTypeChange({ currentTarget: { value: 'standard' } });
}

init();