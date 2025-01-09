import React, { useState, useRef, useEffect } from 'react';
import { IArquivoModal } from 'app/shared/model/arquivo-modals.model';
import { IArquivo } from 'app/shared/model/arquivo.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUpload } from '@fortawesome/free-solid-svg-icons';
import './DropzoneComponents.scss';

interface DragAndDropProps {
  arquivoList: IArquivoModal;
  setArquivoList: React.Dispatch<React.SetStateAction<IArquivoModal>>;
  multiFiles?: boolean;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ arquivoList, setArquivoList, multiFiles = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragCounter.current = 0;
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = () => {
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    processFiles(selectedFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (files: File[]) => {
    const validFiles = multiFiles ? files : [files[0]]; // Permite apenas um arquivo se multiFiles for false

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Content = base64.split(',')[1];
        addFileToList(file, base64Content);
      };
      reader.readAsDataURL(file);
    });
  };

  const addFileToList = (file: File, base64: string) => {
    const newFile: IArquivo = {
      documento: base64,
      nomeDocumento: file.name,
      documentoContentType: file.type,
      id: null,
      tipoDocumento: null,
    };

    setArquivoList(prevList => {
      if (multiFiles) {
        return {
          ...prevList,
          arquivos: prevList.arquivos ? [...prevList.arquivos, newFile] : [newFile],
        };
      } else {
        return {
          ...prevList,
          arquivos: [newFile], // Substitui o arquivo existente
        };
      }
    });
  };

  useEffect(() => {
    const handleWindowDragEnter = (event: DragEvent) => {
      event.preventDefault();
      dragCounter.current += 1;
      setIsDragging(true);
    };

    const handleWindowDragLeave = (event: DragEvent) => {
      event.preventDefault();
      dragCounter.current -= 1;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    };

    window.addEventListener('dragenter', handleWindowDragEnter);
    window.addEventListener('dragleave', handleWindowDragLeave);

    return () => {
      window.removeEventListener('dragenter', handleWindowDragEnter);
      window.removeEventListener('dragleave', handleWindowDragLeave);
    };
  }, []);

  return (
    <div className="dropzone-container" >
      {!isDragging && (
        <button type="button" onClick={handleButtonClick} className="button-dropzone-component">
          <FontAwesomeIcon icon={arquivoList?.arquivos?.length === 1 && !multiFiles ? faFile : faUpload} />
          <span style={multiFiles ? {} : { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {arquivoList?.arquivos?.length === 1 && !multiFiles ? arquivoList?.arquivos[0]?.nomeDocumento : 'Selecionar arquivos'}
          </span>
        </button>
      )}
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} multiple={multiFiles} />
      {isDragging && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className="dropzone-container-drag"
        >
          <p>Arraste e solte os arquivos aqui</p>
        </div>
      )}
      {arquivoList && arquivoList?.arquivos?.length !== 0 && multiFiles && (
        <div className="dropzone-files-container">
          {arquivoList?.arquivos?.map((arquivo, index) => (
            <div key={index} className="dropzone-files-data">
              <FontAwesomeIcon icon={faFile} />
              <span>{arquivo?.nomeDocumento}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
