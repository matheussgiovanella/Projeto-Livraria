const ENDPOINT = 'http://localhost:3002'

const addUser = async () => {
    await createPopUp('test');
    const sign_up = document.querySelector('.sign_up-field');

    const name = sign_up.querySelector('#name').value;
    const sex = sign_up.querySelector('#sex').value;
    let age = sign_up.querySelector('#age').value;
    const email = sign_up.querySelector('#email').value;
    const password = sign_up.querySelector('#password').value;
    const confirmPassword = sign_up.querySelector('#confirmPassword').value;

    try {
        await checkPassword(password, confirmPassword);
        age = await checkAge(age);

        const newUser = {
            name: name,
            sex: sex,
            age: age,
            email: email,
            password: await encryptPassword(password)
        }

        axios.post(`${ENDPOINT}/users`, newUser)
            .then((response) => {
                createPopUp(`User ${name} created!`);
                loadTable();
            }, (error) => {
                createPopUp(`Error to create user: ${error.response.data.error}`);
            })

    } catch (error) {
        createPopUp(error);
        
    }
}
const popUp = async () => {
    Swal.
}