import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Filter from './components/Filter';
import { Book } from './types';



const App: React.FC = () => {
    const API_URL = 'https://67995c162e335028.mokky.dev';
    const [books, setBooks] = useState<Book[]>([]);
    const [filter, setFilter] = useState<'все' | 'прочитано' | 'не прочитано'>(
        'все'
    );

    useEffect(() => {
        // Запрос книг с сервера mokky при загрузке страницы
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${API_URL}/books`);
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Ошибка при получении книг с сервера:', error);
            }
        };
        fetchBooks();
    }, []);

    const addBook = async (title: string, author: string, year: number) => {
        const newBook: Book = {
            id: Date.now().toString(),
            title,
            author,
            year,
            status: 'не прочитано',
        };
        try {
            // Отправка новой книги на сервер mokky
            await fetch(`${API_URL}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });
            setBooks([...books, newBook]);
        } catch (error) {
            console.error('Ошибка при добавлении книги на сервер:', error);
        }
    };

    const updateBook = async (id: string, updatedDetails: Partial<Book>) => {
        try {
            const updatedBook = books.find((book) => book.id === id);
            if (updatedBook) {
                const newBook = { ...updatedBook, ...updatedDetails };
                await fetch(`${API_URL}/books/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newBook),
                });
                setBooks(
                    books.map((book) => (book.id === id ? newBook : book))
                );
            }
        } catch (error) {
            console.error('Ошибка при обновлении книги на сервере:', error);
        }
    };

    const deleteBook = async (id: string) => {
        try {
            await fetch(`${API_URL}/books/${id}`, {
                method: 'DELETE',
            });
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении книги с сервера:', error);
        }
    };

    const filteredBooks = books.filter((book) =>
        filter === 'все' ? true : book.status === filter
    );

    return (
        <div className="App">
            <h1 className="title">Библиотечная система</h1>
            <BookForm addBook={addBook} />
            <Filter filter={filter} setFilter={setFilter} />
            <BookList
                books={filteredBooks}
                updateBook={updateBook}
                deleteBook={deleteBook}
            />
        </div>
    );
};

export default App;
