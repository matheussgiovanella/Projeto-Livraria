const checkNewState = async (user, confirmPassword) => {
    const attributes = ['name', 'province'];
    for (const attribute of attributes) {
        if (user[attribute] == '') {
            throw new Error(`The field ${attribute} cannot be empty!`);
        }
    }
}