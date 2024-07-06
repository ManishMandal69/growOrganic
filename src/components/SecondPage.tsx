import  { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Post } from '../types/Post';
import { Container, Typography } from '@mui/material';
import DepartmentList from './DepartmentList';

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ pageSize: 5, page: 0 });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 100 },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts Data
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={posts}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          pageSizeOptions={[5, 10, 25]} 
        />
      </div>
      <Typography variant="h4" gutterBottom>
        Departments and Sub-Departments
      </Typography>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
