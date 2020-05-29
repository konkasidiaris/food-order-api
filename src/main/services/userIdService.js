import UserIdModel from '../models/mongoose/userId';

async function getUserId(){
    let doc = UserIdModel.find({});
    doc.id++;
    return doc.save();
}

module.exports = {
    getUserId
}