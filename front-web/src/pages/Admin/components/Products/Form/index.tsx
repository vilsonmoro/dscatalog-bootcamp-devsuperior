import { makeRequest } from 'core/utils/request';
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
        console.log(formData);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fgmedia.playstation.com%2Fis%2Fimage%2FSIEPDC%2Fps4-slim-image-block-01-en-24jul20%3F%24native--t%24&imgrefurl=https%3A%2F%2Fwww.playstation.com%2Fpt-br%2Fps4%2F&tbnid=HjUqDcNWTt-4sM&vet=12ahUKEwji8dvZ6-LuAhUyMbkGHTLtD10QMygAegUIARDrAQ..i&docid=gR7sUueKaqPhZM&w=600&h=600&hl=en&safe=active&ved=2ahUKEwji8dvZ6-LuAhUyMbkGHTLtD10QMygAegUIARDrAQ',
            categories: [{ 'id': formData.category }]
        }

        makeRequest({ url: '/products', method: 'POST', data: payload })
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