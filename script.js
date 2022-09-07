"use script"

let boxParameters = document.querySelectorAll('.oninput');
let elements = document.querySelector('.elements');
let buttonAdd = document.querySelector('.add');
let flexGrow = document.querySelectorAll('.flex-grow');
let flexShrink = document.querySelectorAll('.flex-shrink');
let flexBasis = document.querySelectorAll('.flex-basis');
let idElement = 0, unitWidthOrHeight, compression, extension, op, spbr;

const inputParameters = {
	parent: {
		"width": "800",
		"height": "90vh",
		"flex-direction": "row",
		"flex-wrap": "nowrap",
		"justify-content": "flex-start",
		"align-items": "stretch",
		"align-content": "stretch",
	},
	"element-0": {},
};

let shk = +inputParameters.parent.width || 0;

addToInputParameters();

function addElement() {

	if (idElement < 9) {
		idElement++;
		compression = document.querySelector(`s-compression-${idElement}`);
		extension = document.querySelector(`s-extension-${idElement}`);
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
									 <label for="margin-element-${idElement}" class="flex-title element">margin</label>
									 <input type="text" class="number margin-top element element-${idElement} oninput input-child" id="margin-top-${idElement}" placeholder="top">
									 <input type="text" class="number margin-right element element-${idElement} oninput input-child" id="margin-right-${idElement}" placeholder="right">
									 <input type="text" class="number margin-bottom element element-${idElement} oninput input-child" id="margin-bottom-${idElement}" placeholder="bottom">
									 <input type="text" class="number margin-left element element-${idElement} oninput input-child" id="margin-left-${idElement}" placeholder="bottom">
									 <div class="result">
										 <span>ИРС: <output name="result" class="s-compression-${idElement}">0</output></span>
										 <span>ИРР: <output name="result" class="s-extension-${idElement}">0</output></span>
									 </div>`;
		elements.appendChild(fieldset);
		inputParameters[`element-${idElement}`] = { nks: {}, ir: {} };
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

			joinFlexObject(boxPatameter);
			calcFinalSizeSrink();

		}
	}
}

function joinFlexObject(boxPatameter) {

	inputParameters.parent[boxPatameter.getAttribute('id')] = boxPatameter.value;

	for (let i = 0; i <= idElement; i++) {

		if (+boxPatameter.getAttribute('id').replace(/[^0-9]/g, '') === i) {
			inputParameters[`element-${i}`][boxPatameter.getAttribute('id').slice(0, -2)] = boxPatameter.value;
			calcFinalSizeSrink();
			break;
		}

	}

}

function calcFinalSizeSrink() {

	for (let j = 0; j < idElement; j++) {
		inputParameters.op = +inputParameters.parent.width - ((+inputParameters[`element-${j}`]?.["flex-basis"] || 0) + (+inputParameters[`element-${j + 1}`]?.["flex-basis"] || 0));
	}

	inputParameters.spbr = (((+inputParameters[`element-0`]?.["flex-basis"] || 0) * (+inputParameters[`element-0`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-1`]?.["flex-basis"] || 0) * (+inputParameters[`element-1`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-2`]?.["flex-basis"] || 0) * (+inputParameters[`element-2`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-3`]?.["flex-basis"] || 0) * (+inputParameters[`element-3`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-4`]?.["flex-basis"] || 0) * (+inputParameters[`element-4`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-5`]?.["flex-basis"] || 0) * (+inputParameters[`element-5`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-6`]?.["flex-basis"] || 0) * (+inputParameters[`element-6`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-7`]?.["flex-basis"] || 0) * (+inputParameters[`element-7`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-8`]?.["flex-basis"] || 0) * (+inputParameters[`element-8`]?.["flex-shrink"] || 0))
		+ ((+inputParameters[`element-9`]?.["flex-basis"] || 0) * (+inputParameters[`element-9`]?.["flex-shrink"] || 0)));

	for (let k = 0; k <= idElement; k++) {
		inputParameters[`element-${k}`].nks = (+inputParameters[`element-${k}`]?.["flex-basis"] || 0) * (+inputParameters[`element-${k}`]?.["flex-shrink"] || 0) / inputParameters.spbr;
		inputParameters[`element-${k}`].ir = Math.abs((+inputParameters[`element-${k}`]?.["flex-basis"] || 0)) - Math.abs((+inputParameters[`element-${k}`].nks * +inputParameters.op));
	}

	console.log("Отрицательное пространство: " + inputParameters.op);
	console.log("Сумма произведений базовых размеров: " + inputParameters.spbr);
	console.log("Нормированный коэффициент сжатия 1: " + inputParameters[`element-0`]?.nks);
	console.log("Нормированный коэффициент сжатия 2: " + inputParameters[`element-1`]?.nks);
	console.log("Нормированный коэффициент сжатия 3: " + inputParameters[`element-2`]?.nks);
	console.log("Нормированный коэффициент сжатия 4: " + inputParameters[`element-3`]?.nks);
	console.log("Нормированный коэффициент сжатия 5: " + inputParameters[`element-4`]?.nks);
	console.log("Нормированный коэффициент сжатия 6: " + inputParameters[`element-5`]?.nks);
	console.log("Нормированный коэффициент сжатия 7: " + inputParameters[`element-6`]?.nks);
	console.log("Нормированный коэффициент сжатия 8: " + inputParameters[`element-7`]?.nks);
	console.log("Нормированный коэффициент сжатия 9: " + inputParameters[`element-8`]?.nks);
	console.log("Нормированный коэффициент сжатия 10: " + inputParameters[`element-9`]?.nks);
	console.log("Итоговый размер 1: " + inputParameters[`element-0`]?.ir);
	console.log("Итоговый размер 2: " + inputParameters[`element-1`]?.ir);
	console.log("Итоговый размер 3: " + inputParameters[`element-2`]?.ir);
	console.log("Итоговый размер 4: " + inputParameters[`element-3`]?.ir);
	console.log("Итоговый размер 5: " + inputParameters[`element-4`]?.ir);
	console.log("Итоговый размер 6: " + inputParameters[`element-5`]?.ir);
	console.log("Итоговый размер 7: " + inputParameters[`element-6`]?.ir);
	console.log("Итоговый размер 8: " + inputParameters[`element-7`]?.ir);
	console.log("Итоговый размер 9: " + inputParameters[`element-8`]?.ir);
	console.log("Итоговый размер 10: " + inputParameters[`element-9`]?.ir);


	console.log(inputParameters);
}

// setInterval(function() {
// 	console.log('1');
// }, 1000);