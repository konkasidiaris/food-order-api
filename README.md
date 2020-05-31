### How to install and run the project

You should have [node.js](https://nodejs.org/en/) installed as well as [mongodb](https://www.mongodb.com/) on your machine.
If you use containers or not the default ports, make sure that you change them at config.js and .env files.

* clone the repository
* run `npm install` 
* import the __export.js__ in mongodb, so that your db will have the menu of the store

### API

* GET __/menu__
fetches the menu

* GET __/uuid__
generates and fetches a unique user identifier which is used to ensure the uniqueness of the cart

* GET __/cart/:uuid?__
fetches the cart of the user. If there is no cart registered in this uuid, it creates one

* DELETE __/cart/:uuid?__
deletes the cart of the specified user

* POST __/addToCart__
adds an item to the user cart(itemId is the id of the item in the menu)
example request:
`{
	"uuid": "59a34e9a-2ae4-4ac7-9317-49266e487666",
	"itemId" : 6
}`

* POST __/removeFromCart__
removes an item to the user cart(itemId is the id of the item in the menu)
example request:
`{
	"uuid": "59a34e9a-2ae4-4ac7-9317-49266e487666",
	"itemId" : 6
}`

* POST __/checkout__
given the uuid and the address, creates an order which contains the user's cart and the given address and deletes the cart after the order is stored
example request:
`{
	"uuid": "59a34e9a-2ae4-4ac7-9317-49266e487666",
	"address": {
		"nameOnBell": "name surname",
        "floor": "1",
        "streetName": "AnAddress",
        "number": "1a",
        "postalCode": "12345",
        "city": "paradise"
	}
}`

* GET __/orders__
fetches every stored order

* GET __/merchant__
fetches a static html with a full list of orders