const ENDPOINT = 'http://localhost:3002';

const getCities = async () => {
    const response = await axios.get(`${ENDPOINT}/cities`);

    const cities = response.data;
    return cities;
}
const getCity = async (id) => {
    const response = await axios.get(`${ENDPOINT}/cities/${id}`);
    const city = response.data;
    return city;
}

const addCity = async () => {
    const create = document.querySelector('.create-field');

    const name = create.querySelector('#name').value;
    const state = create.querySelector('#state').value;
    if (state != 0) {
        try {
            const newCity = {
                name: name,
                state_id: state
            }

            await checkNewCity(newCity);

            axios.post(`${ENDPOINT}/cities`, newCity)
                .then((response) => {
                    popUp(`City ${name} created!`);
                    loadTable();
                }, (error) => {
                    popUp(`Error to create city: `, `${error.response.data.error}`);
                })
        } catch (error) {
            popUp('Error: ', error);
        }
    }
}

const loadTable = async () => {
    const cities = await getCities();
    let trHTML = '';
    states.forEach(element => {
        const state = element.State
        trHTML += `<tr>`;
        trHTML += `<td>${element.id}</td>`;
        trHTML += `<td>${element.name}</td>`;
        trHTML += `<td>${state.name}</td>`;
        trHTML += `<td class="buttons"><button class="edit" onclick="editStateForm('${element.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmStateForm('${element.id}')">Del</button></td>`;
        trHTML += `</tr>`;
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

loadTable();

const loadStates = async () => {
    const response = await axios.get(`${ENDPOINT}/states`);
    const states = response.data;
    const create = document.querySelector('.create-field')
    let optionHTML = ``;
    for (const state of states) {
        optionHTML += `<option value="${state.id}">${state.province}</option>`
    }
    create.querySelector('#state').innerHTML += optionHTML;
}
loadStates();

const popUp = async (title, message) => {
    Swal.fire({
        title: title,
        text: message
    });
}