export const LoadingScreen = () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du système...</p>
        </div>
    </div>
);