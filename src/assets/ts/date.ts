
const listMonthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const convertDate = (date, format = 'en', time = 'enable') => {
    let convertDate = '';
    if (date) {
        try {
            const dateTemp = new Date(date);
            if (dateTemp.toString() != 'Invalid Date') {
                var _date = {
                    date: dateTemp.getDate(),
                    month: dateTemp.getMonth(),
                    year: dateTemp.getFullYear(),
                    hours: dateTemp.getHours(),
                    seconds: dateTemp.getSeconds()
                }
                convertDate = chooseFormatDate(format, _date, time);
            }
        } catch {
            convertDate = '';
        }
    }
    return convertDate;
};

const chooseFormatDate = (format, date, time) => {
    let formatDate = '';
    date.hours = ((parseInt(date.hours) < 10) ? '0' + date.hours : date.hours);
    let dateTime = ' ' + date.hours + ':' + date.seconds;
    if (time === 'disabled') {
        dateTime = '';
    }    
    switch (format) {
        case 'number':
            formatDate = date.date + '/' + date.month + '/' + date.year + dateTime;
            break;
        case 'en':
            formatDate =  listMonthEn[date.month] + ' ' + date.date + ',' + date.year + dateTime;
            break;
        case 'time':
            formatDate =  dateTime;
            break;
    }
    return formatDate;
}

export default { convertDate };