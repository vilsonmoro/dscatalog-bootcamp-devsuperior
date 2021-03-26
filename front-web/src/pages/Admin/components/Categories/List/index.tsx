import Card from 'core/components/Card';
import { CategoriesResponse } from 'core/types/Product';
import { makePrivateRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';

const ListCategories = () => {
    const [categoriesResponse, setCategoriesResponse] = useState<CategoriesResponse>();
    const [activePage, setActivePage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        //inciar loader
        setIsLoading(true);
        //fazer requisição
        makePrivateRequest({ url: '/categories', params })
            .then(response => setCategoriesResponse(response.data))
            .finally(() => {
                //finaliza loader
                setIsLoading(false);
            });
    }, [activePage]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);


    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente exlcuir este produto');
    }
    return (
        <div>
            {categoriesResponse?.content.map(category => (
                <Card
                    category={category}
                    onRemove={onRemove}
                />
            ))}
        </div>
    )
}

export default ListCategories;