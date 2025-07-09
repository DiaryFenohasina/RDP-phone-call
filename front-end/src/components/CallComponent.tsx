import { Phone, PhoneCall, AlertCircle, PhoneOff, X} from 'lucide-react';

const CallItem = ({ call, onEndCall }) => (
    <div className={`p-3 rounded-lg border-l-4 ${
        call.state === 'pending'
            ? call.urgent ? 'border-orange-500 bg-orange-50' : 'border-yellow-500 bg-yellow-50'
            : call.state === 'in_progress'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-500 bg-gray-50'
    }`}>
        <div className="flex items-center justify-between">
            <div>
                <span className="font-semibold text-gray-700">Appel #{call.id}</span>
                {call.urgent && (
                    <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-1 rounded">URGENT</span>
                )}
            </div>
            
            <div className="flex items-center space-x-2">
                <div className="text-right">
                    <div className={`text-sm font-medium ${
                        call.state === 'pending' ? 'text-yellow-700' :
                        call.state === 'in_progress' ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                        {call.state === 'pending' ? 'En attente' :
                         call.state === 'in_progress' ? 'En cours' : 'Terminé'}
                    </div>
                    <div className="text-xs text-gray-500">
                        {new Date(call.createdAt).toLocaleTimeString()}
                    </div>
                </div>
                
                {call.state === 'in_progress' && (
                    <button
                        onClick={() => onEndCall(call.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded transition-colors duration-200 flex items-center"
                    >
                        <PhoneOff size={12} className="mr-1" />
                        Raccrocher
                    </button>
                )}
            </div>
        </div>
    </div>
);

export const CallsPanel = ({ calls, onAddCall, onEndCall, onDropCall }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <PhoneCall className="mr-2 text-blue-600" size={20} />
                Gestion des Appels
            </h2>
            
            <button
                onClick={onDropCall}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition-colors duration-200 flex items-center text-sm"
            >
                <X className="mr-1" size={16} />
            </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
            <button
                onClick={() => onAddCall(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
                <Phone className="mr-2" size={18} />
                Appel Normal
            </button>
            
            <button
                onClick={() => onAddCall(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
                <AlertCircle className="mr-2" size={18} />
                Appel Urgent
            </button>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
            {calls.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Phone className="mx-auto mb-2" size={48} />
                    <p>Aucun appel en cours</p>
                </div>
            ) : (
                calls.map((call) => (
                    <CallItem key={call.id} call={call} onEndCall={onEndCall} />
                ))
            )}
        </div>
    </div>
);