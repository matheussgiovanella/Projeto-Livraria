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

        } catch (error) {
            
        }
    }
}

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