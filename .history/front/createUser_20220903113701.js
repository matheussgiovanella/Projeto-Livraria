const addUser = async () => {

    const sign_up = document.querySelector('.sign_up-field');
    
    const name = sign_up.querySelector('#name').value;
    const test = await fetch('http://localhost:3002/users', {
        method: "GET"
    });

    console.log(test.json())
}