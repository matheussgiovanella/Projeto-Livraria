const checkNewPublisher = async (city) => {
    const attributes = ['name', 'city_id'];
    for (const attribute of attributes) {
        if (city[attribute] == '') {
            throw new Error(`The field ${attribute} cannot be empty!`);
        }
    }
}