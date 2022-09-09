const removeSpaces = async (object) => {
    const keys = Object.keys(object);

    for (const key of keys) {
        object[key].reverse()
    }
}