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

const addUser = async () => {
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
        trHTML += `<button class="delete" onclick="confirmForm('${element.id}')">Del</button></td>`;
        trHTML += `</tr>`;
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

loadTable();