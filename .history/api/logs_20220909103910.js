const LogModel = require('./models/Log.js');

class Log {
    add = async (action) => {
        try {

        } catch (error) {
            
        }
        const date = await getDate();
    
        const newLog = {
            action: action,
            date: date
        }
        LogModel.create(newLog);
    }
}
const getDate = async () => {
    const current = new Date();
    const cDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    const dateTime = `${cDate} ${cTime}`
    
    return dateTime;
}

module.exports = new Log();