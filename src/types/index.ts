export interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
    status: 'прочитано' | 'не прочитано';
}