// src/pages/AdminSettings.js
import React, { useState } from 'react';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        username: 'AdminUser',
        email: 'admin@example.com',
        theme: 'dark',
        userManagementAccess: true,
        systemReportAccess: true,
    });
    const [editMode, setEditMode] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const saveSettings = () => {
        console.log('Admin settings saved:', settings);
        setEditMode(false);
    };

    const cancelEdit = () => {
        setEditMode(false);
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px' }} className="input-card p-4">
            <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
            <p className="text-gray-300">Manage admin-specific settings.</p>

            <div className="mt-6 space-y-4">
                {/* Pengaturan Dasar */}
                <div className="flex flex-col">
                    <label className="text-white">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={settings.username}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="p-2 rounded-md bg-[#171E28] text-white border border-gray-600"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="p-2 rounded-md bg-[#171E28] text-white border border-gray-600"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white">Theme</label>
                    <select
                        name="theme"
                        value={settings.theme}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="p-2 rounded-md bg-[#171E28] text-white border border-gray-600"
                    >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>

                {/* Pengaturan Khusus Admin */}
                <div className="flex flex-col">
                    <label className="text-white">User Management Access</label>
                    <input
                        type="checkbox"
                        name="userManagementAccess"
                        checked={settings.userManagementAccess}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white">System Report Access</label>
                    <input
                        type="checkbox"
                        name="systemReportAccess"
                        checked={settings.systemReportAccess}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="rounded-md"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
                {editMode ? (
                    <>
                        <button
                            onClick={saveSettings}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                            Save
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setEditMode(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminSettings;
