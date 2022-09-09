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

    }
}

const loadStates = async () => {
    const response = await axios.get(`${ENDPOINT}/states`);
    const states = response.data;
    for (const state of states) {
        console.log(states)
    }
}
loadStates();