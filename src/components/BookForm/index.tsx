import React, { useState } from 'react';
import styles from './BookForm.module.css';

interface BookFormProps {
    addBook: (title: string, author: string, year: number) => void;
}

const BookForm: React.FC<BookFormProps> = ({ addBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && author && year > 0) {
            addBook(title, author, year);
            setTitle('');
            setAuthor('');
            setYear(0);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.bookForm}>
            <input
                type="text"
                placeholder="Название книги"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Автор"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="number"
                placeholder="Год издания"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
            />
            <button type="submit">Добавить книгу</button>
        </form>
    );
};

export default BookForm;
