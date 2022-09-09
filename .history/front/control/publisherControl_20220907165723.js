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

            axios.post(`${ENDPOINT}/publishers`, newPublisher)
                .then((response) => {
                    popUp(`Publisher ${name} created!`);
                    loadTable();
                }, (error) => {
                    popUp(`Error to create publisher: `, `${error.response.data.error}`);
                })
        } catch (error) {
            popUp('Error: ', error);
        }
    } else {
        popUp('Error: you must choose a city!');
    }
}

const loadTable = async () => {
    const publishers = await getPublishers();
    let trHTML = '';
    publishers.forEach(publisher => {
        const city = publisher.City;
        trHTML += `<tr>`;
        trHTML += `<td>${publisher.id}</td>`;
        trHTML += `<td>${publisher.name}</td>`;
        trHTML += `<td>${city.name}</td>`;
        trHTML += `<td class="buttons"><button class="edit" onclick="editCityForm('${publisher.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmCityForm('${publisher.id}')">Del</button></td>`;
        trHTML += `</tr>`;
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

loadTable();

const getCities = async (id) => {
    let response;
    if (id) {
        response = await axios.get(`${ENDPOINT}/cities?exclude=${id}`);
    } else {
        response = await axios.get(`${ENDPOINT}/cities`);
    }
    const cities = response.data;
    let optionHTML = ``;
    for (const city of cities) {
        optionHTML += `<option value="${city.id}">${city.name}</option>`
    }
    return optionHTML;
}
const loadCities = async () => {
    const create = document.querySelector('.create-field')
    const optionHTML = await getCities();

    create.querySelector('#city').innerHTML += optionHTML;
}
loadCities();

const popUp = async (title, message) => {
    Swal.fire({
        title: title,
        text: message
    });
}
const confirmPublisherForm = async (id) => {
    const publisher = await getPublisher(id);
    Swal.fire({
        title: `Are you sure you want to delete: ${publisher.name}`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            deletePublisher(id);
        }
    });
}