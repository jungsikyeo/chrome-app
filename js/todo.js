const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  divPending = document.querySelector(".div-pending"),
  divFinished = document.querySelector(".div-finished");
const PENDING_LS = "PENDING";
const FINISH_LS = "FINISHED";
let pending = [];
let finish = [];

function deleteFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  divFinished.removeChild(li);
  finish = finish.filter(function (finish) {
    return parseInt(finish.id) !== parseInt(li.id);
  });
  saveFinishs();
}

function movePending(event) {
  const id = event.target.parentNode.id;
  const text = event.target.parentNode.childNodes[2].innerText;
  paintPending(parseInt(id), text);
  deleteFinish(event);
}

function moveFinish(event) {
  const id = event.target.parentNode.id;
  const text = event.target.parentNode.childNodes[2].innerText;
  paintFinish(id, text);
  deletePending(event);
}

function saveFinishs() {
  localStorage.setItem(FINISH_LS, JSON.stringify(finish));
}

function paintFinish(id, text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.addEventListener("click", deleteFinish);
  backBtn.addEventListener("click", movePending);
  delBtn.classList.add("btn");
  backBtn.classList.add("btn");
  delBtn.innerText = "❌";
  backBtn.innerText = "⏪";
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.appendChild(span);
  li.id = parseInt(id);
  divFinished.appendChild(li);
  const finishObj = {
    id: parseInt(id),
    text: text,
  };
  finish.push(finishObj);
  saveFinishs();
}

function loadFinishs() {
  const loadedFinishs = localStorage.getItem(FINISH_LS);
  if (loadedFinishs !== null) {
    const parsedFinishs = JSON.parse(loadedFinishs);
    parsedFinishs.forEach(function (finish) {
      paintFinish(parseInt(finish.id), finish.text);
    });
  }
}

function deletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  divPending.removeChild(li);
  const cleanPendings = pending.filter(function (pending) {
    return parseInt(pending.id) !== parseInt(li.id);
  });
  pending = cleanPendings;
  savePendings();
}

function savePendings() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
}

function paintPending(id, text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.addEventListener("click", deletePending);
  finishBtn.addEventListener("click", moveFinish);
  delBtn.classList.add("btn");
  finishBtn.classList.add("btn");
  delBtn.innerText = "❌";
  finishBtn.innerText = "✅";
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(finishBtn);
  li.appendChild(span);
  li.id = parseInt(id);
  divPending.appendChild(li);
  const pendingObj = {
    id: parseInt(id),
    text: text,
  };
  pending.push(pendingObj);
  savePendings();
}

function handleSubmit(event) {
  event.preventDefault();
  const newId = pending.length + 1;
  const currentValue = toDoInput.value;
  paintPending(newId, currentValue);
  toDoInput.value = "";
}

function loadPendings() {
  const loadedPendings = localStorage.getItem(PENDING_LS);
  if (loadedPendings !== null) {
    const parsedPendings = JSON.parse(loadedPendings);
    parsedPendings.forEach(function (pending) {
      paintPending(pending.id, pending.text);
    });
  }
}

function init() {
  loadPendings();
  loadFinishs();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
