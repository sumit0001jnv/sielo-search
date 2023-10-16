const generateID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const multiLineEllipsis = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'calc(100% - 50px)',
    textAlign: 'initial'
}

function stringAvatar(name) {
    const arr = (name || '').split(' ');
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${arr[0][0]}${arr[1] ? arr[1][0] : ''}`,
    };
}
function getFormattedDate(inputDate) {
    const date = new Date(inputDate);
    const modifyDate = (value) => {
        return value < 10 ? '0' + value : value;
    }
    const datevalues = [
        date.getFullYear(),
        modifyDate(date.getMonth() + 1),
        modifyDate(date.getDate()),
        modifyDate(date.getHours()),
        modifyDate(date.getMinutes()),
        modifyDate(date.getSeconds()),
    ];
    return `${datevalues[2]}-${datevalues[1]}-${datevalues[0]} ${datevalues[3]}:${datevalues[4]}`;
}

function getUser(type) {
    const groupsObj = {
        g1: 'Cedant',
        g2: 'Broker',
        g2b: 'Senior Broker',
        g3: 'Insurer',
        admin: 'Admin'
    };
    return groupsObj[type] || type;
}

function stringToColor(string = '') {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export { generateID, multiLineEllipsis, stringAvatar, stringToColor, getUser,getFormattedDate };