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