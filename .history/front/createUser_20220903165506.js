const checkIfEmailExists = async (email,users) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (!email === user.email) {
            return new Error(`Email is already in use!`);
        } else {
            return false;
        }
    }
}

const addUser = async () => {

    const sign_up = document.querySelector('.sign_up-field');
    
    const name = sign_up.querySelector('#name').value;
    const sex = sign_up.querySelector('#sex').value;
    const age = sign_up.querySelector('#age').value;
    const email = sign_up.querySelector('#email').value;
    const password = sign_up.querySelector('#password').value;
    const response = await fetch('http://localhost:3002/users');

    const users = await response.json();

    try {
        const emailExists = await checkIfEmailExists(email,users);
        if (!emailExists) {
    
        }
    } catch (error) {
        alert(error);
    }
}