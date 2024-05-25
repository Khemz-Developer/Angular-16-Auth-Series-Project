import Book from "../models/Book.js";

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { getBooks };