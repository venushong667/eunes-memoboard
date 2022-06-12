var { Board } = require('../models/board');
var { Project } = require('../models/project');

module.exports = (app) => {
    app.get('/boards', async (req, res) => {
        const board = await Board.findAll();

        res.send(board);
    });

    app.post('/board', async (req, res) => {
        try {
            const projectId = req.body.projectId;
            const project = await Project.findOne({ where: { id: projectId } });
            // Not working yet, it return error
            if (!project) {
                res.status(404).send("Project not found.")
            }
            
            const board = new Board({ ...req.body });
            await board.save();

            res.send(board);
        } catch (e) {
            res.status(500).send(e); 
        }
    });

    app.put('/board/:id', async (req, res) => {
        const id = req.params.id
        const board = await Board.findOne({where: { id: id }});
        board.update({ ...req.body });

        res.send(board);
    });

    app.get('/board/:id', async (req, res) => {
        const id = req.params.id;
        const board = await Board.findOne({ where: { id: id } });

        res.send(board);
    });

    app.del('/board/:id', async (req, res) => {
        const id = req.params.id;
        const del = await Board.destroy({ where: { id: id } });

        res.send({ success: del });
    });
}