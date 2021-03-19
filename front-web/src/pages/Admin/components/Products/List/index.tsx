import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';

const List = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        //inciar loader
        setIsLoading(true);
        //fazer requisição
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                //finaliza loader
                setIsLoading(false);
            });
    }, [activePage]);

    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate} >
                ADICIONAR
           </button>
            <div className="admin-list-container">
                {productsResponse?.content.map(product => (
                    <Card product={product} key={product.id} />
                ))}
            </div>
            {productsResponse &&
                <Pagination
                    totalPages={productsResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />}
        </div>
    );
}

export default List;