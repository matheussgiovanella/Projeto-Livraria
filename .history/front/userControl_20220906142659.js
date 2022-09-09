const ENDPOINT = 'http://localhost:3002'

const getUsers = async () => {
    const response = await axios.get(`${ENDPOINT}/users`);

    const users = response.data;
    return users;
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

const popUp = async (title, message) => {
    Swal.fire({
        title: title,
        text: message
    });
}