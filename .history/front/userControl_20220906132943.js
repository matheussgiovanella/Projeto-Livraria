const ENDPOINT = 'http://localhost:3002'

const showMessage = async (message) => {
    alert(message);
}
const addUser = async () => {
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
                showMessage(`User ${name} created!`);
                loadTable();
            }, (error) => {
                showMessage(`Error to create user: ${error.response.data.error}`);
            })

    } catch (error) {
        showMessage(error);
    }
}
class popUp {
    createPopUp = async () => {
        const quant = document.querySelectorAll('.popUp');
        alert(quant.length)
        let popUp = '';
        popUp += `<div class="popUp">`;
        popUp += `<div class="popUp-container">`;
        popUp += `<button class="popUp-button" onclick="closePopUp()">X</button>`;
        popUp += `${message}`;
        popUp += `</div>`;
        popUp += `</div>`;
        document.querySelector('body').innerHTML += popUp;
        await popUpAnimationOpen(100);
    }
}