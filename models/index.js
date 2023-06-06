const { Board } = require("./board");
const { Memo } = require("./memo");
const { Project } = require("./project");

Project.hasMany(Board);
Board.belongsTo(Project);
Board.hasMany(Memo);
Memo.belongsTo(Board);

module.exports = { Board, Memo, Project };