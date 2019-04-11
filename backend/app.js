const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to mlab database
const database_uri = "mongodb+srv://thijs:test1234@graphqllearning-aeso0.mongodb.net/test?retryWrites=true"
mongoose.connect(database_uri, {
    useNewUrlParser: true
});
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});

/* Example queries:
    // Request author by id and get name, age, list of books(with their names)
    {
        author(id:"5caf10fa700fa01064e45c36"){
            name
            age
            books{
                name
            }
        }
    }

    // Request book by id and get name, age, author(with their name and books(with their name))
    {
        book(id: "5caf122a36320e2d8c875f39"){
            name
            genre
            author{
                name
                books{
                    name
                }
            }
        }
    }

    // Request list of authors with their name, age, books(with their name and genre)
    {
        authors{
            name
            age
            books{
                name
                genre
            }
        }
    }

*/