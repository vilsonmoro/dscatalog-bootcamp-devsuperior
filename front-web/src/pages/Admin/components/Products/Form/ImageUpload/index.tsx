import React, { useState } from 'react';
import { ReactComponent as UploadPlaceHolder } from 'core/assets/images/upload-placeholder.svg';
import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';

type Props = {
    onUpLoadSuccess: (imgUrl: string) => void;
    productImgUrl: string;

}

const ImageUpload = ({onUpLoadSuccess, productImgUrl}: Props) => {
    const [uploadProgress, setuploadProgress] = useState(0);
    const [upLoadedImgUrl, setupLoadedImgUrl] = useState("");
    const imgUrl = upLoadedImgUrl || productImgUrl;

    const onUploadProgress = (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setuploadProgress(progress);
    }

    const uploadImage = (selectedeImage: File) => {
        const payload = new FormData();
        payload.append('file', selectedeImage);

        makePrivateRequest({
            url: '/products/image',
            method: "POST",
            data: payload,
            onUploadProgress
        })
            .then((response) => {
                setupLoadedImgUrl(response.data.uri);
                onUpLoadSuccess(response.data.uri);
            })
            .catch(() => {
                toast.error("Erro ao enviar arquivo");
            })
            .finally(() => setuploadProgress(0))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedeImage = event.target.files?.[0];
        if (selectedeImage) {
            uploadImage(selectedeImage);
        }
    }
    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input
                        type="file"
                        id="upload"
                        accept="image/png, image/jpg"
                        onChange={handleChange}
                        hidden
                    />
                    <label
                        htmlFor="upload" >ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">A imagem deve ser  JPG ou PNG e não deve ultrapassar
               <strong> 5 mb</strong> .</small>
            </div>
            <div className="col-6 upload-placeholder">
                {uploadProgress > 0 && (
                    <>
                        <UploadPlaceHolder />
                        <div className="upload-progress-container">
                            <div
                                className="upload-progress"
                                style={{ width: `${uploadProgress}%` }}>
                            </div>
                        </div>
                    </>
                )}
                {(imgUrl && uploadProgress === 0) && (
                  <img
                    src={imgUrl}
                    alt={imgUrl}
                    className="uploaded-image" />
                 )}
            </div>
        </div>
    )
}

export default ImageUpload;