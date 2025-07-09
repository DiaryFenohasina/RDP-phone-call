let calls = [];
let nextId = 1;
let agents = 6;

const getAgents = (req, res) => {
    res.json(agents).status(200)
}

const dropCall = (req, res) => {
    const io = req.app.get('io');
    calls = calls.filter(call => call.state !== 'ended');
    io.emit('update', calls);
}

const call = (req, res) => {
    const io = req.app.get('io');
    const urgent = req.body?.urgent
    try {
        const newCall = {
            id: nextId++,
            urgent: urgent || false,
            state: 'pending',
            createdAt: new Date()
        };
        calls.push(newCall)
        console.log(`Nouvel appel #${newCall.id} ${urgent ? '(URGENT)' : ''}`)
        io.emit('update', calls);
        res.json({ message: 'Appel ajouté', call: newCall });
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
}

const endCall = (req, res) => {
    const io = req.app.get('io');
    const id = req.params.id
    console.log(id)
    try {
        const call = calls.find(c => c.id == id && c.state == 'in_progress')
        if (!call) {
            return res.status(400).json({ message: 'Aucun appel en cours avec cet ID.' });
        }
        call.state = 'ended';
        agents++;
        console.log(`Appel #${id} terminé. Agent libéré.`);
        io.emit('update', calls);
        res.json({ message: 'Appel terminé.', call });
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
}

const getState = (req, res) => {
    res.json(calls)
}

const startCron = (app) => {
    setInterval(() => {
        if (agents <= 0) return;

        let nextCall = calls.find(c => c.state === 'pending' && c.urgent);
        if (!nextCall) {
            nextCall = calls.find(c => c.state === 'pending');
        }

        if (nextCall) {
            nextCall.state = 'in_progress';
            agents--;
            console.log(`👷‍♂️ Appel #${nextCall.id} pris en charge par un agent.`);
            const io = app.get('io');
            io.emit('update', calls);
        }
    }, 2000);
};

module.exports = {
    call,
    getState,
    endCall,
    startCron,
    getAgents,
    dropCall
}