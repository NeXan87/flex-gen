"use script"

let elements = document.querySelector('.elements');
let buttonAdd = document.querySelector('.add');
let boxParameters, nks, dsm, irr, irs, idElement = 0;

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

		let fieldset = document.createElement('fieldset');
		fieldset.classList.add('flex', 'item');
		fieldset.innerHTML = `<div class="button-background" onclick="removeElement(this)">
									 	 <button type="button" class="button-element remove"></button>
									 </div>
									 <legend>Элемент ${idElement + 1}</legend>
									 <label for="flex-grow-element-${idElement}" class="element label-title">flex-grow</label>
									 <input type="number" class="number flex-grow element element-${idElement} oninput input-child" id="flex-grow-${idElement}" placeholder="0-10">
									 <label for="flex-shrink-element-${idElement}" class="label-title element">flex-shrink</label>
									 <input type="number" class="number flex-shrink element element-${idElement} oninput input-child" id="flex-shrink-${idElement}" placeholder="0-10">
									 <label for="flex-basis-element-${idElement}" class="label-title element">flex-basis</label>
									 <input type="number" class="number flex-basis element element-${idElement} oninput input-child" id="flex-basis-${idElement}"placeholder="0-1000px">
									 <div class="result-box">
										 <div class="result-item">НКС<output name="result" class="nks result-${idElement}">NaN</output></div>
										 <div class="result-item">ИРС<output name="result" class="irs result-${idElement}">NaN</output></div>

										 <div class="result-item">ИРР<output name="result" class="irr result-${idElement}">NaN</output></div>
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

	delete inputParameters[`element-${idElement - 1}`];
	console.log(`element-${idElement}`);
	elements.removeChild(input.parentNode);
	buttonAdd.removeAttribute("disabled", "");
	idElement--;
	calcFinalSizeSrink();
	calcFinalSizeGrow();
	updateItems();

}

function updateItems() {

	boxParameters = document.querySelectorAll('.oninput');
	nks = document.querySelectorAll('.nks');		// nks (нормированный коэффициент сжатия элемента)
	dsm = document.querySelector('.dsm');			// dsm (доля свободного места)
	irr = document.querySelectorAll('.irr');		// irr (итоговый размер расширения элемента)
	irs = document.querySelectorAll('.irs');		// irs (итоговый размер после сжатия элемента)
	addToInputParameters();

}

function addToInputParameters() {

	for (let boxPatameter of boxParameters) {

		boxPatameter.oninput = function () {

			for (let i = 0; i <= idElement; i++) {

				if (+boxPatameter.getAttribute('id').slice(-1) === i) {

					if (boxPatameter.classList.contains("flex-basis") && boxPatameter.value > 1000) {
						boxPatameter.value = boxPatameter.value.slice(0, -1);
					} else if ((boxPatameter.classList.contains("flex-grow") || boxPatameter.classList.contains("flex-shrink")) && boxPatameter.value > 10) {
						boxPatameter.value = boxPatameter.value.slice(0, -1);
					} else {
						inputParameters[`element-${i}`][boxPatameter.getAttribute('id').slice(0, -2)] = +boxPatameter.value;
						break;
					}
					break;

				} else if (boxPatameter.classList.contains("input-parent") && !boxPatameter.classList.contains("width")) {

					inputParameters.parent[boxPatameter.getAttribute('id')] = boxPatameter.value;
					break;

				} else if (boxPatameter.classList.contains("width")) {

					if (boxPatameter.value > 1000) {
						boxPatameter.value = boxPatameter.value.slice(0, -1);
					} else {
						inputParameters.parent[boxPatameter.getAttribute('id')] = +boxPatameter.value;
						break;
					}

				}

			}

			calcFinalSizeSrink();
			calcFinalSizeGrow();

		}
	}
}

function calcFinalSizeSrink() {

	// op (оставшееся пространство) = ширина контейнера - (flex-basis-1 + flex-basis-2 + ... + flex-basis-n))
	inputParameters.op = inputParameters.parent.width
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
	console.log(inputParameters);
	showIrsIrr();

	// console.log("Отрицательное пространство: " + inputParameters.op);
	// console.log("Сумма произведений базовых размеров: " + inputParameters.spbr);
	// for (let index = 0; index < idElement; index++) {
	// 	console.log(`Доля свободного места ${index + 1}: ${inputParameters.dsm}`);
	// 	console.log(`Нормированный коэффициент сжатия ${index + 1}: ${inputParameters[`element-${index}`]?.nks}`);
	// 	console.log(`Итоговый размер после растяжения ${index + 1}: ${inputParameters[`element-${index}`]?.irr}`);
	// 	console.log(`Итоговый размер после сжатия ${index + 1}: ${inputParameters[`element-${index}`]?.irs}`);
	// }
	// console.log(inputParameters);
}

function showIrsIrr() {

	dsm.textContent = Math.floor(inputParameters.dsm * 10) / 10;

	if (dsm.textContent === "NaN" || dsm.textContent === Infinity || dsm.textContent > 1000 || dsm.textContent < 0) {
		dsm.style.color = "#CC0000";
		if (inputParameters.dsm === Infinity) {
			dsm.textContent = "NOT";
		} else if (dsm.textContent > 1000) {
			dsm.textContent = "MAX";
		} else if (dsm.textContent < 0) {
			dsm.textContent = "MIN";
		} else {
			dsm.textContent = "NOT";
		}
	} else {
		dsm.style.color = null;
	}

	for (let index = 0; index < idElement; index++) {

		nks[index].textContent = Math.floor(inputParameters[`element-${index}`]?.nks * 10) / 10;
		irs[index].textContent = `${Math.round(inputParameters[`element-${index}`]?.irs)}px`;
		irr[index].textContent = `${Math.round(inputParameters[`element-${index}`]?.irr)}px`;

		if (nks[index].textContent === "NaN") {
			nks[index].style.color = "#CC0000";
			nks[index].textContent = "NOT";
		} else {
			nks[index].style.color = null;
		}

		if (irs[index].textContent === "NaNpx" || irs[index].textContent > 1000 || irs[index].textContent < 0) {
			irs[index].style.color = "#CC0000";
			if (irs[index].textContent > 1000) {
				irs[index].textContent = "MAX";
			} else if (irs[index].textContent < 0) {
				irs[index].textContent = "MIN";
			} else {
				irs[index].textContent = "NOT";
			}
		} else {
			irs[index].style.color = null;
		}

		if (irr[index].textContent === "NaNpx" || irr[index].textContent > 1000 || irr[index].textContent < 0) {
			irr[index].style.color = "#CC0000";
			if (irr[index].textContent > 1000) {
				irr[index].textContent = "MAX";
			} else if (irr[index].textContent < 0) {
				irr[index].textContent = "MIN";
			} else {
				irr[index].textContent = "NOT";
			}
		} else {
			irr[index].style.color = null;
		}

	}
}