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
    const categories = await getCategories();
    let trHTML = '';
    categories.forEach(category => {
        trHTML += `<tr>`;
        trHTML += `<td>${category.id}</td>`;
        trHTML += `<td>${category.description}</td>`;
        trHTML += `<td class="buttons"><button class="edit" onclick="editCategoryForm('${category.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmCategoryForm('${category.id}')">Del</button></td>`;
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
const confirmCategoryForm = async (id) => {
    const category = await getCategory(id);
    Swal.fire({
        title: `Are you sure you want to delete: ${category.description}`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            deleteCategory();
        }
    });
}
const editCategoryForm = async (id) => {
    const category = await getCategory(id);
    Swal.fire({
        title: `Edit ${category.description}`,
        html:
            `<input id="id" type="hidden" value=${category.id}>` +
            `<input id="description" class="swal2-input" placeholder="Description" value="${category.description}">`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            await updateCategory(id);
        }
    });
}
const deleteCategory = async (id) => {
    await axios.delete(`${ENDPOINT}/categories/${id}`);
    popUp(`Category has been deleted!`);
    loadTable();
}