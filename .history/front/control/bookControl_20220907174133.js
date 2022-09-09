const ENDPOINT = 'http://localhost:3002';

const getBooks = async () => {
    const response = await axios.get(`${ENDPOINT}/publishers`);
    
    const publishers = response.data;
    return publishers;
}
const getBook = async (id) => {
    const response = await axios.get(`${ENDPOINT}/publishers/${id}`);
    const publisher = response.data;
    return publisher;
}