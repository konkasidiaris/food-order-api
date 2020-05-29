const parseFromDB = (arr) => {
    arr.forEach(item => {
        delete item._id;
        delete item.__v;
    });
    return arr;
}

module.exports = {
    parseFromDB
}