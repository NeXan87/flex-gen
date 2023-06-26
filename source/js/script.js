import './prototypes.js';
import { initMenuButtonActions } from './mobile-menu.js';
import { flexBox } from './flex-objects.js';
import { initAddItemActions } from './add-item.js';
import { updateTimeout } from './update-items.js';

const htmlElement = document.querySelector('html');
const elements = document.querySelector('.elements');
// let boxParameters = document.querySelectorAll('.oninput');
let pageWidth;

function resizeWindow() {
  if (window.innerWidth > 1920) {
    pageWidth = 1210;
  } else if (window.innerWidth > 1240) {
    pageWidth = window.innerWidth - 718;
  } else if (window.innerWidth > 768) {
    pageWidth = window.innerWidth - 410;
    htmlElement.classList.remove('is-open');
  } else {
    pageWidth = window.innerWidth - 80;
  }

  flexBox.parent.width = pageWidth;
  updateTimeout(flexBox);
}

resizeWindow();
initMenuButtonActions();
initAddItemActions();

window.addEventListener('resize', resizeWindow, false);

// function addToFlexBox() {
//   for (const boxPatameter of boxParameters) {
//     boxPatameter.oninput = function () {
//       for (let i = 1; i < idElement; i++) {
//         if (+boxPatameter.getAttribute('id').slice(-1) === i) {

//           if (
//             boxPatameter.value > pageWidth ||
//             ((boxPatameter.name === 'flex-grow' ||
//               boxPatameter.name === 'flex-shrink') &&
//               boxPatameter.value > 10)
//           ) {
//             boxPatameter.value = boxPatameter.value.slice(0, -1);
//           } else if (
//             boxPatameter.value < 0 &&
//             boxPatameter.name !== 'order'
//           ) {
//             boxPatameter.value = 0;
//           } else {
//             flexBox.items[`item-${i}`][
//               boxPatameter.name
//             ] = isNaN(+boxPatameter.value) ? boxPatameter.value : +boxPatameter.value;
//           }
//           break;
//         }
//       }

//       if (boxPatameter.classList.contains('input-parent')) {
//         if (
//           boxPatameter.value > pageWidth ||
//           (boxPatameter.getAttribute('id') === 'gap' && boxPatameter.value > 100)
//         ) {
//           boxPatameter.value = boxPatameter.value.slice(0, -1);
//         } else if (boxPatameter.value < 0) {
//           boxPatameter.value = 0;
//         } else {
//           flexBox.parent[boxPatameter.getAttribute('id')] = isNaN(
//             +boxPatameter.value
//           )
//             ? boxPatameter.value
//             : +boxPatameter.value;
//         }
//       }

//       calcTimeout(flexBox);
//       rerenderTimeout(flexBox, boxPatameter.value);
//     };
//   }
// }
