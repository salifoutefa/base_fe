import { Box, Button, GridItem, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <Box>
    <SimpleGrid >
    <GridItem
        mt={[5, null, 0]}
        colSpan={{
          md: 2,
        }}
      >
        {file.name}
        </GridItem>
      
      <GridItem >
        <Button size="small" onClick={() => onDelete(file)}>
          Delete
        </Button>
      </GridItem>

    </SimpleGrid>
    </Box>
  );
}