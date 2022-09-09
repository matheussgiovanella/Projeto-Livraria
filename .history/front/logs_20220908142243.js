const addLog = async (action) => {


    
    const newLog = {
        action: action,
        date: date
    }
}
const getDate = async () => {
    const current = new Date();
    const cDate = `${current.getFullYear()}-${current.getMonth}-${current.getDate}`;
    const cTime = `${current.getHours}:${current.getMinutes}:${current.getSeconds}`;
    const dateTime = `${cDate}`

    console.log(date)
}
getDate();