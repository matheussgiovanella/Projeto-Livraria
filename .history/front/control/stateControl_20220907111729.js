const ENDPOINT = 'http://localhost:3002';

const getStates = async () => {
    const response = await axios.get(`${ENDPOINT}/states`);

    const states = response.data;
    return states;
}
const getState = async (id) => {
    const response = await axios.get(`${ENDPOINT}/states/${id}`);
    const state = response.data;
    return state;
}

const addState = async () => {
    const create = document.querySelector('.create-field');

    const name = create.querySelector('#name').value;
    const province = create.querySelector('#province').value;

    try {
        const newState = {
            name: name,
            province: province
        }

        await checkNewState(newState);

        axios.post(`${ENDPOINT}/states`, newState)
            .then((response) => {
                popUp(`State ${name} created!`);
                loadTable();
            }, (error) => {
                popUp(`Error to create state: `, `${error.response.data.error}`);
            })

    } catch (error) {
        popUp('Error: ', error);
    }
}

const loadTable = async () => {
    const states = await getStates();
    let trHTML = '';
    users.forEach(element => {
        trHTML += `<tr>`;
        trHTML += `<td>${element.id}</td>`;
        trHTML += `<td>${element.name}</td>`;
        trHTML += `<td>${element.province}</td>`;
        trHTML += `<td class="buttons"><button class="edit" onclick="editState('${element.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmStateForm('${element.id}')">Del</button></td>`;
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
const confirmStateForm = async (id) => {
    const state = await getState(id);
    Swal.fire({
        title: `Are you sure you want to delete: ${state.name}`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            deleteState();
        }
    });
}
const editUserForm = async (id, password) => {
    const user = await getUser(id);
    Swal.fire({
        title: `Edit ${user.email.split(" ").join("")}`,
        html:
            `<input id="id" type="hidden" value=${user.id}>` +
            `<input id="name" class="swal2-input" placeholder="Name" value="${user.name.split(" ").join("")}">` +
            `<input id="sex" class="swal2-input" placeholder="Sex" value="${user.sex.split(" ").join("")}">` +
            `<input id="age" class="swal2-input" placeholder="Age" value="${user.age}">` +
            `<input id="email" class="swal2-input" placeholder="Email" value="${user.email.split(" ").join("")}">` +
            `<input id="password" class="swal2-input" placeholder="Password" value="${password.split(" ").join("")}">` +
            `<input id="confirmPassword" class="swal2-input" placeholder="Confirm Password">`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            await updateUser(id);
        }
    });
}

const deleteState = async (id) => {
    await axios.delete(`${ENDPOINT}/states/${id}`);
    popUp(`State has been deleted!`);
    loadTable();
}