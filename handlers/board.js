var { Memo, Board, Project } = require('../models');

module.exports = (app) => {
    app.get('/boards', async (req, res) => {
        const projectId = req.query.projectId;
        if (projectId) {
            var boards = await Board.findAll({ where: { projectId: projectId },
                include: [{
                    model: Memo
                }]
            });
        } else {
            var boards = await Board.findAll();
        }

        res.send(boards);
    });

    app.post('/board', async (req, res) => {
        try {
            if (!req.body.name) {
                res.status(400).send("Name is required.")
            }
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
        const board = await Board.findOne({ where: { id: id },
            include: [{
                model: Memo,
                required: false
            }]
        });

        res.send(board);
    });

    app.delete('/board/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await Board.destroy({ where: { id: id } });
            await Memo.destroy({ where: { boardId: id }});
            
            res.send({success: true});
        } catch (e) {

            res.status(500).send(e);
        }
    });
}