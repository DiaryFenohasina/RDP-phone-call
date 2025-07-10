import React, { useState, useEffect, useRef } from 'react';
import { LoadingScreen } from '../LoadingComponent';
import { Header } from '../HeaderComponent';
import { StatsPanel } from '../StatComponent';
import { AgentsPanel } from '../AgentComponent';
import { CallsPanel } from '../CallComponent';
import { PetriNetComponent } from '../PetriComponent';
import { api } from './Function';
import { io, Socket } from 'socket.io-client';
import config from '../../../config.json';

export default function PhoneSystemWithPetriNet() {
    const socketRef = useRef<Socket | null>(null);
    const [agents, setAgents] = useState(0);
    const [totalAgents, setTotalAgents] = useState(0);
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [showPetriNet, setShowPetriNet] = useState(false);

    const loadInitialData = async () => {
        try {
            const [agentsData, callsData] = await Promise.all([
                api.getAgents(),
                api.getState()
            ]);

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
            socketRef.current = io(config['URL_SOCKET_PROD'] || config['URL_SOCKET_DEV']);
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

    const handleDropCall = async () => {
        try {
            await api.dropCall();
        } catch (error) {
            console.error('Erreur lors du drop call:', error);
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <Header isConnected={isConnected} />

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowPetriNet(!showPetriNet)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${showPetriNet
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        {showPetriNet ? (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>Voir les Agents</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>Voir le Réseau de Petri</span>
                            </>
                        )}
                    </button>
                </div>

                <StatsPanel agents={agents} calls={calls} totalAgents={totalAgents} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {showPetriNet ? (
                        <PetriNetComponent
                            agents={agents}
                            calls={calls}
                            totalAgents={totalAgents}
                            isConnected={isConnected}
                        />
                    ) : (
                        <AgentsPanel
                            agents={agents}
                            calls={calls}
                            onEndCall={handleEndCall}
                            totalAgents={totalAgents}
                        />
                    )}

                    <CallsPanel
                        calls={calls}
                        onAddCall={handleAddCall}
                        onEndCall={handleEndCall}
                        onDropCall={handleDropCall}
                    />
                </div>
            </div>
        </div>
    );
}