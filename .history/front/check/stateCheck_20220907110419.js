const checkNewUser = async (user, confirmPassword) => {
    const attributes = ['name', 'province'];
    for (const attribute of attributes) {
        if (user[attribute] == '') {
            throw new Error(`The field ${attribute} cannot be empty!`);
        }
        if (attribute == 'age') {
            user[attribute] = await checkAge(user[attribute]);
        }
        if (attribute == 'password') {
            await checkPassword(user[attribute], confirmPassword);
            user[attribute] = await encryptPassword(user[attribute]);
        }
    }
}