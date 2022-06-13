var { Project } = require('../models/project'); 

module.exports = (app) => {
    app.get('/projects', async (req, res) => {
        const project = await Project.findAll();
        
        res.send(project);
    });

    app.post('/project', async (req, res) => {
        // const name = req.body.name;
        // const config = req.body.config;

        const project = new Project({ ...req.body });
        await project.save();

        res.send(project);
    });

    app.put('/project/:id', async (req, res) => {
        const id = req.params.id
        const project = await Project.findOne({where: { id: id }});
        project.update({ ...req.body });

        res.send(project);
    });

    app.get('/project/:id', async (req, res) => {
        const id = req.params.id;
        const project = await Project.findOne({ where: { id: id } });

        res.send(project);
    });

    app.delete('/project/:id', async (req, res) => {
        const id = req.params.id;
        const del = await Project.destroy({ where: { id: id } });

        res.send({ success: del });
    });
}