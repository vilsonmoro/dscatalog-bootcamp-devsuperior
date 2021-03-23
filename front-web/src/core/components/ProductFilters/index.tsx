import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg';
import './styles.scss';
import { Category } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import Select from 'react-select';

export type FilterForm = {
    name?: string;
    categoryId?: number;
  }
  
  type Props = {
    onSearch: (filter: FilterForm) => void;
  }

const ProductFilters = ({ onSearch }: Props) => {
    const [ categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadCategories] = useState(false);
    const [name, setName] = useState('');
    
    useEffect(() => {
        setIsLoadCategories(false)
        makeRequest({ url: '/categories'})
        .then(response => setCategories(response.data.content))
        .finally(() => setIsLoadCategories(false))       
    },[]);

    const handleChangeName = (name: string) => {
          setName(name);
          onSearch({name});
    }

    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input type="text"
                    className="form-control"
                    placeholder="Pesquisar produto"
                    value={name}
                    onChange={ event => handleChangeName(event.target.value )}
                />
                <SearchIcon />
            </div>
            <Select
                name="categories"
                rules={{ required: true }}
                isLoading={isLoadingCategories}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                className="filter-select-container"
                classNamePrefix="product-categories-select"
                placeholder="Categoria"
            />
            <button className="btn btn-outline-secondary border-radius-10">
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default ProductFilters;
