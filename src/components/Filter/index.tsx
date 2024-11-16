import React from 'react';
import styles from './Filter.module.css';

interface FilterProps {
    filter: 'все' | 'прочитано' | 'не прочитано';
    setFilter: React.Dispatch<
        React.SetStateAction<'все' | 'прочитано' | 'не прочитано'>
    >;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
    return (
        <div className={styles.filter}>
            <label className={styles.label}>Фильтр по статусу: </label>
            <select
                value={filter}
                onChange={(e) =>
                    setFilter(
                        e.target.value as 'все' | 'прочитано' | 'не прочитано'
                    )
                }
                className={styles.select}
            >
                <option value="все">Все</option>
                <option value="прочитано">Прочитано</option>
                <option value="не прочитано">Не прочитано</option>
            </select>
        </div>
    );
};

export default Filter;
