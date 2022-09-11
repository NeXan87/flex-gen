"use script"

let elements = document.querySelector('.elements');
const buttonAdd = document.querySelector('.add');
let resizeBox = document.querySelector('.preview-border');
let preview = document.querySelector('.preview-box');
let boxParameters = document.querySelectorAll('.oninput');
let pageWidth, pageHeight, op, nks, dsm, irr, irs, idElement = 0;

const inputParameters = {
	parent: {
		"width": document.querySelector("#width").value,
		"gap": 0,
		"flex-direction": document.querySelector("#flex-direction").value,
		"flex-wrap": document.querySelector("#flex-wrap").value,
		"justify-content": document.querySelector("#justify-content").value,
		"align-items": document.querySelector("#align-items").value,
		"align-content": document.querySelector("#align-content").value,
	},
};

function resizeWindow() {

	pageWidth = window.innerWidth - 670;
	pageHeight = window.innerHeight - 280;
	boxParameters[0].value = pageWidth;
	boxParameters[0].setAttribute("placeholder", `300-${pageWidth}px`);
	inputParameters.parent.width = pageWidth;
	resizeBox.style.cssText = `max-height: ${pageHeight}px`;
	showWidthBox();

}

resizeWindow();
window.addEventListener('resize', resizeWindow, false);

for (let i = 0; i < 2; i++) {
	addElement();
}

function addElement() {

	if (idElement < 11) {

		let fieldset = document.createElement('fieldset');
		fieldset.classList.add('flex', 'item');
		fieldset.innerHTML = `<div class="button-background" onclick="removeElement(this)">
									 	 <button type="button" class="button-element remove"></button>
									 </div>
									 <legend>Элемент ${idElement + 1}</legend>
									 <label for="flex-grow-element-${idElement}" class="element label-title">flex-grow</label>
									 <input type="number" class="number flex-grow element element-${idElement} oninput input-child" id="flex-grow-${idElement}" placeholder="0-${pageWidth}">
									 <label for="flex-shrink-element-${idElement}" class="label-title element">flex-shrink</label>
									 <input type="number" class="number flex-shrink element element-${idElement} oninput input-child" id="flex-shrink-${idElement}" placeholder="0-${pageWidth}">
									 <label for="flex-basis-element-${idElement}" class="label-title element">flex-basis</label>
									 <input type="number" class="number flex-basis element element-${idElement} oninput input-child" id="flex-basis-${idElement}"placeholder="0-${pageWidth}px">
									 <div class="result-box">
										 <div class="result-item">НКС<output name="result" class="nks result-${idElement}"></output></div>
										 <div class="result-item">ИРС<output name="result" class="irs result-${idElement}"></output></div>

										 <div class="result-item">ИРР<output name="result" class="irr result-${idElement}"></output></div>
									 </div>`;
		elements.appendChild(fieldset);
		inputParameters[`element-${idElement}`] = {
			"flex-grow": 0,
			"flex-shrink": 0,
			"flex-basis": 0,
		};
		idElement++;
		updateItems();
		showPreview();
		calcFinalSizeSrink();
		calcFinalSizeGrow();
	}
	if (idElement === 10) {
		buttonAdd.setAttribute("disabled", "");
	}
}

function removeElement(input) {

	delete inputParameters[`element-${idElement - 1}`];
	elements.removeChild(input.parentNode);
	buttonAdd.removeAttribute("disabled", "");
	idElement--;
	showPreview();
	calcFinalSizeSrink();
	calcFinalSizeGrow();
	updateItems();

}

