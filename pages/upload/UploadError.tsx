import { FormErrorMessage, Progress } from '@chakra-ui/react';

  import React from 'react';
  import { FileError } from 'react-dropzone';
  import { FileHeader } from './FileHeader';
  
  export interface UploadErrorProps {
    file: File;
    onDelete: (file: File) => void;
    errors: FileError[];
  }
  

  
  export function UploadError({ file, onDelete, errors }: UploadErrorProps) {
    return (
      <React.Fragment>
        <FileHeader file={file} onDelete={onDelete} />
        <Progress size='md' value={100} />
        {errors.map((error) => (
          <div key={error.code}>
            <FormErrorMessage>{error.message}</FormErrorMessage>
          </div>
        ))}
      </React.Fragment>
    );
  }