const baseUrl = 'http://localhost:3000/api/';

export const api = {
    getAgents: async () => {
        try {
            const response = await fetch(`${baseUrl}`);
            return await response.json();
        } catch (error) {
            console.log(error);
            return 2;
        }
    },
    
    addCall: async (urgent = false) => {
        try {
            const response = await fetch(`${baseUrl}call`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urgent })
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    },
    
    getState: async () => {
        try {
            const response = await fetch(`${baseUrl}state`);
            return await response.json();
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    
    endCall: async (id) => {
        try {
            const response = await fetch(`${baseUrl}end/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
};