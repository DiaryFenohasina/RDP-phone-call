import config from '../../../config.json'
const baseUrl = config['URL_BACK_PROD'] || config['URL_BACK_DEV']


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
    },

    async dropCall() {
        const response = await fetch(`${baseUrl}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Erreur lors du drop call');
        }
        return await response.json();
    }
};