import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';


// border: "3px dashed #d9d9d9"

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 3,
    borderRadius: 2,
    borderColor: '#d9d9d9',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const FileDropZoneColors = {
    active: '#2196f3',
    accept: '#00e676',
    reject: '#ff1744'
  }
  
  const activeStyle = {
    borderColor: FileDropZoneColors.active,
  };
  
  const acceptStyle = {
    borderColor: FileDropZoneColors.accept,
  };
  
  const rejectStyle = {
    borderColor: FileDropZoneColors.reject,
  };

const FileDropZone = ({ onDrop, children, parentCanDrop, parentIsOver }) => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: "application/JSON",
        onDrop,
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...((isDragAccept || parentCanDrop) ? acceptStyle : {}),
        ...((isDragReject || (parentCanDrop && !parentIsOver)) ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept,
        parentCanDrop,
        parentIsOver,
      ]);

    return (
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            { children }
        </div>

    );
}

export default FileDropZone;