import { Card, CardBody } from '@chakra-ui/card'
import { Button, Grid } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { array, object, string } from 'yup';
import { MultipleFileUploadField } from '../upload/MultipleFileUploadField';

export default function Home() {
  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{ files: [] }}
          validationSchema={object({
            files: array(
              object({
                url: string().required(),
              })
            ),
          })}
          onSubmit={(values) => {
            console.log('values', values);
            return new Promise((res) => setTimeout(res, 2000));
          }}
        >
          {({ values, errors, isValid, isSubmitting }) => (
            <Form>
              <Grid >
                <MultipleFileUploadField name="files" />

                <Grid >
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid || isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}