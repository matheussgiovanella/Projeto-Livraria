const addUser = async () => {

    const sign_up = document.querySelector('.sign_up-field');
    
    const name = sign_up.querySelector('#name').value;
    const response = await fetch('http://localhost:3002/users');

    const users = await response.json();
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
    }
}