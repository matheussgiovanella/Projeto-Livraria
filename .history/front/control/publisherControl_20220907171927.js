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
        trHTML += `<td>${city.name}</td>`;
        trHTML += `<td class="buttons"><button class="edit" onclick="editPublisherForm('${publisher.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmPublisherForm('${publisher.id}')">Del</button></td>`;
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
const editPublisherForm = async (id) => {
    const publisher = await getPublisher(id);
    const city = publisher.City;
    const city_id = publisher.city_id;
    const optionHTML = await getCities(city_id);
    console.log(publisher)
    Swal.fire({
        title: `Edit ${publisher.name}`,
        html:
            `<input id="id" type="hidden" value=${publisher.id}>` +
            `<input id="name" class="swal2-input" placeholder="Name" value="${publisher.name}">` +
            `<select id="city"><option value="${city.id}" selected>${city.name}</option>${optionHTML}</select>`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            await updatePublisher(id);
        }
    });
}
const updatePublisher = async (id) => {
    const swal = document.querySelector('.swal2-container');

    const name = swal.querySelector('#name').value;
    const city = swal.querySelector('#city').value;

    try {
        
        const Publisher = {
            name: name,
            city_id: city
        }

        axios.put(`${ENDPOINT}/publishers/${id}`, Publisher)
            .then((response) => {
                popUp(`Publisher ${name} updated!`);
                loadTable();
            }, (error) => {
                popUp(`Error to update publisher: ${error.response.data.error}`);
            })

    } catch (error) {
        popUp(error);
    }
}
const deletePublisher = async (id) => {
    await axios.delete(`${ENDPOINT}/publishers/${id}`);
    popUp(`Publisher has been deleted!`);
    loadTable();
}