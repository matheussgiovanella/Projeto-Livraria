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
    } else {
        popUp('Error: you must choose a state!');
    }
}

const loadTable = async () => {
    const cities = await getCities();
    let trHTML = '';
    cities.forEach(city => {
        const state = city.State;
        trHTML += `<tr>`;
        trHTML += `<td>${city.id}</td>`;
        trHTML += `<td>${city.name}</td>`;
        trHTML += `<td>${state.name}</td>`;
        trHTML += `<td class="buttons"><button class="edit" onclick="editCityForm('${city.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmCityForm('${city.id}')">Del</button></td>`;
        trHTML += `</tr>`;
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

loadTable();

const getStates = async (id) => {
    let response;
    if (id) {
        response = await axios.get(`${ENDPOINT}/states?exclude=${id}`);
    } else {
        response = await axios.get(`${ENDPOINT}/states`);
    }
    const states = response.data;
    let optionHTML = ``;
    for (const state of states) {
        optionHTML += `<option value="${state.id}">${state.province}</option>`
    }
    return optionHTML;
}
const loadStates = async () => {
    const create = document.querySelector('.create-field')
    const optionHTML = await getStates();

    create.querySelector('#state').innerHTML += optionHTML;
}
loadStates();

const popUp = async (title, message) => {
    Swal.fire({
        title: title,
        text: message
    });
}
const confirmCityForm = async (id) => {
    const city = await getCity(id);
    alert(id)
    Swal.fire({
        title: `Are you sure you want to delete: ${city.name}`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            deleteCity();
        }
    });
}
const editCityForm = async (id) => {
    const city = await getCity(id);
    const state = city.State;
    const state_id = city.state_id;
    const optionHTML = await getStates(state_id);
    Swal.fire({
        title: `Edit ${city.name}`,
        html:
            `<input id="id" type="hidden" value=${city.id}>` +
            `<input id="name" class="swal2-input" placeholder="Name" value="${city.name}">` +
            `<select><option value="${state.id}" selected>${state.province}</option>${optionHTML}</select>`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            await updateState(id);
        }
    });
}

const deleteCity = async (id) => {
    await axios.delete(`${ENDPOINT}/cities/${id}`);
    popUp(`City has been deleted!`);
    loadTable();
}