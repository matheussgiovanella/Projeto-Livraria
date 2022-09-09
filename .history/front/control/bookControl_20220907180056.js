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
    
                axios.post(`${ENDPOINT}/publishers`, newBook)
                    .then((response) => {
                        popUp(`Book ${title} created!`);
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
        trHTML += `<td class="buttons"><button class="edit" onclick="editPublisherForm('${book.id}')">Edit</button>`;
        trHTML += `<button class="delete" onclick="confirmPublisherForm('${book.id}')">Del</button></td>`;
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
    const publishers = response.data;
    let optionHTML = ``;
    for (const publisher of publishers) {
        optionHTML += `<option value="${publisher.id}">${publisher.name}</option>`
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