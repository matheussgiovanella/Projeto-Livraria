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