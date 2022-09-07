"use script"

let boxParameters = document.querySelectorAll('.oninput');
let elements = document.querySelector('.elements');
let buttonAdd = document.querySelector('.add');
let flexGrow = document.querySelectorAll('.flex-grow');
let flexShrink = document.querySelectorAll('.flex-shrink');
let flexBasis = document.querySelectorAll('.flex-basis');
let idElement = 0, unitWidthOrHeight;

const inputParameters = {
	parent: {
		"width": "100%",
		"height": "90vh",
		"flex-direction": "row",
		"flex-wrap": "nowrap",
		"justify-content": "flex-start",
		"align-items": "stretch",
		"align-content": "stretch",
	},
	"element-0": {},
};

addToInputParameters();

function addElement() {

	if (idElement < 9) {
		idElement++;
		let fieldset = document.createElement('fieldset');
		fieldset.classList.add('flex', 'item');
		fieldset.innerHTML = `<legend>Элемент ${idElement + 1}</legend>
									 <label for="flex-grow-element-${idElement}" class="element">flex-grow</label>
									 <div class="button-background" onclick="removeElement(this)">
									 	<button type="button" class="button-element remove"></button>
									 </div>
									 <input type="number" class="number flex-grow element element-${idElement} oninput input-child" id="flex-grow-${idElement}" min="0" max="100">
									 <label for="flex-shrink-element-${idElement}" class="flex-title element">flex-shrink</label>
									 <input type="number" class="number flex-shrink element element-${idElement} oninput input-child" id="flex-shrink-${idElement}" min="0" max="100">
									 <label for="flex-basis-element-${idElement}" class="flex-title element">flex-basis</label>
									 <input type="text" class="number flex-basis element element-${idElement} oninput input-child" id="flex-basis-${idElement}" min="0" max="1000">
									 <select name="unit" id="flex-basis-unit-${idElement}" class="unit element element-${idElement} oninput input-child">
									 	<option value="%">%</option>
									 	<option value="px" selected>px</option>
									 </select>
									 <label for="margin-element-${idElement}" class="flex-title element">margin</label>
									 <input type="text" class="number margin-top element element-${idElement} oninput input-child" id="margin-top-${idElement}" placeholder="top">
									 <input type="text" class="number margin-right element element-${idElement} oninput input-child" id="margin-right-${idElement}" placeholder="right">
									 <input type="text" class="number margin-bottom element element-${idElement} oninput input-child" id="margin-bottom-${idElement}" placeholder="bottom">
									 <input type="text" class="number margin-left element element-${idElement} oninput input-child" id="margin-left-${idElement}" placeholder="bottom">`;
		elements.appendChild(fieldset);
		inputParameters[`element-${idElement}`] = {};
		updateItems();
	}
	if (idElement === 9) {
		buttonAdd.setAttribute("disabled", "");
	}

}

function removeElement(input) {

	delete inputParameters[`element-${idElement}`];
	elements.removeChild(input.parentNode);
	buttonAdd.removeAttribute("disabled", "");
	idElement--;
	updateItems();

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

			if (boxPatameter.classList.contains('input-parent')) joinWidthOrHeight(boxPatameter);
			if (boxPatameter.classList.contains('input-child')) joinFlexBasis(boxPatameter);
			console.log(inputParameters);

		}
	}
}

function joinWidthOrHeight(boxPatameter) {

	if (boxPatameter.getAttribute('id') === "width" || boxPatameter.getAttribute('id') === "height") {

		if (boxPatameter.getAttribute('id') === "width") {
			inputParameters.parent[boxPatameter.getAttribute('id')] = boxPatameter.value + boxParameters[1].value;
		} else {
			inputParameters.parent[boxPatameter.getAttribute('id')] = boxPatameter.value + boxParameters[3].value;
		}

	} else if (boxPatameter.getAttribute('id') === "width-parent" || boxPatameter.getAttribute('id') === "height-parent") {

		if (boxPatameter.getAttribute('id') === "width-parent") {
			inputParameters.parent[boxParameters[0].getAttribute('id')] = boxParameters[0].value + boxPatameter.value;
		} else {
			inputParameters.parent[boxParameters[2].getAttribute('id')] = boxParameters[2].value + boxPatameter.value;
		}

	} else {

		inputParameters.parent[boxPatameter.getAttribute('id')] = boxPatameter.value;

	}

}

function joinFlexBasis(boxPatameter) {

	outher: for (let i = 0; i <= idElement; i++) {

		if (+boxPatameter.getAttribute('id').replace(/[^0-9]/g, '') === i && boxPatameter.getAttribute('id').slice(0, -2) !== "flex-basis-unit") {
			inputParameters[`element-${i}`][boxPatameter.getAttribute('id').slice(0, -2)] = boxPatameter.value;
		}

		if (boxPatameter.getAttribute('id').slice(0, -2) === "flex-basis") {
			console.log(`flex-basis-unit-${i}`);
			for (let j = 11; j < boxParameters.length; j++) {
				console.log(j);
				if ((boxParameters[i].getAttribute('id') === `flex-basis-unit-${j}`) && (!isNaN(+boxPatameter.value))) {
					inputParameters[`element-${i}`][boxPatameter.getAttribute('id').slice(0, -2)] = boxPatameter.value + boxParameters[j].value;
					console.log(j);
					break;
				}

			}

		}

		if (boxPatameter.getAttribute('id').slice(0, -2) === "flex-basis-unit") {

			for (let k = 11; k < boxParameters.length; k++) {

				if (boxParameters[k].getAttribute('id') === `flex-basis-${i}` && !isNaN(+boxParameters[k].value)) {
					inputParameters[`element-${i}`][`flex-basis`] = boxParameters[k].value + boxPatameter.value;
					break outher;
				}

			}

		}
	}

}


// setInterval(function() {
// 	console.log('1');
// }, 1000);