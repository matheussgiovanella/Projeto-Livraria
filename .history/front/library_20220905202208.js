const ENDPOINT = 'http://localhost:3002';

const addState = async () => {
    const element = document.querySelector('.addState');
    const name = element.querySelector('#name').value;
    const province = element.querySelector('#province').value;
    if (name === '') {
        alert('Name cannot be empty');
    } else if (province === '') {
        alert('Province cannot be empty');
    } else {

        const newState = {
            name: name,
            province: province
        }

        axios.post(`${ENDPOINT}/states`, newState)
            .then((response) => {
                
            })
    }
}