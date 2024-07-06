import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const Navigate = useNavigate()
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userDetails = { name, phone, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    Navigate('/second-page');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Details Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
