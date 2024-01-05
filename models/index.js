import Sequelize from 'sequelize';
import * as configEX from '../config/config.js';
import User from './users.js';
import BoardMember from './boardMembers.js';
import Board from './boards.js';
import List from './lists.js';
import Card from './cards.js';
import Comment from './comments.js';

const env = process.env.NODE_ENV || 'development';
const config = configEX[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);
db.sequelize = sequelize;

db.User = User;
db.BoardMember = BoardMember;
db.Board = Board;
db.List = List;
db.Card = Card;
db.Comment = Comment;

User.init(sequelize);
BoardMember.init(sequelize);
Board.init(sequelize);
List.init(sequelize);
Card.init(sequelize);
Comment.init(sequelize);

User.associate(db);
BoardMember.associate(db);
Board.associate(db);
List.associate(db);
Card.associate(db);
Comment.associate(db);

export { db };
