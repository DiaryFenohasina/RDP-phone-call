import { Phone, PhoneOff } from 'lucide-react';
import { Users } from 'lucide-react';

export const AgentItem = ({ agentNumber, isAvailable, currentCall, onEndCall }) => (
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
        isAvailable ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
    }`}>
        <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700">Agent {agentNumber}</span>
            <div className="relative">
                <Phone className={`${isAvailable ? 'text-green-600' : 'text-red-600'} transition-colors duration-300`} size={24} />
                {!isAvailable && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
            </div>
        </div>
        
        <div className={`text-sm font-medium ${isAvailable ? 'text-green-700' : 'text-red-700'}`}>
            {isAvailable ? 'Disponible' : 'En Communication'}
        </div>
        
        {!isAvailable && currentCall && (
            <div className="mt-2">
                <div className="text-xs text-gray-600 mb-1">
                    Appel #{currentCall.id}
                    {currentCall.urgent && (
                        <span className="ml-1 text-orange-600 font-semibold">URGENT</span>
                    )}
                </div>
                <button
                    onClick={() => onEndCall(currentCall.id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded transition-colors duration-200 flex items-center justify-center"
                >
                    <PhoneOff size={12} className="mr-1" />
                    Raccrocher
                </button>
            </div>
        )}
    </div>
);

export const AgentsPanel = ({ agents, calls, onEndCall }) => {
    const totalAgents = 2;
    const inProgressCalls = calls.filter(call => call.state === 'in_progress');

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Users className="mr-2 text-blue-600" size={20} />
                État des Agents
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: totalAgents }, (_, index) => {
                    const agentNumber = index + 1;
                    const isAvailable = index < agents;
                    const currentCall = inProgressCalls.find((_, callIndex) => callIndex === (totalAgents - agents + index));
                    
                    return (
                        <AgentItem
                            key={agentNumber}
                            agentNumber={agentNumber}
                            isAvailable={isAvailable}
                            currentCall={currentCall}
                            onEndCall={onEndCall}
                        />
                    );
                })}
            </div>
        </div>
    );
};
