import React, { useCallback, useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/entities/employee/model/employeesSlice';
import debounce from 'lodash/debounce';

export const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            dispatch(setSearchQuery(value));
        }, 300),
        [dispatch]
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value); 
        debouncedSearch(value); 
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Поиск сотрудников..."
            onChange={handleSearch}
            value={inputValue}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{ mb: 3 }}
        />
    );
};
