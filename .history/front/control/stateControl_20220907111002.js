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
    const sign_up = document.querySelector('.create-field');

    const name = sign_up.querySelector('#name').value;
    const province = sign_up.querySelector('#province').value;

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