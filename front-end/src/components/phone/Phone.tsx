import React, { useEffect, useState, useRef } from 'react';
import { LoadingScreen } from '../LoadingComponent';
import { Header } from '../HeaderComponent'
import { StatsPanel } from '../StatComponent'
import { AgentsPanel } from '../AgentComponent';
import { CallsPanel } from '../CallComponent'
import { api } from './Function';
import { io , Socket} from 'socket.io-client';

export default function PhoneSystem() {
    const socketRef = useRef<Socket | null>(null);
    const [agents, setAgents] = useState(0);
    const [totalAgents, setTotalAgents] = useState(0);
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);

    const loadInitialData = async () => {
        try {
            const [agentsData, callsData] = await Promise.all([
                api.getAgents(),
                api.getState()
            ]);
            
            // Calculer le nombre total d'agents et les agents disponibles
            const inProgressCount = callsData.filter(call => call.state === 'in_progress').length;
            const availableAgents = agentsData;
            const totalAgentsCount = availableAgents + inProgressCount;
            
            setTotalAgents(totalAgentsCount);
            setAgents(availableAgents);
            setCalls(callsData);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io('http://localhost:3000');
        }

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('📡 Connecté au serveur Socket.IO');
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('📡 Déconnecté du serveur Socket.IO');
            setIsConnected(false);
        });

        socket.on('update', (updatedCalls) => {
            console.log('🔄 Mise à jour reçue:', updatedCalls);
            setCalls(updatedCalls);

            const inProgressCount = updatedCalls.filter(call => call.state === 'in_progress').length;
            setAgents(totalAgents - inProgressCount);
        });

        loadInitialData();

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('update');
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [totalAgents]);

    const handleEndCall = async (callId) => {
        try {
            await api.endCall(callId);
        } catch (error) {
            console.error('Erreur lors de la fin de l\'appel:', error);
        }
    };

    const handleAddCall = async (urgent = false) => {
        try {
            await api.addCall(urgent);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'appel:', error);
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <Header isConnected={isConnected} />
                <StatsPanel agents={agents} calls={calls} totalAgents={totalAgents} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AgentsPanel 
                        agents={agents} 
                        calls={calls} 
                        onEndCall={handleEndCall} 
                        totalAgents={totalAgents}
                    />
                    <CallsPanel calls={calls} onAddCall={handleAddCall} onEndCall={handleEndCall} />
                </div>
            </div>
        </div>
    );
}