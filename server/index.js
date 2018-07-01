const express = require('express');
const bodyParser = require('body-parser');

const app = express();


//make sure we use the bodyParser top level middlewear so we can actually recieve body requests.
app.use(bodyParser.json());

let customers = [
    {id: 1, name: 'josh', age: 30},
    {id: 2000, name: 'brent', age: 28},
    {id: 3, name: 'hunter', age: 23}
]


app.get('/api/customer_names', (req, res) => {
    res.status(200).json(customers);
})

//set up put endpoint so now we can update our customers with an axios put request to this endpoint to http://localhost:4000/api/customer_names, our app already knows the url base name of localhost:4000 so we just need to set the path name (i.e. /api/customer_names)

app.put('/api/customer_names', (req, res) => {

    //destructure the properties of the object being sent from our axios put request on our front end 
    const { id, name, age } = req.body;

    //map over our customers array to see 
    customers.forEach((customer, index) => {

        //if the id submitted in the body matches any of our customer id's we update the name and age of that customer
        if(customer.id == id){

            // I added the or statement || below, this basically says if there was a value sent in the body for the name or age property, update with the new value, otherwise just replace with the old value.
            customers[index].name = name || customers[index].name;
            customers[index].age =  age || customers[index].age;
        }
    })
// send our updated customers array to the front so we can set state with the updated list.
    res.status(200).json(customers)
})

app.listen(4000, ()=> console.log('server running on port 4000'));