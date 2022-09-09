const ENDPOINT = 'http://localhost:3002';

const getPublishers = async () => {
    const response = await axios.get(`${ENDPOINT}/publishers`);

    const publishers = response.data;
    return publishers;
}
const getPublisher = async (id) => {
    const response = await axios.get(`${ENDPOINT}/publishers/${id}`);
    const publisher = response.data;
    return publisher;
}

const addPublisher = async () => {
    const create = document.querySelector('.create-field');

    const name = create.querySelector('#name').value;
    const city = create.querySelector('#city').value;
    if (city != 0) {
        try {
            const newPublisher = {
                name: name,
                city_id: city
            }

            await checkNewPublisher(newPublisher);

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
        popUp('Error: you must choose a city!');
    }
}