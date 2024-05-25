import BookJson from './Bookstore.books.json' assert { type: 'json' };
import Book from './models/Book.js';

const seedBooks = async () => {
    try {
        await Book.deleteMany({});
        await Book.insertMany(BookJson);
        console.log('Data imported successfully');
    } catch (error) {
        console.error('Error importing data', error);
    }
}

export default seedBooks;