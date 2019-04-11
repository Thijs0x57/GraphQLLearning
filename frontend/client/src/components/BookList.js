import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
    displayBooks() {
        var data = this.props.data;
        if (!data.loading) {
            return data.books.map(book => {
                return (
                    <li key={book.id}>
                        {book.name}
                    </li>
                );
            })
        }
        else {
            return (<div>Loading books...</div>)
        }
    }
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
