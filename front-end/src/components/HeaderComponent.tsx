import { Phone } from 'lucide-react';

export const Header = ({ isConnected }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                    <Phone className="mr-3 text-blue-600" size={32} />
                    Système de Gestion d'Appels
                </h1>
                <p className="text-gray-600">Gestion en temps réel des appels téléphoniques</p>
            </div>
            <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                    {isConnected ? 'Connecté' : 'Déconnecté'}
                </span>
            </div>
        </div>
    </div>
);