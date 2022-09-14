"use script"

let elements = document.querySelector('.elements');
const buttonAdd = document.querySelector('.add');
let resizeBox = document.querySelector('.preview-border');
let preview = document.querySelector('.preview-box');
let horizontalArrow = document.querySelectorAll('.horizontal-arrow');
let verticalArrow = document.querySelectorAll('.vertical-arrow');
let boxParameters = document.querySelectorAll('.oninput');
let cssStyles = document.querySelector('.css-styles');
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
	parameters: {}
};

let hasMinWidth = key => {
	if (key === "width" && inputParameters.parent[key] < 300) {
		return 300;
	} else {
		return inputParameters.parent[key];
	}
};

let hasPx = key => {
	if (key === "width" || key === "height" || key === "gap" || key === "flex-basis") {
		return "px";
	} else {
		return "";
	}
};

function resizeWindow() {

	pageWidth = window.innerWidth - 710;
	boxParameters[0].value = pageWidth;
	boxParameters[0].setAttribute("placeholder", `300-${pageWidth}px`);
	inputParameters.parent.width = pageWidth;
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
									 <label for="flex-grow-${idElement}" class="element label-title">flex-grow</label>
									 <input type="number" class="number flex-grow element element-${idElement} oninput input-child" id="flex-grow-${idElement}" placeholder="0-10">
									 <label for="flex-shrink-${idElement}" class="label-title element">flex-shrink</label>
									 <input type="number" class="number flex-shrink element element-${idElement} oninput input-child" id="flex-shrink-${idElement}" placeholder="0-10">
									 <label for="flex-basis-${idElement}" class="label-title element">flex-basis</label>
									 <input type="number" class="number flex-basis element element-${idElement} oninput input-child" id="flex-basis-${idElement}"placeholder="0-${pageWidth}px">
									 <label for="align-self-${idElement}" class="label-title element">align-self</label>
									 <select name="align-self" id="align-self-${idElement}" class="select element element-${idElement} oninput input-child">
									 	 <option value="auto" selected>auto</option>
									 	 <option value="flex-start">flex-start</option>
									 	 <option value="flex-end">flex-end</option>
									 	 <option value="center">center</option>
										 <option value="baseline">baseline</option>
										 <option value="stretch">stretch</option>
								 	 </select>
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
			"align-self": "auto",
		};
		idElement++;

		if (idElement > 1) {
			updateItems();
			showPreview();
			showCssCode();
			calcFinalSizeSrink();
			calcFinalSizeGrow();
		}

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
	setTimeout(showCssCode, 1000);
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

					if (boxPatameter.value > pageWidth ||
						((boxPatameter.getAttribute('id').slice(0, -2) === "flex-grow" || boxPatameter.getAttribute('id').slice(0, -2) === "flex-shrink") && boxPatameter.value > 10)) {
						boxPatameter.value = boxPatameter.value.slice(0, -1);
					} else if (boxPatameter.value < 0) {
						boxPatameter.value = 0;
					} else {
						inputParameters[`element-${i}`][boxPatameter.getAttribute('id').slice(0, -2)] = (isNaN(+boxPatameter.value)) ? boxPatameter.value : +boxPatameter.value;
					}
					break;

				}
			}

			if (boxPatameter.classList.contains("input-parent")) {

				if (boxPatameter.value > pageWidth || (boxPatameter.getAttribute('id') === "gap" && boxPatameter.value > 100)) {
					boxPatameter.value = boxPatameter.value.slice(0, -1);
				} else if (boxPatameter.value < 0) {
					boxPatameter.value = 0;
				} else {
					inputParameters.parent[boxPatameter.getAttribute('id')] = (isNaN(+boxPatameter.value)) ? boxPatameter.value : +boxPatameter.value;
				}

				showArrows(boxPatameter);

			}

			calcFinalSizeSrink();
			calcFinalSizeGrow();
			showWidthBox();
			showPreview();
			setTimeout(showCssCode, 1000);

		}
	}
}

