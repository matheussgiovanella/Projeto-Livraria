const ENDPOINT = 'http://localhost:3002'

const getUsers = async () => {
    response = await axios.get(`${ENDPOINT}/users`);

    const users = response.data;
    return users;
}

const checkPassword = async (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error(`The passwords are different!`);
    }
}
const checkAge = async (ageData) => {
    age = Number(ageData);
    if (Number.isNaN(age)) {
        throw new Error(`'${ageData}' is not a number!`);
    }
    if (age < 1 || age > 120) {
        throw new Error(`'${ageData}' is an invalid age!`);
    }
    return age.toFixed();
}
const encryptPassword = async (password) => {
    const encryptedPassword = md5(password);
    return encryptedPassword;
}
const checkUser = async () => {
    const sign_in = document.querySelector('.sign_in-field');
    const email = sign_in.querySelector('#email').value;
    let password = sign_in.querySelector('#password').value;
    if (email === '') {
        alert(`Email cannot be empty!`);
    } else if (password === '') {
        alert(`Password cannot be empty!`);
    } else {
        password = await encryptPassword(password);
        response = await axios.get(`${ENDPOINT}/users?email=${email}&password=${password}`);
        
        const user = response.data;

        if (user.length !== 0) {
            window.location.href = './library.html';
        } else {
            alert(`Invalid email or password!`);
        }
    }
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
                alert(`User ${name} created!`);
            }, (error) => {
                alert(`Error to create user: ${error.response.data.error}`);
            })

    } catch (error) {
        alert(error);
    }
}
const createTable = async () => {
    const users = await getUsers();
}