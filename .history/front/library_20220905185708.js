async function scroll(id) {
    alert(id)
    const element = await document.getElementById('addCity');
    console.log(element)
    element.scrollIntoView();
}