function showArrows(boxPatameter) {

	switch (boxPatameter.value) {
		case "row":
			for (let i = 0; i < 2; i++) {
				horizontalArrow[i].classList.remove("row-reverse");
				verticalArrow[i].classList.remove("column-reverse");
				horizontalArrow[i].classList.add("main-coord");
				horizontalArrow[i].classList.remove("cross-coord");
				verticalArrow[i].classList.remove("main-coord");
				verticalArrow[i].classList.add("cross-coord");
				horizontalArrow[i].innerHTML = "<div class='arrow-title'>главная ось</div>";
				verticalArrow[i].innerHTML = "<div class='arrow-title'>поперечная ось</div>";
			}
			break;
		case "row-reverse":
			for (let i = 0; i < 2; i++) {
				horizontalArrow[i].classList.add("row-reverse");
				verticalArrow[i].classList.remove("column-reverse");
				horizontalArrow[i].classList.remove("cross-coord");
				horizontalArrow[i].classList.add("main-coord");
				verticalArrow[i].classList.remove("main-coord");
				verticalArrow[i].classList.add("cross-coord");
				horizontalArrow[i].innerHTML = "<div class='arrow-title'>главная ось</div>";
				verticalArrow[i].innerHTML = "<div class='arrow-title'>поперечная ось</div>";
			}
			break;
		case "column":
			for (let i = 0; i < 2; i++) {
				horizontalArrow[i].classList.remove("row-reverse");
				verticalArrow[i].classList.remove("column-reverse");
				horizontalArrow[i].classList.remove("main-coord");
				horizontalArrow[i].classList.add("cross-coord");
				verticalArrow[i].classList.remove("cross-coord");
				verticalArrow[i].classList.add("main-coord");
				horizontalArrow[i].innerHTML = "<div class='arrow-title'>поперечная ось</div>";
				verticalArrow[i].innerHTML = "<div class='arrow-title'>главная ось</div>";
			}
			break;
		case "column-reverse":
			for (let i = 0; i < 2; i++) {
				horizontalArrow[i].classList.remove("column-reverse");
				verticalArrow[i].classList.add("column-reverse");
				horizontalArrow[i].classList.remove("main-coord");
				horizontalArrow[i].classList.add("cross-coord");
				verticalArrow[i].classList.remove("cross-coord");
				verticalArrow[i].classList.add("main-coord");
				horizontalArrow[i].innerHTML = "<div class='arrow-title'>поперечная ось</div>";
				verticalArrow[i].innerHTML = "<div class='arrow-title'>главная ось</div>";
			}
			break;
	}
}

function calcFinalSizeSrink() {

	inputParameters.parameters.op = 0;		// op (оставшееся пространство)
	inputParameters.parameters.gsfs = 0;	// gsfs (cумма всех flex-shrink, деленная на gap)
	inputParameters.parameters.spbr = 0;	// spbr (сумма произведений базовых размеров)

	for (let index = 0; index < idElement; index++) {

		// op (оставшееся пространство) = ширина контейнера - (flex-basis-1 + flex-basis-2 + ... + flex-basis-n))
		inputParameters.parameters.op += (inputParameters[`element-${index}`]["flex-basis"] || 0);

		// gsfs (cумма всех flex-shrink, деленная на gap) = gap / (flex-shrink-1 + ... flex-shrink-n)
		inputParameters.parameters.gsfs += (inputParameters[`element-${index}`]["flex-shrink"] || 0);

	}

	// gsfs (cумма всех flex-shrink, деленная на gap) = gap * (кол-во элементов - 1) / sum(flex-shrink-n)
	inputParameters.parameters.gsfs = inputParameters.parent.gap * (idElement - 1) / inputParameters.parameters.gsfs;

	// op (оставшееся пространство) = ширина контейнера - (flex-basis-1 + flex-basis-2 + ... + flex-basis-n))
	inputParameters.parameters.op = +inputParameters.parent.width - inputParameters.parameters.op;

	for (let index = 0; index < idElement; index++) {

		// spbr (сумма произведений базовых размеров) = ((flex-basis-1 + gsfs) * flex-shrink-1) + ... + ((flex-basis-n + gsfs) * flex-shrink-n)
		inputParameters.parameters.spbr += ((inputParameters[`element-${index}`]["flex-basis"] || 0) + inputParameters.parameters.gsfs) * (inputParameters[`element-${index}`]["flex-shrink"] || 0);

	}

	for (let index = 0; index < idElement; index++) {

		// nks (нормированный коэффициент сжатия элемента) = (flex-basis + gsfs * flex-shrink) * flex-shrink / spbr (сумма произведений базовых размеров)
		inputParameters[`element-${index}`].nks = ((inputParameters[`element-${index}`]["flex-basis"] || 0) + inputParameters.parameters.gsfs * (inputParameters[`element-${index}`]["flex-shrink"] || 0)) * (inputParameters[`element-${index}`]["flex-shrink"] || 0) / inputParameters.parameters.spbr;

		// irs (итоговый размер после сжатия элемента) = (flex-basis - gsfs * flex-shrink) / кол-во элементов) - nks (нормированный коэффициент сжатия элемента) * op (оставшееся пространство)
		inputParameters[`element-${index}`].irs = (inputParameters[`element-${index}`]["flex-basis"] || 0) - (inputParameters.parameters.gsfs * (inputParameters[`element-${index}`]["flex-shrink"] || 0)) - Math.abs((inputParameters[`element-${index}`].nks * inputParameters.parameters.op));

	}
}

