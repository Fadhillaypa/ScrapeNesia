// src/pages/UserSettings.js
import React, { useState } from 'react';

const UserSettings = () => {
    const [settings, setSettings] = useState({
        username: 'UserExample',
        email: 'user@example.com',
        theme: 'dark',
    });
    const [editMode, setEditMode] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings({
            ...settings,
            [name]: value,
        });
    };

    const saveSettings = () => {
        console.log('User settings saved:', settings);
        setEditMode(false);
    };

    const cancelEdit = () => {
        setEditMode(false);
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px' }} className="input-card p-4">
            <h1 className="text-2xl font-bold text-white">User Settings</h1>
            <p className="text-gray-300">Update your account settings and preferences.</p>

            <div className="mt-6 space-y-4">
                {/* Username */}
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

                {/* Email */}
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

                {/* Theme Preference */}
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
            </div>

            <div className="flex justify-end mt-6 space-x-4">
                {editMode ? (
                    <>
                        <button
                            onClick={saveSettings}
                            className="px-4 py-2 bg-[#171E28] text-white rounded-md"
                        >
                            Save
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="px-4 py-2 bg-[#171E28] text-white rounded-md"
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

export default UserSettings;
