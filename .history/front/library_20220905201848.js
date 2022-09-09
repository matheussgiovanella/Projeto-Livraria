const addState = async () => {
    const element = document.querySelector('.addState');
    const name = element.querySelector('#name').value;
    const province = element.querySelector('#province').value;
    if (name === '') {
        alert('Name cannot be empty');
    } else if (province === '') {
        alert('Province cannot be empty');
    } else {
        
    }
    alert(name)
}