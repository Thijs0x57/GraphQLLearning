const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLSchema, 
    GraphQLInt 
} = graphql;

// dummy data
var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1'},
    {name: 'Cool book story', genre: 'Fantasy', id: '2'},
    {name: 'Where\'s my car dude', genre: 'Humor', id: '3'},
];

var authors = [
    {name: 'Jan Boekenschrijver', age: 36, id: '1'},
    {name: 'Theo van Gogh', age: 69, id: '2'},
    {name: 'Peter van Hoek', age: 29, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from DB/ other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});