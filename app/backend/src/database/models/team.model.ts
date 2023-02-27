import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import Matches from './match.model';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });

// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Teams.hasMany(Matches, { foreignKey: 'id', as: 'homeTeamId' });
// Teams.hasMany(Matches, { foreignKey: 'id', as: 'awayTeamId' });

export default Teams;
