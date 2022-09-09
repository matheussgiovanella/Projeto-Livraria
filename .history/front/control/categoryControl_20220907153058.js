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

    const description = create.querySelector('#description').value;
    
    try {
        const newCategory = {
            description: description
        }

        await checkNewCategory(newCategory);

        axios.post(`${ENDPOINT}/categories`, newCategory)
            .then((response) => {
                popUp(`Category ${description} created!`);
                loadTable();
            }, (error) => {
                popUp(`Error to create category: `, `${error.response.data.error}`);
            })

    } catch (error) {
        popUp('Error: ', error);
    }
}

const loadTable = async () => {
    const states = await getStates();
    let trHTML = '';
    states.forEach(state => {
        trHTML += `<tr>`;
        trHTML += `<td>${state.id}</td>`;
        trHTML += `<td>${state.name}</td>`;
        trHTML += `<td>${state.province}</td>`;
        trHTML += `<td class="buttons"><button class="edit" onclick="editStateForm('${state.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmStateForm('${state.id}')">Del</button></td>`;
        trHTML += `</tr>`;
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

loadTable();

const popUp = async (title, message) => {
    Swal.fire({
        title: title,
        text: message
    });
}