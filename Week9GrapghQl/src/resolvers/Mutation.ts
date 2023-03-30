import books from "../data"

export default {
    addBook: (_parent, {input}, _context) => {
        const book = {
            id: books.length +1,
            title: input.title,
            author: input.author
        }
        books.push(book)
        return book;
    },
    deleteBook: (_parent, {id}, _context) => {
        const book = books.find(book => book.id === parseInt(id));
        console.log(book.id);
        
        books.splice(books.indexOf(book), 1);
        return book;
        
    }
}