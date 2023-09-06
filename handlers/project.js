var { Memo, Board, Project } = require('../models');

module.exports = (app) => {
    app.get('/projects', async (req, res) => {
        const project = await Project.findAll();
        
        res.send(project);
    });

    app.post('/project', async (req, res) => {
        try {
            // const name = req.body.name;
            // const config = req.body.config;
    
            const project = new Project({ ...req.body });
            await project.save();
    
            res.send(project);
        } catch(err) {
            console.error(err.stack);
            res.status(500).send(err);
        }
    });

    app.put('/project/:id', async (req, res) => {
        const id = req.params.id
        const project = await Project.findOne({where: { id: id }});
        project.update({ ...req.body });

        res.send(project);
    });

    app.get('/project/:id', async (req, res) => {
        const id = req.params.id;
        const includeMemo = req.query.memo === 'true' || false;
        const includeBoard = includeMemo || req.query.board === 'true' || false;
        
        const include = []
        if (includeBoard) {
            query = { model: Board };
            if (includeMemo) {
                query.include = [Memo];
            }
            include.push(query);
        }

        const project = await Project.findOne({
            where: { id: id },
            include: include
        });

        res.send(project);
    });

    app.delete('/project/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await Project.destroy({ where: { id: id } });
            await Board.destroy({ where: { projectId: id } });
            await Memo.destroy({ where: { projectId: id } });
               
            res.send();
        } catch (e) {
            res.status(500).send(e);
        }
    });
}