import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editData, setEditData] = useState({ name: '', email: '', alamat: '', no_tlfn: '' });

    // Fetch all users (admin only)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users', { withCredentials: true });
                setUsers(response.data);
            } catch (error) {
                console.error('Gagal mengambil data pengguna:', error);
            }
        };

        fetchUsers();
    }, []);

    // Start editing user
    const startEditing = (user) => {
        setEditingId(user.id);
        setEditData({
            name: user.name,
            email: user.email,
            alamat: user.alamat || '',
            no_tlfn: user.no_tlfn || '',
        });
    };

    // Handle form changes
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    // Save user edits
    const saveEdit = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/user/${id}`, editData, { withCredentials: true });

            setUsers(users.map((user) => (user.id === id ? { ...user, ...editData } : user)));
            setEditingId(null);
            alert('User berhasil diperbarui!');
        } catch (error) {
            console.error('Gagal memperbarui user:', error);
            alert('Gagal memperbarui user. Silakan coba lagi.');
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
    };

    // Delete user (admin only)
    const deleteUser = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            try {
                await axios.delete(`http://localhost:5000/api/user/${id}`, { withCredentials: true });

                setUsers(users.filter((user) => user.id !== id));
                alert('User berhasil dihapus!');
            } catch (error) {
                console.error('Gagal menghapus user:', error);
                alert('Gagal menghapus user. Silakan coba lagi.');
            }
        }
    };

    return (
        <div className="manage-users-container">
            <h1 className="text-center text-3xl font-bold text-white mb-6">Manage Users</h1>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Cari nama atau email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Alamat</th>
                            <th>No Telepon</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                {editingId === user.id ? (
                                    <>
                                        <td><input type="text" name="name" value={editData.name} onChange={handleEditChange} /></td>
                                        <td><input type="email" name="email" value={editData.email} onChange={handleEditChange} /></td>
                                        <td><input type="text" name="alamat" value={editData.alamat} onChange={handleEditChange} /></td>
                                        <td><input type="text" name="no_tlfn" value={editData.no_tlfn} onChange={handleEditChange} /></td>
                                    </>
                                ) : (
                                    <>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.alamat || 'Belum diisi'}</td>
                                        <td>{user.no_tlfn || 'Belum diisi'}</td>
                                    </>
                                )}
                                <td>
                                    {editingId === user.id ? (
                                        <>
                                            <button onClick={() => saveEdit(user.id)}>✔ Simpan</button>
                                            <button onClick={cancelEdit}>✖ Batal</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEditing(user)}>✏ Edit</button>
                                            <button onClick={() => deleteUser(user.id)}>🗑 Hapus</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
