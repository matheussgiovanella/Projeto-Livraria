const addState = async () => {
    const element = document.querySelector('.addState');
    const name = element.querySelector('#name').value;
    if (name === '') {
        alert('Name cannot be empty!');
    }
    console.log(name)
}