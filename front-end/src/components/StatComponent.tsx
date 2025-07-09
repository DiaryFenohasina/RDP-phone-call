import { PhoneCall, Users, AlertCircle, Clock } from 'lucide-react';

export const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
            </div>
            <Icon className={`text-${color}-500`} size={24} />
        </div>
    </div>
);

export const StatsPanel = ({ agents, calls }) => {
    const totalAgents = 2;
    const busyAgents = totalAgents - agents;
    const pendingCalls = calls.filter(call => call.state === 'pending').length;
    const urgentPendingCalls = calls.filter(call => call.state === 'pending' && call.urgent).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatsCard title="Agents Libres" value={agents} icon={Users} color="green" />
            <StatsCard title="Agents Occupés" value={busyAgents} icon={PhoneCall} color="red" />
            <StatsCard title="Appels en Attente" value={pendingCalls} icon={Clock} color="yellow" />
            <StatsCard title="Appels Urgents" value={urgentPendingCalls} icon={AlertCircle} color="orange" />
        </div>
    );
};
