const checkNewUser = async (user, confirmPassword) => {
    const attributes = ['name', 'sex', 'age', 'email', 'password'];
    for (const attribute of attributes) {
        if (user[attribute] == '') {
            throw new Error(`The field ${attribute} cannot be empty!`);
        }
        if (attribute == 'age') {
            user[attribute] = await checkAge(user[attribute]);
        }
        if (attribute == 'password') {
            await checkPassword(password, confirmPassword);
            user[attribute] = await encryptPassword(user[attribute]);
        }
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
const checkPassword = async (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error(`The passwords are different!`);
    }
}
const encryptPassword = async (password) => {
    const encryptedPassword = md5(password);
    return encryptedPassword;
}