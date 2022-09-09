const ENDPOINT = 'http://localhost:3002'

class popUp {
    createPopUp = async (message) => {
        const quant = document.querySelectorAll('.popUp');
        alert(quant.length)
        let popUp = '';
        popUp += `<div class="popUp">`;
        popUp += `<div class="popUp-container">`;
        popUp += `<button class="popUp-button" onclick="closePopUp('this')">X</button>`;
        popUp += `${message}`;
        popUp += `</div>`;
        popUp += `</div>`;
        document.querySelector('body').innerHTML += popUp;
        await popUpAnimationOpen(100);
    }
    closePopUp = async (element) => {
        await popUpAnimationClose(75);
        element.remove();
    }
}

const showMessage = async (message) => {
    alert(message);
}
const addUser = async () => {
    const test = new popUp();
    test.createPopUp();
    //popUp.createPopUp();
    /*const sign_up = document.querySelector('.sign_up-field');

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
        
    }*/
}
const popUpAnimationOpen = async (time) => {
    await sleep(time);
    const popUpContainer = document.querySelector('.popUp-container');
    const popUpBackground = document.querySelector('.popUp');
    popUpBackground.style.transition = '0.3s ease-in-out';
    popUpBackground.style.backgroundColor = '#ffffffa9';
    popUpContainer.style.transition = '0.3s';
    popUpContainer.style.transform = 'scale(1.0)';
}
const popUpAnimationClose = async (time) => {
    const popUpContainer = document.querySelector('.popUp-container');
    const popUpBackground = document.querySelector('.popUp');
    popUpBackground.style.transition = '0.3s ease-in-out';
    popUpBackground.style.backgroundColor = '#ffffff00';
    popUpContainer.style.transition = '0.3s';
    popUpContainer.style.transform = 'scale(0.0)';
    await sleep(time);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}