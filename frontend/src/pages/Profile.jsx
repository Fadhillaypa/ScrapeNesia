import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Profile.css'; // Pastikan CSS sudah terhubung

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        alamat: '',
        no_tlfn: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedData = JSON.parse(userData);
            setUser(parsedData);
            setFormData({
                name: parsedData.name || '',
                email: parsedData.email || '',
                alamat: parsedData.alamat || '',
                no_tlfn: parsedData.no_tlfn || '',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (!user || !user.id) {
            console.error('User ID tidak ditemukan');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:5000/api/user/${user.id}`,
                formData,
                { withCredentials: true }
            );
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setIsEditing(false);
            alert('Profil berhasil diperbarui!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Gagal memperbarui profil. Silakan coba lagi.');
        }
    };

    const handleDelete = async () => {
        if (!user || !user.id) {
            console.error('User ID tidak ditemukan');
            return;
        }

        if (window.confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
            try {
                await axios.delete(`http://localhost:5000/api/user/${user.id}`, { withCredentials: true });
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                alert('Akun berhasil dihapus!');
                navigate('/login');
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Gagal menghapus akun. Silakan coba lagi.');
            }
        }
    };

    if (!user) {
        return <p className="text-red-500 text-center text-xl mt-10">🔴 User tidak ditemukan! Silakan login ulang.</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="text-center text-2xl font-bold mb-6">Profil Pengguna</h1>

            {isEditing ? (
                <div className="profile-form">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" />
                    <input type="text" name="no_tlfn" value={formData.no_tlfn} onChange={handleChange} placeholder="No Telepon" />

                    <div className="profile-buttons">
                        <button className="button save-button" onClick={handleSave}>Simpan</button>
                        <button className="button cancel-button" onClick={() => setIsEditing(false)}>Batal</button>
                    </div>
                </div>
            ) : (
                <div className="profile-details">
                    <p><strong>Nama:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Alamat:</strong> {user.alamat || 'Belum diisi'}</p>
                    <p><strong>No Telepon:</strong> {user.no_tlfn || 'Belum diisi'}</p>
                    <p><strong>Role:</strong> {user.role || 'User'}</p>

                    <div className="profile-buttons">
                        <button className="button edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="button delete-button" onClick={handleDelete}>Hapus Akun</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../style/Profile.css';

// const Profile = () => {
//     const [user, setUser] = useState({});
//     const [editing, setEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         address: '',
//         phone: '',
//         role: '',
//     });

//     const navigate = useNavigate(); // Inisialisasi navigate

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const userId = localStorage.getItem('userId'); // Ambil ID pengguna dari localStorage

//             if (!userId) {
//                 alert('You are not logged in!');
//                 navigate('/login'); // Redirect ke halaman login jika ID tidak ditemukan
//                 return;
//             }

//             try {
//                 const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
//                 setUser(response.data);
//                 setFormData({
//                     name: response.data.name || '',
//                     email: response.data.email || '',
//                     address: response.data.alamat || '',
//                     phone: response.data.no_tlfn || '',
//                     role: response.data.role || '',
//                 });
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, [navigate]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSave = async () => {
//         const userId = localStorage.getItem('userId'); // Ambil ID pengguna dari localStorage

//         try {
//             const response = await axios.put(`http://localhost:8000/api/user/${userId}`, formData);
//             setUser(response.data.user);
//             setEditing(false);
//             alert('Profile updated successfully!');
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };

//     const handleDelete = async () => {
//         const userId = localStorage.getItem('userId'); // Ambil ID pengguna dari localStorage

//         if (window.confirm('Are you sure you want to delete this profile?')) {
//             try {
//                 await axios.delete(`http://localhost:8000/api/user/${userId}`);
//                 alert('Profile deleted successfully!');
//                 localStorage.removeItem('userId'); // Hapus ID pengguna dari localStorage
//                 navigate('/login'); // Navigasikan ke halaman login
//             } catch (error) {
//                 console.error('Error deleting profile:', error);
//             }
//         }
//     };

//     return (
//         <div className="profile-container">
//             <h1 className="text-center mb-4">Profile</h1>
//             {editing ? (
//                 <div className="profile-form">
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name || ''}
//                         onChange={handleInputChange}
//                         placeholder="Name"
//                         className="input-field"
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email || ''}
//                         onChange={handleInputChange}
//                         placeholder="Email"
//                         className="input-field"
//                     />
//                     <input
//                         type="text"
//                         name="alamat"
//                         value={formData.alamat || ''}
//                         onChange={handleInputChange}
//                         placeholder="Address"
//                         className="input-field"
//                     />
//                     <input
//                         type="text"
//                         name="no_tlfn"
//                         value={formData.no_tlfn || ''}
//                         onChange={handleInputChange}
//                         placeholder="Phone Number"
//                         className="input-field"
//                     />
//                     <input
//                         type="text"
//                         name="role"
//                         value={formData.role || ''}
//                         onChange={handleInputChange}
//                         placeholder="Role"
//                         className="input-field"
//                     />

//                     <div className="profile-buttons">
//                         <button onClick={handleSave} className="save-button button">
//                             Save
//                         </button>
//                         <button onClick={() => setEditing(false)} className="cancel-button button">
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="profile-details">
//                     <p>
//                         <strong>Name:</strong> {user.name}
//                     </p>
//                     <p>
//                         <strong>Email:</strong> {user.email}
//                     </p>
//                     <p>
//                         <strong>Address:</strong> {user.alamat}
//                     </p>
//                     <p>
//                         <strong>Phone Number:</strong> {user.no_tlfn}
//                     </p>
//                     <p>
//                         <strong>Role:</strong> {user.role}
//                     </p>
//                     <div className="profile-buttons">
//                         <button onClick={() => setEditing(true)} className="edit-button button">
//                             Edit
//                         </button>
//                         <button onClick={handleDelete} className="delete-button button">
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;
