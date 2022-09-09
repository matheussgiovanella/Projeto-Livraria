const ENDPOINT = 'http://localhost:3002';

const getCities = async () => {
    const response = await axios.get(`${ENDPOINT}/states`);

    const cities = response.data;
    return cities;
}
const getCity = async (id) => {
    const response = await axios.get(`${ENDPOINT}/states/${id}`);
    const city = response.data;
    return city;
}