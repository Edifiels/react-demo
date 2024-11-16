import React from 'react';
import styles from './BookList.module.css';
import { Book } from '../../types';

interface BookListProps {
    books: Book[];
    updateBook: (id: string, updatedDetails: Partial<Book>) => void;
    deleteBook: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({
    books,
    updateBook,
    deleteBook,
}) => {
    return (
        <ul className={styles.bookList}>
            {books.map((book) => (
                <li key={book.id} className={styles.bookItem}>
                    <div className={styles.bookDetails}>
                        <h3 className={styles.bookTitle}>
                            {book.title} ({book.year}) - {book.author}
                        </h3>
                        <p className={styles.bookStatus}>
                            Статус: {book.status}
                        </p>
                    </div>
                    <div className={styles.buttons}>
                        <button
                            onClick={() =>
                                updateBook(book.id, {
                                    status:
                                        book.status === 'прочитано'
                                            ? 'не прочитано'
                                            : 'прочитано',
                                })
                            }
                            className={styles.statusButton}
                        >
                            Изменить статус
                        </button>
                        <button
                            onClick={() => deleteBook(book.id)}
                            className={styles.deleteButton}
                        >
                            Удалить
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BookList;
