const checkNewCity = async (state) => {
    const attributes = ['name', 'state_id'];
    for (const attribute of attributes) {
        if (state[attribute] == '') {
            throw new Error(`The field ${attribute} cannot be empty!`);
        }
    }
}