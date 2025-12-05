export default function MaterialsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Materials</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-dashed border-gray-300 min-h-[200px] flex items-center justify-center">
                <p className="text-gray-500">Drag & drop files here or click to upload</p>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Uploaded Materials</h2>
                <div className="space-y-2">
                    {/* List placeholder */}
                    <p className="text-sm text-gray-400">No materials uploaded yet.</p>
                </div>
            </div>
        </div>
    );
}
