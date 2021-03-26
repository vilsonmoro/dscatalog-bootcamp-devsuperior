import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';

type ParamsType = {
    categoryId: string;
}

export type FormState = {
    name: string;
}

const Form = () => {
    const { register, errors, handleSubmit, setValue } = useForm<FormState>();
    const { categoryId } = useParams<ParamsType>();
    const isEditing = categoryId !== 'create';
    const formTitle = isEditing ? "EDITAR UMA CATEGORIA" : "CADASTRAR UMA CATEGORIA";
    const history = useHistory();

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${categoryId}` })
                .then(response => {
                    setValue('name', response.data.name);                  
                });
        }
    }, [categoryId, isEditing, setValue]);


    const onSubmit = (data: FormState) => {
        const payload = {
            ...data
        }
        makePrivateRequest({ 
            url: isEditing ? `/categories/${categoryId}` : '/categories', 
            method: isEditing ? 'PUT' : 'POST', 
            data: payload })
            .then(() => {
                toast.info('Categoria salvo com sucesso');
                history.push('/admin/categories');
            })
            .catch(() => {
                toast.error("Erro ao salvar categoria.");
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm
                title={formTitle} >
                <div >
                    <div className="margin-bottom-30">
                        <input
                            ref={register({
                                required: "Campo obrigatório"
                            })}
                            name="name"
                            type="text"
                            className="form-control  input-base"
                            placeholder="Nome da categoria"
                        />

                        {errors.name && (
                            <div className="invalid-feedback d-block">
                                {errors.name.message}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>

    )
}

export default Form;