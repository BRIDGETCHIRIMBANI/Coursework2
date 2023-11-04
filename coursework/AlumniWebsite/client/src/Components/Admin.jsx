import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

function Admin() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch and set the users list from your API
    fetch('/api/signup')
      .then((response) => {
        if (!response.ok) {
          console.error('Error:', response.status, response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleRemove = (userId) => {
    // Implement the logic to remove the user based on their userId
    // You can send a DELETE request to your server's API
    fetch(`/api/signup/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the user from the list after successful removal
          setUsers(users.filter((user) => user._id !== userId));
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      })
      .catch((error) => console.error('Error removing user:', error));
  };

  const handleSaveEdit = () => {
    // Implement the logic to save the edited user data
    // You can send a PUT request to your server's API
    fetch(`/api/signup/${editingUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingUser),
    })
      .then((response) => {
        if (response.ok) {
          setEditingUser(null); // Clear the editing state after successful edit
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      })
      .catch((error) => console.error('Error saving user edit:', error));
  };

  return (
    <div>
      <h2>Alumni List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Profession</th>
            <th>Location</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="text"
                    value={editingUser.fullName}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        fullName: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.fullName
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.profession}</td>
              <td>{user.location}</td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <Button variant="success" onClick={handleSaveEdit}>
                    Save
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(user._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Admin;