function calcFinalSizeGrow() {

	inputParameters.parameters.dsm = 0;		// dsm (доля свободного места)
	inputParameters.parameters.gsfg = 0;	// gsfg (cумма всех flex-grow, деленная на gap)

	for (let index = 0; index < idElement; index++) {

		// dsm (доля свободного места) = op (оставшееся пространство) / (flex-grow-1 + flex-grow-2 + ... + flex-grow-n)
		inputParameters.parameters.dsm += (inputParameters[`element-${index}`]["flex-grow"] || 0);

	}

	// gsfg (cумма всех flex-grow, деленная на gap) = gap / sum(flex-grow-n)
	inputParameters.parameters.gsfg = (inputParameters.parameters.dsm === 0) ? NaN : +inputParameters.parent.gap * (idElement - 1) / inputParameters.parameters.dsm;

	inputParameters.parameters.dsm = (inputParameters.parameters.dsm === 0) ? NaN : Math.abs(inputParameters.parameters.op) / inputParameters.parameters.dsm;

	for (let k = 0; k < idElement; k++) {

		// irr (итоговый размер расширения элемента) = (flex-basis - gsfs * flex-grow) + dsm (доля свободного места) * flex-grow
		inputParameters[`element-${k}`].irr = (inputParameters[`element-${k}`]["flex-basis"] || 0) - (inputParameters.parameters.gsfg * (inputParameters[`element-${k}`]["flex-grow"] || 0)) + inputParameters.parameters.dsm * (inputParameters[`element-${k}`]["flex-grow"] || 0);
	}

	showIrsIrr();

}

function showIrsIrr() {

	if (isNaN(inputParameters.parameters.op) || inputParameters.parameters.op > pageWidth || inputParameters.parameters.op < -pageWidth || inputParameters.parameters.op === +inputParameters.parent.width) {
		op.style.color = "#CC0000";
		if (inputParameters.parameters.op > pageWidth) {
			op.textContent = "MAX";
		} else if (inputParameters.parameters.op < -pageWidth) {
			op.textContent = "MIN";
		} else if (inputParameters.parameters.op === +inputParameters.parent.width) {
			op.textContent = "W=OP";
		} else {
			op.textContent = "NOT";
		}
	} else {
		op.style.color = null;
		op.textContent = `${inputParameters.parameters.op}px`;
	}

	if (isNaN(inputParameters.parameters.dsm) || inputParameters.parameters.dsm > pageWidth || inputParameters.parameters.dsm < 0) {
		dsm.style.color = "#CC0000";
		if (inputParameters.parameters.dsm > pageWidth) {
			dsm.textContent = "MAX";
		} else if (inputParameters.parameters.dsm < 0) {
			dsm.textContent = "MIN";
		} else {
			dsm.textContent = "NOT";
		}
	} else {
		dsm.style.color = null;
		dsm.textContent = `${Math.round(inputParameters.parameters.dsm)}px`;
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

	preview.style.cssText = `display: flex; ${sortCssText()}`;

	function sortCssText() {
		let css = "";
		for (const key in inputParameters.parent) {
			css += `${key}: ${inputParameters.parent[key]}${hasPx(key)}; `;
		}
		return css;
	}
}

function showPreview() {

	let hasFlexBasis = index => {

		if (inputParameters[`element-${index}`]["flex-basis"] !== 0) {

			return `flex-basis: ${inputParameters[`element-${index}`]["flex-basis"]}px;`;

		}
	}

	preview.innerHTML = "";

	for (let index = 0; index < idElement; index++) {

		let flexElement = document.createElement('li');
		flexElement.classList.add("flexbox-item");
		flexElement.style.cssText = `align-self: ${inputParameters[`element-${index}`]["align-self"]};
											  flex-grow: ${inputParameters[`element-${index}`]["flex-grow"]};
											  flex-shrink: ${inputParameters[`element-${index}`]["flex-shrink"]};
											  ${hasFlexBasis(index)}`;
		preview.append(flexElement);

	}
}

function showCssCode() {

	cssStyles.innerHTML = "";

	cssStyles.innerHTML = ".parent {<br/>";

	for (let key in inputParameters.parent) {

		if (key === "gap" && inputParameters.parent[key] === 0
			|| key === "flex-direction" && inputParameters.parent[key] === "row"
			|| key === "flex-wrap" && inputParameters.parent[key] === "nowrap"
			|| key === "justify-content" && inputParameters.parent[key] === "flex-start"
			|| key === "align-items" && inputParameters.parent[key] === "stretch"
			|| key === "align-content" && inputParameters.parent[key] === "stretch") continue;

		cssStyles.innerHTML += `  ${key}: ${hasMinWidth(key)}${hasPx(key)};<br/>`;

	}

	cssStyles.innerHTML += "}<br/><br/>";

	for (let j = 0; j < idElement; j++) {

		if (inputParameters[`element-${j}`]["flex-grow"] === 0
			&& inputParameters[`element-${j}`]["flex-shrink"] === 0
			&& inputParameters[`element-${j}`]["flex-basis"] === 0
			&& inputParameters[`element-${j}`]["align-self"] === "auto") continue;

		cssStyles.innerHTML += `.element-${j + 1} {<br/>`;

		for (let key in inputParameters[`element-${j}`]) {
			if (key === "nks" || key === "irs" || key === "irr"
				|| inputParameters[`element-${j}`][key] === 0
				|| inputParameters[`element-${j}`][key] === "auto") continue;

			cssStyles.innerHTML += `  ${key}: ${inputParameters[`element-${j}`][key]}${hasPx(key)};<br/>`;
		}

		cssStyles.innerHTML += "}<br/><br/>";

	}
}