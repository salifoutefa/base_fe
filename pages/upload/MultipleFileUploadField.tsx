import { Grid } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId;
}

export interface UploadableFile {
  // id was added after the video being released to fix a bug
  // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
  // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}


export function MultipleFileUploadField({ name }: { name: string }) {
  const [_, __, helpers] = useField(name);
  //const classes = useStyles();

  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true);
  }, [files]);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg']
    },
    maxSize: 10000 * 1024, // 10 MB
  });

  return (
    <React.Fragment>
      <Grid>
        <div {...getRootProps({})}>
          <input {...getInputProps()} />

          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Grid>

      {files.map((fileWrapper) => (
        <Grid key={fileWrapper.id}>
          {fileWrapper.errors.length ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
            />
          ) : (
            <SingleFileUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              file={fileWrapper.file}
            />
          )}
        </Grid>
      ))}
    </React.Fragment>
  );
}