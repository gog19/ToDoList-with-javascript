var elForm = document.querySelector(`.form-list`);

if (elForm) {
  var elFormInput = elForm.querySelector(`.form-list__input`);
  var elFormCheckbox = elForm.querySelector(`.form-list__checkbox`);
};
let newList = document.querySelector(`.new-list`);
let marked = document.querySelector('.marked');
let newArray = JSON.parse(localStorage.getItem('todo')) || [];
let elementTemplate = document.querySelector('.new-element-template').content;

elForm.addEventListener(`submit`, insideFormEvt);


function insideFormEvt(evt) {
  evt.preventDefault();

  checkInitialInfo(newArray);
  showTodo(newArray);

  elFormInput.value = '';
  elFormInput.focus();
  elFormCheckbox.checked = false;
}

function checkInitialInfo(data) {
  if (data.includes(elFormInput.value)) {
    alert(`You wrote this recently.`);
    elFormInput.value = ``;
    return;
  } else {
    if (elFormCheckbox.checked) {
      data.unshift(elFormInput.value);
    } else {
      data.push(elFormInput.value);
    }
    localStorage.setItem('todo', JSON.stringify(newArray));
  }
}

function showTodo(data) {
  let elementFragment = document.createDocumentFragment();
  newList.innerHTML = '';
  data.forEach((list, index) => {
    var cloneTemplate = elementTemplate.cloneNode(true);
    cloneTemplate.querySelector('.new-element-text').textContent = list;
    cloneTemplate.querySelector('.removed').dataset.id = index;
    elementFragment.appendChild(cloneTemplate);
  });
  newList.appendChild(elementFragment);
}

showTodo(newArray);

// Delete Function
newList.addEventListener('click', listItemChecking);

function listItemChecking(evt) {
  if (evt.target.matches('.delete')) {
    newArray.splice(evt.target.dataset.id, 1);
    showTodo(newArray);
    localStorage.setItem('todo', JSON.stringify(newArray));
  }
}
