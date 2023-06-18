const noteContainer=document.querySelector(".note-Container")
const modalContainer=document.querySelector(".modalContainer")
const form=document.querySelector("form")
const titleInput=document.querySelector("#title")
class note{
    constructor(title,body){
    this.title=title;
    this.body=body;
    this.id=Math.random();
    }
}
function getNotes(){
    let notes;
    if(localStorage.getItem("noteApp.notees")==null){
        notes=[];
    }
    else{
        notes=JSON.parse(localStorage.getItem("notesApp.notes"));
    }
    return notes;
}
function addNotesTolocalStorage(note){
    const notes=getNotes;
    notes.push(note);
    localStorage.setItem("noteApp.notes",JSON.stringify(notes));
}
function removeNote(id){
    const notes=getNotes();
    notes.forEach((note,index) => {
        if(note.id===id){
            notes.splice(index,1);
        }
        localStorage.setItem("noteApp.notes",JSON.stringify(notes));
        
    });
}
function addNoteToList(note) {
    const newUINote = document.createElement("div");
    newUINote.classList.add("note");
    newUINote.innerHTML = `
      <span hidden>${note.id}</span>
      <h2 class="note__title">${note.title}</h2>
      <p class="note__body">${note.body}</p>
      <div class="note__btns">
        <button class="note__btn note__view">View Detail</button>
        <button class="note__btn note__delete">Delete Blog</button>
      </div>
    `;
    noteContainer.appendChild(newUINote);
  }
  
  function displayNotes() {
    const notes = getNotes();
    notes.forEach((note) => {
      addNoteToList(note);
    });
  }
  
  function showAlertMessage(message, alertClass) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `message ${alertClass}`;
    alertDiv.appendChild(document.createTextNode(message));
    form.insertAdjacentElement("beforebegin", alertDiv);
    titleInput.focus();
    setTimeout(() => alertDiv.remove(), 2000);
  }
  
  function activateNoteModal(title, body) {
    const modalTitle = document.querySelector(".modal__title");
    const modalBody = document.querySelector(".modal__body");
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalContainer.classList.add("active");
  }
  
//   const modalBtn = document
//     .querySelector(".modal__btn")
//     .addEventListener("click", () => {
//       modalContainer.classList.remove("active");
//     });

const modalBtn = document.querySelector(".modal__btn");
// const modalContainer = document.querySelector(".modal__container");

if (modalBtn && modalContainer) {
  modalBtn.addEventListener("click", () => {
    modalContainer.classList.remove("active");
  });
}

  
  noteContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("note__view")) {
      const currentNote = e.target.closest(".note");
      const currentTitle = currentNote.querySelector(".note__title").textContent;
      const currentBody = currentNote.querySelector(".note__body").textContent;
      activateNoteModal(currentTitle, currentBody);
    }
    if (e.target.classList.contains("note__delete")) {
        const currentNote = e.target.closest(".note");
        showAlertMessage("Your Blog was permanently deleted", "remove-message");
        currentNote.remove();
        const id = currentNote.querySelector("span").textContent;
        removeNote(Number(id));
      }
    });
    
    document.addEventListener("DOMContentLoaded", displayNotes);
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const noteInput = document.querySelector("#note");
    
      if (titleInput.value.length > 0 && noteInput.value.length > 0) {
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        addNotesToLocalStorage(newNote);
        titleInput.value = "";
        noteInput.value = "";
        showAlertMessage("Blog successfully added", "success-message");
        titleInput.focus();
      } else {
        showAlertMessage("Please add both a title and a Blog", "alert-message");
      }
    });