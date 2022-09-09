const ENDPOINT = 'http://localhost:3002'

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

const confirmPassword = async (email, action) => {
    const popUp = document.querySelector('.popUp');
    let password = popUp.querySelector('#password').value;

    password = await encryptPassword(password);

    const response = await axios.get(`${ENDPOINT}/users?email=${email}&password=${password}`);

    const users = response.data;
    
    try {
        const userPassword = await users[0].password.split(" ").join("");
        
        if (userPassword === password) {
            if (action === 'Del') {
                deleteUser(email, password);
            }
            if (action === 'Edit') {
                updateUserForm(email, password);
            }
            loadTable();
            closePopUp();
        }
    } catch (error) {
        showMessage(`User not found!`);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}