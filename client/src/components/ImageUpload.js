import React /* { useState } */ from 'react';
import ImageUploading from "react-images-uploading";
//import { imgUpload } from '../services/imgUpload';
import {UploadOutlined, SwapOutlined, DeleteTwoTone,LoadingOutlined, FileImageOutlined, CheckOutlined} from '@ant-design/icons'



const ImageUpload = (props) => {
    
    const { image, images, setImages, urlImage,setUrlImage,loading, onUpload} = props

    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log("Llegue al onChange")
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    };

    console.log(images)
    return (
        <div>
            <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg","png"]}
            >
        {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
        }) => (
          // write your building UI
            <div className="upload__mage-wrapper">
                {
                    images[0]?
                    imageList?.map((image, index) => (
                        <div key={index} className="image-item">
                            <div className="image-container-upload">
    
                                <img  src={image.data_url} alt="" width="150" />
                                <div className="image-item__btn-wrapper">
                                    {
                                        loading?
                                                <p className='loading-label'>Subiendo imagen <LoadingOutlined /></p>
                                                :
                                            <div className='btn-container-icon'>
                                                <div className="icon-buton" >
                                                    {urlImage?
                                                    <>
                                                        <CheckOutlined className="me-2" style={{ fontSize: '1.5em', color: '#000' }}/>
                                                        <p className='icon-text'>Imagen subida correctamente</p>
                                                    </>
                                                    :
                                                    <>
                                                        <UploadOutlined className="me-2" style={{ fontSize: '1.5em', color: '#000' }} onClick={onUpload}/>
                                                        <p className='icon-text'>Subir imagen</p>
                                                    </>
                                                    }
                                                </div>
                                                <div className="icon-buton">
                                                    <SwapOutlined style={{ fontSize: '1.5em', color: '#08c' }} className="me-2"onClick={() => {
                                                        onImageUpdate(index)
                                                        setUrlImage('')
                                                        }}/>
                                                    <p className='icon-text'>Cambiar imagen</p>
                                                </div>
                                                <div className="icon-buton">
                                                    <DeleteTwoTone twoToneColor="#eb2f96"  style={{ fontSize: '1.5em'}}className="me-2"onClick={() => {
                                                        onImageRemove(index)
                                                        setUrlImage('')
                                                        }}/>
                                                    <p className='icon-text'>Borrar imagen</p>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div className="img-btn"
                    variant= {isDragging ? "success":"secondary"}
                    onClick={onImageUpload}
                    {...dragProps}>
                        <FileImageOutlined style={{fontSize: '2em', color: isDragging ? "#08c":"#D4D7D90"}}/>
                        <p className='icon-text'style={{color: isDragging ? "#08c":"#D4D7D90"}}>Arrastre imagen aquí</p>
                    </div>
                }
            </div>
        )}
    </ImageUploading>
        </div>
    );
}

export default ImageUpload;
