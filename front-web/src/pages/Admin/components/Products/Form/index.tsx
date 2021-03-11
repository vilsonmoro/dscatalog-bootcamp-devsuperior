import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
        description: ''
    });


    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));//conserva o estado antigo e insere novo        
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://tse1.explicit.bing.net/th?id=OIP.3kec-l7P_kbtmdryn4wn0QHaK4&pid=Api&P=0&w=300&h=300ya',
            categories: [ formData.category ]
        }

        makePrivateRequest({ url: '/products', method: 'POST', data: payload })
            .then(() => {
                setFormData({ name: '', price: '', category: '', description: '' })
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />

                        <select
                            value={formData.category}
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            name="category"
                        >
                            <option value="1">Livros </option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletronicos</option>
                        </select>

                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleOnChange}
                            cols={30}
                            rows={10} />
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;