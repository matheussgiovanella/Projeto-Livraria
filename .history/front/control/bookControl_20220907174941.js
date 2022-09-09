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
                        popUp(`Book ${name} created!`);
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