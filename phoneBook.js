
class  Contact{
    constructor(name, phonenumber, email){
        this.name = name;
        this.phonenumber = phonenumber;
        this.email = email;
    }
}

class Phonebook {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.contacts = [];
    }


addContact(contact) {
    this.contacts.push(contact);
}

deleteContact(contact) {
    let index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
  }
}

let phonebooks = [];
let phonebookId = 0;

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click',action);
    return element;
}
onClick("new-phonebook-name", () => {
    phonebooks.push(new Phonebook(phonebookId++, getValue("new-phonebook")))
    drawDOM();
    document.getElementById("new-phonebook").value = '';
} );


function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let phonebookDiv = document.getElementById('phonebooks');
    clearElement(phonebookDiv);
    for (let phonebook of phonebooks) {
      let table = createPhonebookTable(phonebook);
      let title = document.createElement('h2');
      title.innerHTML = phonebook.name;
      title.appendChild(createDeletePhonebookButton(phonebook));
      phonebookDiv.appendChild(title);
      phonebookDiv.appendChild(table)
      for (let contact of phonebook.contacts) {
        createPhonebookRow(phonebook, table, contact);
      }

    }
}

function createPhonebookRow(phonebook, table, contact) {
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = contact.name;
    row.insertCell(1).innerHTML = contact.phonenumber;
    row.insertCell(2).innerHTML = contact.email;
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteRowButton(phonebook,contact)); 
}
function createDeleteRowButton(phonebook, contact) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-dark';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = phonebook.contacts.indexOf(contact);
        phonebook.contacts.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createDeletePhonebookButton(phonebook) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-dark';
    btn.innerHTML = 'Delete Phonebook';
    btn.onclick = () => { 
        let index = phonebooks.indexOf(phonebook);
        phonebooks.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createNewContactButton(phonebook) {
    let btn = document.createElement('button');
    btn.className ='btn btn-dark';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        phonebook.contacts.push(new Contact(getValue(`name-input-${phonebook.id}`),getValue(`phonenumber-input-${phonebook.id}`), getValue(`email-input-${phonebook.id}`) ))
        drawDOM();
    };
    return btn;
}

function createPhonebookTable(phonebook) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-info table-striped');
    let row = table.insertRow(0);
    let nameColum = document.createElement('th');
    let phoneNumberColum = document.createElement('th');
    let emailColum = document.createElement('th');
    nameColum.innerHTML ='Contact Name';
    phoneNumberColum.innerHTML = 'Phone Number';
    emailColum.innerHTML = 'Email';
    row.appendChild(nameColum);
    row.appendChild(phoneNumberColum);
    row.appendChild(emailColum);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let phoneNumberTh = document.createElement('th');
    let emailTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${phonebook.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let phoneNumberInput = document.createElement('input');
    phoneNumberInput.setAttribute('id', `phonenumber-input-${phonebook.id}`);
    phoneNumberInput.setAttribute('type', 'text');
    phoneNumberInput.setAttribute('class', 'form-control');
    let emailInput = document.createElement('input');
    emailInput.setAttribute('id', `email-input-${phonebook.id}`);
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('class', 'form-control');
    let newContactButton = createNewContactButton(phonebook);
    nameTh.appendChild(nameInput);
    phoneNumberTh.appendChild(phoneNumberInput);
    emailTh.appendChild(emailInput);
    createTh.appendChild(newContactButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(phoneNumberTh);
    formRow.appendChild(emailTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}