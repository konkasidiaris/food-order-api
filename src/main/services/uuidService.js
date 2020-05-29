import { v4 as uuidv4 } from 'uuid';

const createUUId = () =>{
    return uuidv4();
}

module.exports = {
    createUUId
}