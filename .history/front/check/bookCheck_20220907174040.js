const checkNewBook = async (book) => {
    const attributes = ['title', 'author', 'publication_year', 'pages', ''];
    for (const attribute of attributes) {
        if (book[attribute] == '') {
            throw new Error(`The field ${attribute} cannot be empty!`);
        }
    }
}