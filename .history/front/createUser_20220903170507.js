const checkIfEmailExists = async (email,users) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (email === user.email) {
            throw new Error(`Email is already in use!`);
        }
    }
}
const checkPassword = async (password,confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error(`The passwords are different!`);
    }
}
const checkAge = async (age) => {
    alert(typeof age, age)
}
const addUser = async () => {

    const sign_up = document.querySelector('.sign_up-field');
    
    const name = sign_up.querySelector('#name').value;
    const sex = sign_up.querySelector('#sex').value;
    const age = Number(sign_up.querySelector('#age').value);
    const email = sign_up.querySelector('#email').value;
    const password = sign_up.querySelector('#password').value;
    const confirmPassword = sign_up.querySelector('#confirmPassword').value;
    const response = await fetch('http://localhost:3002/users');

    const users = await response.json();

    try {
        await checkPassword(password,confirmPassword);
        await checkIfEmailExists(email,users);
        await checkAge(age);
        
    } catch (error) {
        alert(error);
    }
}