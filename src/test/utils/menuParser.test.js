import menuParser from '../../main/utils/menuParser';

const input = [{
    "_id": "5ece991ecd32c83d34e2ba3b",
    "id": 2,
    "name": "Tzatziki",
    "category": "Appetizers",
    "description": "traditional greek appetizer with greek yogurt, cucumber and garlic",
    "price": "2.5",
    "availability": true,
    "__v": 0
},
{
    "_id": "5ece993bcd32c83d34e2ba3c",
    "id": 1,
    "name": "Feta",
    "category": "Appetizers",
    "description": "traditional greek cheese",
    "price": "2.5",
    "availability": true,
    "__v": 0
},
{
    "_id": "5ece997dcd32c83d34e2ba3d",
    "id": 3,
    "name": "French fries",
    "category": "Appetizers",
    "description": "Potatoes from Naxos, handcut and cooked in virgin olive oil",
    "price": "2.4",
    "availability": true,
    "__v": 0
}]

const output = [{
    "id": 2,
    "name": "Tzatziki",
    "category": "Appetizers",
    "description": "traditional greek appetizer with greek yogurt, cucumber and garlic",
    "price": "2.5",
    "availability": true,
}, {
    "id": 1,
    "name": "Feta",
    "category": "Appetizers",
    "description": "traditional greek cheese",
    "price": "2.5",
    "availability": true
}, {
    "id": 3,
    "name": "French fries",
    "category": "Appetizers",
    "description": "Potatoes from Naxos, handcut and cooked in virgin olive oil",
    "price": "2.4",
    "availability": true
}
]

test('strips mongos metadata from json', () => {
    expect(menuParser.parseFromDB(input)).toStrictEqual(output);
});