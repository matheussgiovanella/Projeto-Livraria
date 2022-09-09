const checkNewBook = async (book) => {
    const attributes = ['title', 'province'];
    for (const attribute of attributes) {
        if (book[attribute] == '') {
            throw new Error(`The field ${attribute} cannot be empty!`);
        }
    }
}