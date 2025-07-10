import React, { useState, useEffect } from 'react';

export const PetriNetComponent = ({ agents, calls, totalAgents, isConnected }) => {
  const [petriState, setPetriState] = useState({
    P1: 0, // Appels entrants
    P2: 0, // File d'attente
    P3: 0, // Agents disponibles
    P4: 0, // Appels en cours
    P5: 0  // Appels terminés
  });

  useEffect(() => {
    const waiting = calls.filter(call => call.state === 'pending').length;
    const inProgress = calls.filter(call => call.state === 'in_progress').length;
    const completed = calls.filter(call => call.state === 'ended').length;
    
    const newState = {
      P1: 0, 
      P2: waiting,
      P3: agents,
      P4: inProgress,
      P5: completed
    };
    
    setPetriState(newState);
  }, [agents, calls]);

  const getTokens = (count) => {
    return Array.from({ length: Math.min(count, 5) }, (_, i) => (
      <circle
        key={i}
        cx={20 + (i % 3) * 15}
        cy={20 + Math.floor(i / 3) * 15}
        r="6"
        fill="#000"
        className="animate-pulse"
      />
    ));
  };

  const getPlaceColor = (placeId) => {
    const colors = {
      P1: '#FF6B6B', // Rouge - Appels entrants
      P2: '#FFD93D', // Jaune - File d'attente
      P3: '#6BCF7F', // Vert - Agents disponibles
      P4: '#4ECDC4', // Bleu turquoise - Appels en cours
      P5: '#88D8B0'  // Vert foncé - Terminés
    };
    return colors[placeId] || '#DDD';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Réseau de Petri</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">{isConnected ? 'Connecté' : 'Déconnecté'}</span>
        </div>
      </div>

      {/* Réseau de Petri agrandi */}
      <div className="bg-gray-50 rounded-lg p-8">
        <svg viewBox="0 0 900 600" className="w-full h-[500px]">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
            </marker>
          </defs>
          
          {/* Places */}
          <g>
            {/* P1 - Appels entrants */}
            <circle cx="150" cy="100" r="45" fill={getPlaceColor('P1')} stroke="#333" strokeWidth="3"/>
            <text x="150" y="105" textAnchor="middle" className="text-lg font-bold">P1</text>
            <text x="150" y="165" textAnchor="middle" className="text-base">Entrants</text>
            <text x="150" y="185" textAnchor="middle" className="text-xl font-bold text-white bg-red-600 px-3 py-1 rounded">
              {petriState.P1}
            </text>
            <g transform="translate(135, 85)">{getTokens(petriState.P1)}</g>
            
            {/* P2 - File d'attente */}
            <circle cx="150" cy="230" r="45" fill={getPlaceColor('P2')} stroke="#333" strokeWidth="3"/>
            <text x="150" y="235" textAnchor="middle" className="text-lg font-bold">P2</text>
            <text x="150" y="290" textAnchor="middle" className="text-base">File d'attente</text>
            <text x="150" y="310" textAnchor="middle" className="text-xl font-bold text-gray-800 bg-yellow-300 px-3 py-1 rounded">
              {petriState.P2}
            </text>
            <g transform="translate(135, 215)">{getTokens(petriState.P2)}</g>
            
            {/* P3 - Agents disponibles */}
            <circle cx="400" cy="230" r="45" fill={getPlaceColor('P3')} stroke="#333" strokeWidth="3"/>
            <text x="400" y="235" textAnchor="middle" className="text-lg font-bold">P3</text>
            <text x="400" y="290" textAnchor="middle" className="text-base">Agents libres</text>
            <text x="400" y="310" textAnchor="middle" className="text-xl font-bold text-white bg-green-600 px-3 py-1 rounded">
              {petriState.P3}
            </text>
            <g transform="translate(385, 215)">{getTokens(petriState.P3)}</g>
            
            {/* P4 - Appels en cours */}
            <circle cx="275" cy="360" r="45" fill={getPlaceColor('P4')} stroke="#333" strokeWidth="3"/>
            <text x="275" y="365" textAnchor="middle" className="text-lg font-bold">P4</text>
            <text x="275" y="420" textAnchor="middle" className="text-base">En cours</text>
            <text x="275" y="440" textAnchor="middle" className="text-xl font-bold text-white bg-blue-600 px-3 py-1 rounded">
              {petriState.P4}
            </text>
            <g transform="translate(260, 345)">{getTokens(petriState.P4)}</g>
            
            {/* P5 - Appels terminés */}
            <circle cx="400" cy="490" r="45" fill={getPlaceColor('P5')} stroke="#333" strokeWidth="3"/>
            <text x="400" y="495" textAnchor="middle" className="text-lg font-bold">P5</text>
            <text x="400" y="550" textAnchor="middle" className="text-base">Terminés</text>
            <text x="400" y="570" textAnchor="middle" className="text-xl font-bold text-white bg-green-700 px-3 py-1 rounded">
              {petriState.P5}
            </text>
            <g transform="translate(385, 475)">{getTokens(petriState.P5)}</g>
          </g>
          
          {/* Transitions */}
          <g>
            {/* T1 - Mettre en attente */}
            <rect x="135" y="160" width="30" height="20" fill="#FFA500" stroke="#333" strokeWidth="3"/>
            <text x="150" y="173" textAnchor="middle" className="text-base font-bold">T1</text>
            
            {/* T2 - Prise en charge */}
            <rect x="260" y="290" width="30" height="20" fill="#32CD32" stroke="#333" strokeWidth="3"/>
            <text x="275" y="303" textAnchor="middle" className="text-base font-bold">T2</text>
            
            {/* T3 - Fin appel */}
            <rect x="310" y="420" width="30" height="20" fill="#228B22" stroke="#333" strokeWidth="3"/>
            <text x="325" y="433" textAnchor="middle" className="text-base font-bold">T3</text>
          </g>
          
          {/* Arcs */}
          <g>
            {/* P1 -> T1 */}
            <line x1="150" y1="145" x2="150" y2="160" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            
            {/* T1 -> P2 */}
            <line x1="150" y1="180" x2="150" y2="185" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            
            {/* P2 -> T2 */}
            <line x1="190" y1="250" x2="260" y2="290" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            
            {/* P3 -> T2 */}
            <line x1="360" y1="250" x2="290" y2="290" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            
            {/* T2 -> P4 */}
            <line x1="275" y1="310" x2="275" y2="315" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            
            {/* P4 -> T3 */}
            <line x1="315" y1="380" x2="325" y2="420" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)"/>

            {/* T3 -> P5 */}
            <line x1="340" y1="440" x2="375" y2="470" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            
            {/* T3 -> P3 (libération agent) */}
            <line x1="325" y1="420" x2="400" y2="275" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          </g>
        </svg>
      </div>
    </div>
  );
};