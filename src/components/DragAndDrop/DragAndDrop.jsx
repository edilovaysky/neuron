import './DragAndDrop.scss';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export const DragAndDrop = props => {
  const [chosenFile, setChosenFile] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    let file = acceptedFiles[0];

    setChosenFile(file.name);
    const userId = props.userId;
    const docType = props.docType;

    if (docType == 'udoc') {
      let formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('body', userId);
      formData.append('body', file.name);

      axios
        .put('http://localhost:8888/upload/udoc', formData)
        .then(response => {
          if (
            response.status == 200 &&
            response.data == 'файл успешно добавлен'
          ) {
            alert(response.data);
            console.log('successful file upload');
          }
          if (response.data == 'Документ с этим именем уже существует') {
            alert(response.data);
            console.log('failed file upload');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (docType == 'lesson') {
      let { onSuccess } = props;
      let formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('body', file.name);
      onSuccess(formData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="drop-wrap" {...getRootProps()}>
      <input className="drop-input" {...getInputProps()} />
      <p>Перетащите сюда файлы, или кликните чтобы их выбрать.</p>
      <ul>
        <li>{chosenFile}</li>
      </ul>
    </div>
  );
};