function updateItems() {

	boxParameters = document.querySelectorAll('.oninput');
	op = document.querySelector('.op');			// op (оставшееся пространство)
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

					if (boxPatameter.value > pageWidth) {
						boxPatameter.value = boxPatameter.value.slice(0, -1);
					} else if (boxPatameter.value < 0) {
						boxPatameter.value = 0;
					} else {
						inputParameters[`element-${i}`][boxPatameter.getAttribute('id').slice(0, -2)] = +boxPatameter.value;
					}
					break;

				}
			}

			if (boxPatameter.classList.contains("input-parent")) {

				if (boxPatameter.value > pageWidth) {
					boxPatameter.value = boxPatameter.value.slice(0, -1);
				} else if (boxPatameter.value < 0) {
					boxPatameter.value = 0;
				} else {
					inputParameters.parent[boxPatameter.getAttribute('id')] = boxPatameter.value;
				}
			}

			calcFinalSizeSrink();
			calcFinalSizeGrow();
			showWidthBox();
			showPreview();

		}
	}
}

function calcFinalSizeSrink() {

	inputParameters.op = 0;
	inputParameters.spbr = 0;

	for (let index = 0; index < idElement; index++) {

		// op (оставшееся пространство) = ширина контейнера - (flex-basis-1 + flex-basis-2 + ... + flex-basis-n))
		inputParameters.op += (inputParameters[`element-${index}`]["flex-basis"] || 0);

	}

	inputParameters.op = +inputParameters.parent.width - inputParameters.op;

	for (let index = 0; index < idElement; index++) {

		// spbr (сумма произведений базовых размеров) = (flex-basis-1 * flex-shrink-1) + ... + (flex-basis-n * flex-shrink-n)
		inputParameters.spbr += ((inputParameters[`element-${index}`]["flex-basis"] || 0) - ((+inputParameters.parent.gap || 0) * (idElement - 1) / idElement)) * (inputParameters[`element-${index}`]["flex-shrink"] || 0)

	}

	for (let index = 0; index < idElement; index++) {

		// nks (нормированный коэффициент сжатия элемента) = flex-basis * flex-shrink / spbr (сумма произведений базовых размеров)
		inputParameters[`element-${index}`].nks = ((inputParameters[`element-${index}`]["flex-basis"] || 0) - ((+inputParameters.parent.gap || 0) * (idElement - 1) / idElement)) * (inputParameters[`element-${index}`]["flex-shrink"] || 0) / inputParameters.spbr;

		// irs (итоговый размер после сжатия элемента) = flex-basis - nks (нормированный коэффициент сжатия элемента) * op (оставшееся пространство) * op (оставшееся пространство)
		inputParameters[`element-${index}`].irs = ((inputParameters[`element-${index}`]["flex-basis"] || 0) - Math.abs((inputParameters[`element-${index}`].nks * inputParameters.op))) - ((+inputParameters.parent.gap || 0) * (idElement - 1) / idElement);

	}
}

function calcFinalSizeGrow() {

	inputParameters.dsm = 0;

	for (let index = 0; index < idElement; index++) {

		// dsm (доля свободного места) = op (оставшееся пространство) / (flex-grow-1 + flex-grow-2 + ... + flex-grow-n)
		inputParameters.dsm += (inputParameters[`element-${index}`]["flex-grow"] || 0);

	}

	inputParameters.dsm = (inputParameters.dsm === 0) ? NaN : Math.abs(inputParameters.op) / inputParameters.dsm;

	for (let k = 0; k < idElement; k++) {

		// irr (итоговый размер расширения элемента) = flex-basis + dsm (доля свободного места) * flex-grow
		inputParameters[`element-${k}`].irr = (inputParameters[`element-${k}`]["flex-basis"] || 0) + inputParameters.dsm * (inputParameters[`element-${k}`]["flex-grow"] || 0);
	}

	showIrsIrr();

}

