const ENDPOINT = 'http://localhost:3002'

const checkPassword = async (password,confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error(`The passwords are different!`);
    }
}
const checkAge = async (ageData) => {
    age = Number(ageData);
    if (Number.isNaN(age)) {
        throw new Error(`'${ageData}' is not a number!`);
    }
    if (age < 1 || age > 120 || age % 2 !== 0) {
        throw new Error(`'${ageData}' is an invalid age!`);
    }
    return age;
}
const encryptPassword = async (password) => {
    const encryptedPassword = md5(password);
    return encryptedPassword;
}
const addUser = async () => {
    let response;
    const sign_up = document.querySelector('.sign_up-field');
    
    const name = sign_up.querySelector('#name').value;
    const sex = sign_up.querySelector('#sex').value;
    let age = sign_up.querySelector('#age').value;
    const email = sign_up.querySelector('#email').value;
    const password = sign_up.querySelector('#password').value;
    const confirmPassword = sign_up.querySelector('#confirmPassword').value;

    response = await axios.get(`${ENDPOINT}/users`);

    const users = await response.data;
    
    try {
        await checkPassword(password,confirmPassword);
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