const ENDPOINT = 'http://localhost:3002';

const getBooks = async () => {
    const response = await axios.get(`${ENDPOINT}/books`);
    
    const books = response.data;
    return books;
}
const getBook = async (id) => {
    const response = await axios.get(`${ENDPOINT}/books/${id}`);
    const book = response.data;
    return book;
}

const addBook = async () => {
    const create = document.querySelector('.create-field');

    const title = create.querySelector('#title').value;
    const author = create.querySelector('#author').value;
    const year = create.querySelector('#year').value;
    const pages = create.querySelector('#pages').value;
    const category = create.querySelector('#category').value;
    const publisher = create.querySelector('#publisher').value;
    if (category != 0) {
        if (publisher != 0) {
            try {
                const newBook = {
                    title: title,
                    author: author,
                    publication_year: year,
                    pages: pages,
                    category_id: category,
                    publisher_id: publisher
                }
    
                await checkNewBook(newBook);
    
                axios.post(`${ENDPOINT}/books`, newBook)
                    .then((response) => {
                        const log = `Book ${title} created!`;
                        popUp(log);
                        loadTable();
                    }, (error) => {
                        popUp(`Error to create book: `, `${error.response.data.error}`);
                    })
            } catch (error) {
                popUp('Error: ', error);
            }
        } else {
            popUp('Error: you must choose a publisher!');
        }
    } else {
        popUp('Error: you must choose a category!');
    }
}

const loadTable = async () => {
    const books = await getBooks();
    let trHTML = '';
    books.forEach(book => {
        const category = book.Category;
        const publisher = book.Publisher;
        trHTML += `<tr>`;
        trHTML += `<td>${book.id}</td>`;
        trHTML += `<td>${book.title}</td>`;
        trHTML += `<td>${book.author}</td>`;
        trHTML += `<td>${book.publication_year}</td>`;
        trHTML += `<td>${book.pages}</td>`;
        trHTML += `<td>${category.description}</td>`;
        trHTML += `<td>${publisher.name}</td>`;
        trHTML += `<td class="buttons"><button class="edit" onclick="editBookForm('${book.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmBookForm('${book.id}')">Del</button></td>`;
        trHTML += `</tr>`;
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

loadTable();

const getCategories = async (id) => {
    let response;
    if (id) {
        response = await axios.get(`${ENDPOINT}/categories?exclude=${id}`);
    } else {
        response = await axios.get(`${ENDPOINT}/categories`);
    }
    const categories = response.data;
    let optionHTML = ``;
    for (const category of categories) {
        optionHTML += `<option value="${category.id}">${category.description}</option>`
    }
    return optionHTML;
}
const loadCategories = async () => {
    const create = document.querySelector('.create-field')
    const optionHTML = await getCategories();

    create.querySelector('#category').innerHTML += optionHTML;
}
loadCategories();

const getPublishers = async (id) => {
    let response;
    if (id) {
        response = await axios.get(`${ENDPOINT}/publishers?exclude=${id}`);
    } else {
        response = await axios.get(`${ENDPOINT}/publishers`);
    }
    const cities = await axios.get(`${ENDPOINT}/cities`);
    const states = await axios.get(`${ENDPOINT}/states`);
    const publishers = response.data;
    let optionHTML = ``;
    for (const publisher of publishers) {
        for (const city of cities.data) {
            for (const state of states.data) {
                if (city.id == publisher.city_id && state.id == city.state_id) {
                    optionHTML += `<option value="${publisher.id}">${publisher.name} - ${city.name}/${state.province}</option>`
                }
            }
        }
    }
    return optionHTML;
}
const loadPublishers = async () => {
    const create = document.querySelector('.create-field')
    const optionHTML = await getPublishers();

    create.querySelector('#publisher').innerHTML += optionHTML;
}
loadPublishers();

const popUp = async (title, message) => {
    Swal.fire({
        title: title,
        text: message
    });
}
const confirmBookForm = async (id) => {
    const book = await getBook(id);
    Swal.fire({
        title: `Are you sure you want to delete: ${book.title}`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            deleteBook(id);
        }
    });
}
const editBookForm = async (id) => {
    const book = await getBook(id);
    const category = book.Category;
    const category_id = book.category_id;
    const publisher = book.Publisher;
    const publisher_id = book.publisher_id;
    const CategoryOptionHTML = await getCategories(category_id);
    const PublisherOptionHTML = await getPublishers(publisher_id);
    console.log(book)
    Swal.fire({
        title: `Edit ${book.title}`,
        html:
            `<input id="id" type="hidden" value=${book.id}>` +
            `<input id="title" class="swal2-input" maxlength="45" placeholder="Title" value="${book.title}">` +
            `<input id="author" class="swal2-input" maxlength="45" placeholder="Author" value="${book.author}">` +
            `<input id="year" class="swal2-input" maxlength="4" placeholder="Year" value="${book.publication_year}">` +
            `<input id="pages" class="swal2-input" maxlength="5" placeholder="Pages" value="${book.pages}">` +
            `<select class="swal2-input" id="category"><option value="${category.id}" selected>${category.description}</option>${CategoryOptionHTML}</select>` +
            `<select class="swal2-input" id="publisher"><option value="${publisher.id}" selected>${publisher.name}</option>${PublisherOptionHTML}</select>`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            await updateBook(id);
        }
    });
}
const updateBook = async (id) => {
    const swal = document.querySelector('.swal2-container');

    const title = swal.querySelector('#title').value;
    const author = swal.querySelector('#author').value;
    const year = swal.querySelector('#year').value;
    const pages = swal.querySelector('#pages').value;
    const category = swal.querySelector('#category').value;
    const publisher = swal.querySelector('#publisher').value;

    try {
        
        const Book = {
            title: title,
            author: author,
            publication_year: year,
            pages: pages,
            category_id: category,
            publisher_id: publisher
        }

        axios.put(`${ENDPOINT}/books/${id}`, Book)
            .then((response) => {
                const log = `Book ${title} updated!`;
                popUp(log);
                loadTable();
            }, (error) => {
                popUp(`Error to update book: ${error.response.data.error}`);
            })

    } catch (error) {
        popUp(error);
    }
}
const deleteBook = async (id) => {
    const book = await getBook(id);
    await axios.delete(`${ENDPOINT}/books/${id}`);
    const log = `Book ${book.title} has been deleted!`;
    popUp(log);
    loadTable();
}