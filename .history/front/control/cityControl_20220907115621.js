const ENDPOINT = 'http://localhost:3002';

const getCities = async () => {
    const response = await axios.get(`${ENDPOINT}/states`);

    const states = response.data;
    return states;
}
const getCity = async (id) => {
    const response = await axios.get(`${ENDPOINT}/states/${id}`);
    const state = response.data;
    return state;
}