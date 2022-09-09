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
const addUser = async () => {
    let response;
    const sign_up = document.querySelector('.sign_up-field');
    
    const name = sign_up.querySelector('#name').value;
    const sex = sign_up.querySelector('#sex').value;
    let age = sign_up.querySelector('#age').value;
    const email = sign_up.querySelector('#email').value;
    const password = sign_up.querySelector('#password').value;
    const confirmPassword = sign_up.querySelector('#confirmPassword').value;
    response = await fetch('http://localhost:3002/users');

    const users = await response.json();
    
    try {
        await checkPassword(password,confirmPassword);
        age = await checkAge(age);

        const newUser = {
            name: name,
            sex: sex,
            age: age,
            email: email,
            password: password
        }

        response = await fetch('http://localhost:3002/users', { method: 'POST', body: newUser });
        alert(await response.json());
        
    } catch (error) {
        alert(error);
    }
}