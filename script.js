let elements = document.querySelector('.elements');
let flex = document.querySelector('.item');
let ButtonRemove = document.querySelector('.remove');
let flexGrow = document.querySelectorAll('.flex-grow');
let idElement = 1;
let element;

// const idNum = Symbol('idNumber');
// const inputAttribute = {
// 	type: 'number',
// 	class: 'number',
// 	id: 'flex-grow-element-',
// 	[idNum]: 1,
// };

// function addElement() {
// 	let label = document.createElement('label');
// 	let input = document.createElement('input');
// 	label.innerHTML = `Flex-grow элемента ${++inputAttribute[idNum]}`;
// 	label.setAttribute('for', `flex-grow-element-${inputAttribute[idNum]}`);
// 	setInputAttribute(input);
// 	elements = flexElement;
// }

// function setInputAttribute(input) {
// 	for (let attribute in inputAttribute) {
// 		if (attribute !== 'id') {
// 			input.setAttribute(attribute, inputAttribute[attribute]);
// 		} else {
// 			input.setAttribute(attribute, `${inputAttribute[attribute]}${inputAttribute[idNum]}`);
// 		}
// 	}
// }

function addElement() {

	if ( idElement < 10 ) {
		idElement++;
		let fieldset = document.createElement('fieldset');
		fieldset.classList.add('flex', 'item');
		fieldset.innerHTML = `<legend>Элемент ${ idElement }</legend>
					<label for="flex-grow-element-${ idElement }" class="flex-title element">Flex-grow</label>
					<button type="button" class="button-element remove" onclick="removeElement(this)">-</button>
					<input type="number" class="number flex-grow element" id="flex-grow-element-${ idElement }" min="0" max="100">
					<label for="flex-shrink-element-${ idElement }" class="flex-title element">Flex-shrink</label>
					<input type="number" class="number flex-shrink element" id="flex-shrink-element-${ idElement }" min="0" max="100">
					<label for="flex-basis-element-${ idElement }" class="flex-title element">Flex-basis</label>
					<input type="number" class="number flex-basis element" id="flex-basis-element-${ idElement }" min="0" max="1000">
					<select name="unit" id="flex-basis-unit-${ idElement }" class="unit element">
						<option value="%" selected>%</option>
						<option value="px">px</option>
					</select>`;
		elements.appendChild(fieldset);
		element = document.querySelectorAll('.item');
	}
}

function removeElement(input) {
	elements.removeChild(input.parentNode);
	element = document.querySelectorAll('.item');
}



// setInterval(function() {
// 	console.log('1');
// }, 1000);