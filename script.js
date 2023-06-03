// app.js
import apiUrl from './environment.js';

// Obtener referencias a los elementos del DOM
const idInput = document.getElementById('id');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const userInfo = document.getElementById('user-info');

// Estados para controlar las operaciones en dos pasos
let createReady = false;
let readReady = false;
let updateReady = false;
let deleteReady = false;

function resetReadyStates() {
    createReady = false;
    readReady = false;
    updateReady = false;
    deleteReady = false;
}

function resetInputs() {
    idInput.disabled = false;
    nombreInput.disabled = false;
    apellidoInput.disabled = false;
    emailInput.disabled = false;
}

function clearInputs() {
    idInput.value = '';
    nombreInput.value = '';
    apellidoInput.value = '';
    emailInput.value = '';
}

document.getElementById('create-btn').addEventListener('click', () => {
    resetInputs();
    if (!createReady) {
        clearInputs();
        createReady = true;
        resetReadyStates();
        createReady = true;
    } else {
        createUser();
        createReady = false;
    }
});

document.getElementById('read-btn').addEventListener('click', () => {
    resetInputs();
    if (!readReady) {
        clearInputs();
        nombreInput.disabled = true;
        apellidoInput.disabled = true;
        emailInput.disabled = true;
        resetReadyStates();
        readReady = true;
    } else {
        readUser();
        readReady = false;
    }
});

document.getElementById('update-btn').addEventListener('click', () => {
    resetInputs();
    if (!updateReady) {
        clearInputs();
        resetReadyStates();
        updateReady = true;
    } else {
        updateUser();
        updateReady = false;
    }
});

document.getElementById('delete-btn').addEventListener('click', () => {
    resetInputs();
    if (!deleteReady) {
        clearInputs();
        nombreInput.disabled = true;
        apellidoInput.disabled = true;
        emailInput.disabled = true;
        resetReadyStates();
        deleteReady = true;
    } else {
        deleteUser();
        deleteReady = false;
    }
});

function createUser() {
    const user = {
        id: idInput.value,
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        email: emailInput.value,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        userInfo.textContent = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function readUser() {
    const userId = idInput.value;

    fetch(`${apiUrl}/${userId}`)
    .then(response => response.json())
    .then(data => {
        userInfo.textContent = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateUser() {
    const user = {
        id: idInput.value,
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        email: emailInput.value,
    };

    fetch(`${apiUrl}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        userInfo.textContent = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteUser() {
    const userId = idInput.value;

    fetch(`${apiUrl}/${userId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        userInfo.textContent = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
