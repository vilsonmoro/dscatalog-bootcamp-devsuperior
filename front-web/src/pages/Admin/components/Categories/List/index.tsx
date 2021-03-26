import Card from 'core/components/Card';
import Pagination from 'core/components/Pagination';
import { CategoriesResponse } from 'core/types/Product';
import { makePrivateRequest } from 'core/utils/request';
import CardLoader from 'pages/Catalog/components/Loaders/CardLoader';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const ListCategories = () => {
    const [categoriesResponse, setCategoriesResponse] = useState<CategoriesResponse>();
    const [activePage, setActivePage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 8,
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


    const onRemove = (categoryId: number) => {
        const confirm = window.confirm('Deseja realmente exlcuir esta categoria?');
        if (confirm) {
            makePrivateRequest({ url: `/categories/${categoryId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Categoria removida com sucesso');
                    getCategories();
                })
                .catch(() => {
                    toast.error("Erro ao remover categoria.");
                });
        }
    }
    const history = useHistory();
    const handleCreate = () => {
        history.push('/admin/categories/create');
    }

    return (        
        <div className="admin-products-list">
            <div className="d-flex justify-content-between margin-bottom-40">
            <button className="btn btn-primary btn-lg" onClick={handleCreate} >
                    ADICIONAR
                </button>                
            </div>

            <div>
                {isLoading ? <CardLoader /> : (categoriesResponse?.content.map(category => (
                    <Card
                        category={category}
                        onRemove={onRemove}
                        key={category.id}
                    />
                )))}
            </div>
            {categoriesResponse &&
                <Pagination
                    totalPages={categoriesResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />}
        </div>
    )
}

export default ListCategories;