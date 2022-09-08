"use script"

let boxParameters = document.querySelectorAll('.oninput');
let elements = document.querySelector('.elements');
let buttonAdd = document.querySelector('.add');
let irr = document.querySelector('.extension');
let irs = document.querySelector('.compression');
let idElement = 0;

const inputParameters = {
	parent: {
		"width": "200",
		"flex-direction": "row",
		"flex-wrap": "nowrap",
		"justify-content": "flex-start",
		"align-items": "stretch",
		"align-content": "stretch",
	},
};

for (let i = 0; i < 2; i++) {
	addElement();
}

addToInputParameters();

function addElement() {

	if (idElement < 11) {

		compression = document.querySelector(`s-compression-${idElement}`);
		extension = document.querySelector(`s-extension-${idElement}`);
		let fieldset = document.createElement('fieldset');
		fieldset.classList.add('flex', 'item');
		fieldset.innerHTML = `<legend>Элемент ${idElement + 1}</legend>
									 <label for="flex-grow-element-${idElement}" class="element label-title">flex-grow</label>
									 <div class="button-background" onclick="removeElement(this)">
									 	 <button type="button" class="button-element remove"></button>
									 </div>
									 <input type="number" class="number flex-grow element element-${idElement} oninput input-child" id="flex-grow-${idElement}" min="0" max="100">
									 <label for="flex-shrink-element-${idElement}" class="label-title element">flex-shrink</label>
									 <input type="number" class="number flex-shrink element element-${idElement} oninput input-child" id="flex-shrink-${idElement}" min="0" max="100">
									 <label for="flex-basis-element-${idElement}" class="label-title element">flex-basis</label>
									 <input type="number" class="number flex-basis element element-${idElement} oninput input-child" id="flex-basis-${idElement}" min="0" max="1000">
									 <div class="result">
										 <span>ИРС: <output name="result" class="compression s-compression-${idElement}">NaN</output></span>
										 <span>ИРР: <output name="result" class="extension s-extension-${idElement}">NaN</output></span>
									 </div>`;
		elements.appendChild(fieldset);
		inputParameters[`element-${idElement}`] = {};
		idElement++;
		updateItems();
		calcFinalSizeSrink();
		calcFinalSizeGrow();
	}
	if (idElement === 10) {
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
	irr = document.querySelectorAll('.extension');
	irs = document.querySelectorAll('.compression');
	addToInputParameters();

}

function addToInputParameters() {

	for (let boxPatameter of boxParameters) {

		boxPatameter.oninput = function () {

			joinFlexObject(boxPatameter);
			calcFinalSizeSrink();
			calcFinalSizeGrow();

		}
	}
}

function joinFlexObject(boxPatameter) {

	for (let i = 0; i <= idElement; i++) {

		if (+boxPatameter.getAttribute('id').slice(-1) === i) {
			inputParameters[`element-${i}`][boxPatameter.getAttribute('id').slice(0, -2)] = +boxPatameter.value;
			calcFinalSizeSrink();
			calcFinalSizeGrow();
			showIrsIrr();
			break;
		}

		if (boxPatameter.classList.contains("input-parent")) {
			inputParameters.parent[boxPatameter.getAttribute('id')] = boxPatameter.value;
			calcFinalSizeSrink();
			calcFinalSizeGrow();
			showIrsIrr();
			break;
		}

	}

}

function calcFinalSizeSrink() {

	// op (оставшееся пространство) = ширина контейнера - (flex-basis-1 + flex-basis-2 + ... + flex-basis-n))
	inputParameters.op = +inputParameters.parent.width
		- ((inputParameters[`element-0`]?.["flex-basis"] || 0) + (inputParameters[`element-1`]?.["flex-basis"] || 0)
			+ (inputParameters[`element-2`]?.["flex-basis"] || 0) + (inputParameters[`element-3`]?.["flex-basis"] || 0)
			+ (inputParameters[`element-4`]?.["flex-basis"] || 0) + (inputParameters[`element-5`]?.["flex-basis"] || 0)
			+ (inputParameters[`element-6`]?.["flex-basis"] || 0) + (inputParameters[`element-7`]?.["flex-basis"] || 0)
			+ (inputParameters[`element-8`]?.["flex-basis"] || 0) + (inputParameters[`element-9`]?.["flex-basis"] || 0));

	// spbr (сумма произведений базовых размеров) = (flex-basis-1 * flex-shrink-1) + ... + (flex-basis-n * flex-shrink-n)
	inputParameters.spbr = (((+inputParameters[`element-0`]?.["flex-basis"] || 0) * (inputParameters[`element-0`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-1`]?.["flex-basis"] || 0) * (inputParameters[`element-1`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-2`]?.["flex-basis"] || 0) * (inputParameters[`element-2`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-3`]?.["flex-basis"] || 0) * (inputParameters[`element-3`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-4`]?.["flex-basis"] || 0) * (inputParameters[`element-4`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-5`]?.["flex-basis"] || 0) * (inputParameters[`element-5`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-6`]?.["flex-basis"] || 0) * (inputParameters[`element-6`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-7`]?.["flex-basis"] || 0) * (inputParameters[`element-7`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-8`]?.["flex-basis"] || 0) * (inputParameters[`element-8`]?.["flex-shrink"] || 0))
		+ ((inputParameters[`element-9`]?.["flex-basis"] || 0) * (inputParameters[`element-9`]?.["flex-shrink"] || 0)));

	for (let j = 0; j < idElement; j++) {

		// nks (нормированный коэффициент сжатия элемента) = flex-basis * flex-shrink / spbr (сумма произведений базовых размеров)
		inputParameters[`element-${j}`].nks = (inputParameters[`element-${j}`]?.["flex-basis"] || 0) * (inputParameters[`element-${j}`]?.["flex-shrink"] || 0) / inputParameters.spbr;

		// irs (итоговый размер после сжатия элемента) = flex-basis - nks (нормированный коэффициент сжатия элемента) * op (оставшееся пространство)
		inputParameters[`element-${j}`].irs = Math.abs((inputParameters[`element-${j}`]?.["flex-basis"] || 0)) - Math.abs((inputParameters[`element-${j}`].nks * inputParameters.op));
	}

	// console.log("Отрицательное пространство: " + inputParameters.op);
	// console.log("Сумма произведений базовых размеров: " + inputParameters.spbr);
	// for (let index = 0; index < idElement; index++) {
	// 	console.log(`Нормированный коэффициент сжатия ${index + 1}: ${inputParameters[`element-${index}`]?.nks}`);
	// 	console.log(`Итоговый размер ${index + 1}: ${inputParameters[`element-${index}`]?.ir}`);
	// }

}

function calcFinalSizeGrow() {

	// dsm (доля свободного места) = op (оставшееся пространство) / (flex-grow-1 + flex-grow-2 + ... + flex-grow-n)
	inputParameters.dsm = Math.abs(inputParameters.op)
		/ ((+inputParameters[`element-0`]?.["flex-grow"] || 0) + (inputParameters[`element-1`]?.["flex-grow"] || 0)
			+ (inputParameters[`element-2`]?.["flex-grow"] || 0) + (inputParameters[`element-5`]?.["flex-grow"] || 0)
			+ (inputParameters[`element-6`]?.["flex-grow"] || 0) + (inputParameters[`element-7`]?.["flex-grow"] || 0)
			+ (inputParameters[`element-8`]?.["flex-grow"] || 0) + (inputParameters[`element-9`]?.["flex-grow"] || 0));

	for (let k = 0; k < idElement; k++) {

		// irr (итоговый размер расширения элемента) = flex-basis + dsm (доля свободного места) * flex-grow
		inputParameters[`element-${k}`].irr = (inputParameters[`element-${k}`]?.["flex-basis"] || 0) + inputParameters.dsm * (inputParameters[`element-${k}`]?.["flex-grow"] || 0);
	}

}

function showIrsIrr() {

	for (let index = 0; index < idElement; index++) {
		irs[index].textContent = Math.round(inputParameters[`element-${index}`].irs);
		irr[index].textContent = Math.round(inputParameters[`element-${index}`].irr);
	}

}

// setInterval(function() {
// 	console.log('1');
// }, 1000);