function showIrsIrr() {

	if (isNaN(inputParameters.op) || inputParameters.op > pageWidth || inputParameters.op < -pageWidth || inputParameters.op === +inputParameters.parent.width) {
		op.style.color = "#CC0000";
		if (inputParameters.op > pageWidth) {
			op.textContent = "MAX";
		} else if (inputParameters.op < -pageWidth) {
			op.textContent = "MIN";
		} else if (inputParameters.op === +inputParameters.parent.width) {
			op.textContent = "W=OP";
		} else {
			op.textContent = "NOT";
		}
	} else {
		op.style.color = null;
		op.textContent = `${inputParameters.op}px`;
	}

	if (isNaN(inputParameters.dsm) || inputParameters.dsm > pageWidth || inputParameters.dsm < 0) {
		dsm.style.color = "#CC0000";
		if (inputParameters.dsm > pageWidth) {
			dsm.textContent = "MAX";
		} else if (inputParameters.dsm < 0) {
			dsm.textContent = "MIN";
		} else {
			dsm.textContent = "NOT";
		}
	} else {
		dsm.style.color = null;
		dsm.textContent = `${Math.round(inputParameters.dsm)}px`;
	}

	for (let index = 0; index < idElement; index++) {

		if (isNaN(inputParameters[`element-${index}`]?.nks) || inputParameters[`element-${index}`]?.nks < 0) {
			nks[index].style.color = "#CC0000";
			if (inputParameters[`element-${index}`]?.nks < 0) {
				nks[index].textContent = "MIN";
			} else {
				nks[index].textContent = "NOT";
			}
		} else {
			nks[index].style.color = null;
			nks[index].textContent = Math.floor(inputParameters[`element-${index}`]?.nks * 10) / 10;
		}

		if (isNaN(inputParameters[`element-${index}`]?.irs) || inputParameters[`element-${index}`]?.irs > pageWidth || inputParameters[`element-${index}`]?.irs < 0) {
			irs[index].style.color = "#CC0000";
			if (inputParameters[`element-${index}`]?.irs > pageWidth) {
				irs[index].textContent = "MAX";
			} else if (inputParameters[`element-${index}`]?.irs < 0) {
				irs[index].textContent = "MIN";
			} else {
				irs[index].textContent = "NOT";
			}
		} else {
			irs[index].style.color = null;
			irs[index].textContent = `${Math.round(inputParameters[`element-${index}`]?.irs)}px`;
		}

		if (isNaN(inputParameters[`element-${index}`]?.irr) || inputParameters[`element-${index}`]?.irr > pageWidth || inputParameters[`element-${index}`]?.irr < 0) {
			irr[index].style.color = "#CC0000";
			if (inputParameters[`element-${index}`]?.irr > pageWidth) {
				irr[index].textContent = "MAX";
			} else if (inputParameters[`element-${index}`]?.irr < 0) {
				irr[index].textContent = "MIN";
			} else {
				irr[index].textContent = "NOT";
			}
		} else {
			irr[index].style.color = null;
			irr[index].textContent = `${Math.round(inputParameters[`element-${index}`]?.irr)}px`;
		}

	}
}

function showWidthBox() {

	let hasFlexWrap = () => {
		if (inputParameters.parent["flex-wrap"] === "wrap" && inputParameters.parent["flex-direction"] === "column") {
			return pageHeight - 10;
		} else {
			return "auto";
		}
	};

	preview.style.cssText = `width: ${inputParameters.parent.width}px;
									 height: ${hasFlexWrap()}px;
									 display: flex;
									 gap: ${inputParameters.parent.gap}px;
									 flex-direction: ${inputParameters.parent["flex-direction"]};
									 flex-wrap: ${inputParameters.parent["flex-wrap"]};
									 justify-content: ${inputParameters.parent["justify-content"]};
									 align-items: ${inputParameters.parent["align-items"]};
									 align-content: ${inputParameters.parent["align-content"]};`;

}

function showPreview() {

	preview.innerHTML = "";
	for (let index = 0; index < idElement; index++) {

		let flexElement = document.createElement('li');
		flexElement.classList.add("flexbox-item");
		flexElement.style.cssText = `flex-grow: ${inputParameters[`element-${index}`]["flex-grow"]};
											  flex-shrink: ${inputParameters[`element-${index}`]["flex-shrink"]};
											  flex-basis: ${inputParameters[`element-${index}`]["flex-basis"]}px;`;
		preview.append(flexElement);

	}

}