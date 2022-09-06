"use script"

let boxParameters = document.querySelectorAll('.oninput');
let elements = document.querySelector('.elements');
let ButtonRemove = document.querySelector('.remove');
let flexGrow = document.querySelectorAll('.flex-grow');
let flexShrink = document.querySelectorAll('.flex-shrink');
let flexBasis = document.querySelectorAll('.flex-basis');
let idElement = 1, str;

const inputParameters = {
	parent: {
		"width-container": 500,
		"height-container": 90,
		"width-parent": "%",
		"height-parent": "vh",
		"flex-direction": "row",
		"flex-wrap": "nowrap",
		"justify-content": "flex-start",
		"align-items": "stretch",
		"align-content": "stretch",
	},
	"element-1": {},
};

addToInputParameters();

function addElement() {

	if (idElement < 10) {
		idElement++;
		let fieldset = document.createElement('fieldset');
		fieldset.classList.add('flex', 'item');
		fieldset.innerHTML = `<legend>Элемент ${idElement}</legend>
									 <label for="flex-grow-element-${idElement}" class="element">flex-grow</label>
									 <button type="button" class="button-element remove" onclick="removeElement(this)">-</button>
									 <input type="number" class="number flex-grow element element-${idElement} oninput input-child" id="flex-grow-${idElement}" min="0" max="100">
									 <label for="flex-shrink-element-${idElement}" class="flex-title element">flex-shrink</label>
									 <input type="number" class="number flex-shrink element element-${idElement} oninput input-child" id="flex-shrink-${idElement}" min="0" max="100">
									 <label for="flex-basis-element-${idElement}" class="flex-title element">flex-basis</label>
									 <input type="number" class="number flex-basis element element-${idElement} oninput input-child" id="flex-basis-${idElement}" min="0" max="1000">
									 <select name="unit" id="flex-basis-unit-${idElement}" class="unit element element-${idElement} oninput input-child">
									 	<option value="%">%</option>
									 	<option value="px" selected>px</option>
									 </select>`;
		elements.appendChild(fieldset);
		inputParameters[`element-${idElement}`] = {};
		updateItems();
	}
}

function removeElement(input) {
	delete inputParameters[`element-${idElement}`];
	elements.removeChild(input.parentNode);
	idElement--;
	updateItems();
	console.log(inputParameters);
}

function updateItems() {
	boxParameters = document.querySelectorAll('.oninput');
	flexGrow = document.querySelectorAll('.flex-grow');
	flexShrink = document.querySelectorAll('.flex-shrink');
	flexBasis = document.querySelectorAll('.flex-basis');
	addToInputParameters();
}

function addToInputParameters() {
	for (let boxPatameter of boxParameters) {
		boxPatameter.oninput = function () {
			if (boxPatameter.classList.contains('input-parent')) {
				inputParameters.parent[boxPatameter.getAttribute('id')] = boxPatameter.value;
			}
			if (boxPatameter.classList.contains('input-child')) {
				for (let i = 1; i <= idElement; i++) {
					if (+boxPatameter.getAttribute('id').replace(/[^0-9]/g, '') === i) {
						inputParameters[`element-${i}`][boxPatameter.getAttribute('id')] = boxPatameter.value;
						console.log(inputParameters[`element-${i}`]);
					}
				}
			}
		}
	}
}


// setInterval(function() {
// 	console.log('1');
// }, 1000);