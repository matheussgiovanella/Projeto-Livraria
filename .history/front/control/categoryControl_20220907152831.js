const ENDPOINT = 'http://localhost:3002';

const getCategories = async () => {
    const response = await axios.get(`${ENDPOINT}/categories`);

    const categories = response.data;
    return categories;
}
const getCategory = async (id) => {
    const response = await axios.get(`${ENDPOINT}/categories/${id}`);
    const category = response.data;
    return category;
}

const addCategory = async () => {
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