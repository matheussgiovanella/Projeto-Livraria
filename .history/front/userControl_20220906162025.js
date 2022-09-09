const ENDPOINT = 'http://localhost:3002'

const getUsers = async () => {
    const response = await axios.get(`${ENDPOINT}/users`);

    const users = response.data;
    return users;
}
const getUser = async (id) => {
    const response = await axios.get(`${ENDPOINT}/users/${id}`);
    const user = response.data;
    return user;
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
        const newUser = {
            name: name,
            sex: sex,
            age: age,
            email: email,
            password: password
        }

        await checkNewUser(newUser, confirmPassword);

        axios.post(`${ENDPOINT}/users`, newUser)
            .then((response) => {
                popUp(`User ${name} created!`);
                loadTable();
            }, (error) => {
                popUp(`Error to create user: `, `${error.response.data.error}`);
            })

    } catch (error) {
        popUp('Error: ', error);

    }
}

const checkUser = async () => {
    const sign_in = document.querySelector('.sign_in-field');
    const email = sign_in.querySelector('#email').value;
    let password = sign_in.querySelector('#password').value;
    if (email === '') {
        popUp(`Email cannot be empty!`);
    } else if (password === '') {
        popUp(`Password cannot be empty!`);
    } else {
        password = await encryptPassword(password);
        response = await axios.get(`${ENDPOINT}/users?email=${email}&password=${password}`);

        const user = response.data;

        if (user.length !== 0) {
            window.location.href = './library.html';
        } else {
            popUp(`Invalid email or password!`);
        }
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
        trHTML += `<td class="buttons"><button onclick="confirmUserForm('${element.id}', this.innerHTML)">Edit</button>`;
        trHTML += `<button onclick="confirmUserForm('${element.id}', this.innerHTML)">Del</button></td>`;
        trHTML += `</tr>`;
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

loadTable();

const popUp = async (title, message) => {
    Swal.fire({
        title: title,
        text: message
    });
}
const confirmUserForm = async (id, action) => {
    if (action == 'Del') {
        action = 'Delete';
    }
    const user = await getUser(id);
    Swal.fire({
        title: `${action} ${user.email}`,
        html:
            `<input id="password" class="swal2-input" placeholder="password" />`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            const swal = document.querySelector('.swal2-container');
            const password = swal.querySelector('#password').value;
            
            if (await encryptPassword(password) === user.password.split(" ").join("")) {
                if (action == 'Edit') {
                    editUserForm(id, password);
                } else if (action == 'Del') {
                    deleteUser(id);
                }
            } else {
                Swal.fire({
                    title: `Wrong password!`
                })
            }
        }
    });
}
const editUserForm = async (id) => {
    const user = await getUser(id);
    Swal.fire({
        title: `Edit ${user.email}`,
        html: ``,
        focusConfirm: false,
        showCancelButton: true,
    });
}
const deleteUserForm = async () => {

}
const encryptPassword = async (password) => {
    const encryptedPassword = md5(password);
    return encryptedPassword;
}