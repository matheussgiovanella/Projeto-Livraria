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