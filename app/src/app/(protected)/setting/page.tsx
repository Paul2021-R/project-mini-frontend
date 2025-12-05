export default function SettingPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Account Settings</h3>
                    <p className="text-sm text-gray-500">Manage your account details here.</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Invitation Code</h3>
                    <input type="text" placeholder="Enter code" className="border p-2 rounded w-full max-w-sm" />
                </div>
                <div>
                    <button className="bg-black text-white px-4 py-2 rounded">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
