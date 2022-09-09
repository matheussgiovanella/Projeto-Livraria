const ENDPOINT = 'http://localhost:3002'

const getUsers = async () => {
    response = await axios.get(`${ENDPOINT}/users`);

    const users = response.data;
    return users;
}

const showMessage = async (message) => {
    alert(message);
}

const checkPassword = async (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error(`The passwords are different!`);
    }
}
const checkAge = async (ageData) => {
    age = Number(ageData);
    if (Number.isNaN(age)) {
        throw new Error(`'${ageData}' is not a number!`);
    }
    if (age < 1 || age > 120) {
        throw new Error(`'${ageData}' is an invalid age!`);
    }
    return age.toFixed();
}
const encryptPassword = async (password) => {
    const encryptedPassword = md5(password);
    return encryptedPassword;
}
const checkUser = async () => {
    const sign_in = document.querySelector('.sign_in-field');
    const email = sign_in.querySelector('#email').value;
    let password = sign_in.querySelector('#password').value;
    if (email === '') {
        showMessage(`Email cannot be empty!`);
    } else if (password === '') {
        showMessage(`Password cannot be empty!`);
    } else {
        password = await encryptPassword(password);
        response = await axios.get(`${ENDPOINT}/users?email=${email}&password=${password}`);

        const user = response.data;

        if (user.length !== 0) {
            window.location.href = './library.html';
        } else {
            alert(`Invalid email or password!`);
        }
    }
}
const addUser = async () => {
    const sign_up = document.querySelector('.sign_up-field');

    const name = sign_up.querySelector('#name').value;
    const sex = sign_up.querySelector('#sex').value;
    let age = sign_up.querySelector('#age').value;
    const email = sign_up.querySelector('#email').value;
    const password = sign_up.querySelector('#password').value;
    const confirmPassword = sign_up.querySelector('#confirmPassword').value;

    try {
        await checkPassword(password, confirmPassword);
        age = await checkAge(age);

        const newUser = {
            name: name,
            sex: sex,
            age: age,
            email: email,
            password: await encryptPassword(password)
        }

        axios.post(`${ENDPOINT}/users`, newUser)
            .then((response) => {
                showMessage(`User ${name} created!`);
                loadTable();
            }, (error) => {
                showMessage(`Error to create user: ${error.response.data.error}`);
            })

    } catch (error) {
        showMessage(error);
    }
}
const updateUser = async (URLemail, URLpassword) => {
    const popUp = document.querySelector('.popUp');

    const name = popUp.querySelector('#name').value;
    const sex = popUp.querySelector('#sex').value;
    let age = popUp.querySelector('#age').value;
    const email = popUp.querySelector('#email').value;
    const password = popUp.querySelector('#password').value;
    const confirmPassword = popUp.querySelector('#confirmPassword').value;

    try {
        await checkPassword(password, confirmPassword);
        age = await checkAge(age);

        const User = {
            name: name,
            sex: sex,
            age: age,
            email: email,
            password: await encryptPassword(password)
        }

        axios.put(`${ENDPOINT}/users?email=${URLemail}&password=${URLpassword}`, User)
            .then((response) => {
                showMessage(`User ${name} updated!`);
                loadTable();
                closePopUp();
            }, (error) => {
                showMessage(`Error to update user: ${error.response.data.error}`);
            })

    } catch (error) {
        showMessage(error);
    }
}
const updateUserForm = async (email, password) => {
    let message = '';
    message += `<span class="popUp-title">Edit User</span><br/>`;
    message += `<label for="name">Name</label>`;
    message += `<div><input id="name" /></div>`;
    message += `<label for="sex">Sex</label>`;
    message += `<div><input id="sex" /></div>`;
    message += `<label for="age">Age</label>`;
    message += `<div><input id="age" /></div>`;
    message += `<label for="email">E-mail</label>`;
    message += `<div><input id="email" /></div>`;
    message += `<label for="password">Password</label>`;
    message += `<div><input id="password" /></div>`;
    message += `<label for="confirmPassword">Confirm Password</label>`;
    message += `<div><input id="confirmPassword" /></div>`;
    message += `<button onclick="updateUser('${email}', '${password}')">Confirm</button>`;

    showPopUp(message);
}
const deleteUser = async (email, password) => {
    try {
        await axios.delete(`${ENDPOINT}/users?email=${email}&password=${password}`)
            .then((response) => {
                showMessage(`User deleted!`);
                loadTable();
            }, (error) => {
                showMessage(`Error to delete user: ${error.response.data.error}`);
            })

    } catch (error) {
        showMessage(error);
    }
}
const loadTable = async () => {
    const users = await getUsers();
    let trHTML = '';
    users.forEach(element => {
        trHTML += `<tr>`;
        trHTML += `<td>${element.id}</td>`;
        trHTML += `<td>${element.name}</td>`;
        trHTML += `<td>${element.sex}</td>`;
        trHTML += `<td>${element.age}</td>`;
        trHTML += `<td>${element.email}</td>`;
        trHTML += `<td class="buttons"><button onclick="preparePopUpMessage('${element.email}', this.innerHTML)">Edit</button>`;
        trHTML += `<button onclick="preparePopUpMessage('${element.email}', this.innerHTML)">Del</button></td>`;
        trHTML += `</tr>`;
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

loadTable();

const preparePopUpMessage = async (param, action) => {
    let message = '';
    if (action === 'Del') {
        message += `<span class="popUp-title">Delete User?</span><br/>`;
    }
    if (action === 'Edit') {
        message += `<span class="popUp-title">Edit User?</span><br/>`;
    }
    message += `<label for="password">Confirm Password for ${param}</label>`;
    message += `<div><input id="password"/></div>`;
    message += `<div><button onclick="confirmPassword('${param}', '${action}')">Confirm</button></div>`;

    showPopUp(message);
}

const showPopUp = async (message) => {
    let popUp = '';
    popUp += `<div class="popUp">`;
    popUp += `<div class="popUp-container">`;
    popUp += `<button class="popUp-button" onclick="closePopUp()">X</button>`;
    popUp += `${message}`;
    popUp += `</div>`;
    popUp += `</div>`;
    document.querySelector('body').innerHTML += popUp;
    await popUpAnimationOpen(100);
}
const popUpAnimationOpen = async (time) => {
    await sleep(time);
    const popUpContainer = document.querySelector('.popUp-container');
    const popUpBackground = document.querySelector('.popUp');
    popUpBackground.style.transition = '0.3s ease-in-out';
    popUpBackground.style.backgroundColor = '#ffffffa9';
    popUpContainer.style.transition = '0.3s';
    popUpContainer.style.transform = 'scale(1.0)';
}
const popUpAnimationClose = async (time) => {
    const popUpContainer = document.querySelector('.popUp-container');
    const popUpBackground = document.querySelector('.popUp');
    popUpBackground.style.transition = '0.3s ease-in-out';
    popUpBackground.style.backgroundColor = '#ffffff00';
    popUpContainer.style.transition = '0.3s';
    popUpContainer.style.transform = 'scale(0.0)';
    await sleep(time);
}
const closePopUp = async () => {
    await popUpAnimationClose(75);
    document.querySelector('.popUp').remove();
}

const confirmPassword = async (email, action) => {
    const popUp = document.querySelector('.popUp');
    let password = popUp.querySelector('#password').value;

    password = await encryptPassword(password);

    response = await axios.get(`${ENDPOINT}/users?email=${email}&password=${password}`);

    const users = response.data;

    if (action === 'Del') {
        deleteUser(email, password);
    }
    if (action === 'Edit') {
        updateUserForm(email, password);
    }
    loadTable();
    closePopUp();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}