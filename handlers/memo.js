var { Memo } = require('../models/memo');
var { Board } = require('../models/board');

module.exports = (app) => {
    app.get('/memos', async (req, res) => {
        const memo = await Memo.findAll();
        
        res.send(memo);
    });

    app.post('/memo', async (req, res) => {
        const boardId = req.body.boardId
        const board = await Board.findOne({ where: { id: boardId } });
        // Not working yet, it return error
        if (!board) {
            res.status(404).send("Board not found.")
        }

        const memo = new Memo({ ...req.body });
        await memo.save();

        res.send(memo);
    });

    app.put('/memo/:id', async (req, res) => {
        const id = req.params.id
        const memo = await Memo.findOne({where: { id: id }});
        memo.update({ ...req.body });

        res.send(memo);
    });

    app.get('/memo/:id', async (req, res) => {
        const id = req.params.id;
        const memo = await Memo.findOne({ where: { id: id } });

        res.send(memo);
    });
}