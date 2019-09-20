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
    //const x = 'xxx';
    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('body', userId);
    formData.append('body', file.name);
    //formData.append('body', x);

    console.log(file);
    axios
      .put('http://localhost:8888/upload/udoc', formData)
      .then(response => {
        if (response.status == 200 && !response.message) {
          alert('файл добавлен');
        }
        console.log(response);
        if (response.message) {
          alert(response.message);
        }
        console.log('successful file upload');
      })
      .catch(error => {
        console.log(error);
      });
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
