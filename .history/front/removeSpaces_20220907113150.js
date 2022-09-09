const removeSpaces = async (object) => {
    const keys = Object.keys(object);

    for (const key of keys) {
        object[key].split().reverse();
        for (let i = 0; i < object[key].length; i++) {
            
        }
    }
}