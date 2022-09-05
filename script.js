let elements = document.querySelector('.elements');
const addButtonElement = document.querySelector('.add-element');
const idNum = Symbol('idNumber');

const inputAttribute = {
	type: 'number',
	class: 'number',
	id: 'flex-grow-element-',
	[idNum]: 1,
};

function addElement() {
	let label = document.createElement('label');
	let input = document.createElement('input');
	label.innerHTML = `Flex-grow элемента ${++inputAttribute[idNum]}`;
	label.setAttribute('for', `flex-grow-element-${inputAttribute[idNum]}`);
	setInputAttribute(input);
	elements.append(label);
	elements.append(input);
}

function setInputAttribute(input) {
	for (let attribute in inputAttribute) {
		if (attribute !== 'id') {
			input.setAttribute(attribute, inputAttribute[attribute]);
		} else {
			input.setAttribute(attribute, `${inputAttribute[attribute]}${inputAttribute[idNum]}`);
		}
	}
}