const ENDPOINT = 'http://localhost:3002';

const addLog = async (action) => {

    const date = await getDate();

    const newLog = {
        action: action,
        date: date
    }
    axios.post(`${ENDPOINT}/logs`, newLog);
}
const getDate = async () => {
    const current = new Date();
    const cDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    const dateTime = `${cDate} ${cTime}`
    
    return dateTime;
}
addLog();