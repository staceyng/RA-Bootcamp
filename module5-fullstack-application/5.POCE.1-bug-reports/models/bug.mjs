export default function initBugModel(sequelize, DataTypes) {
  return sequelize.define(
    "bug",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      problem: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      error_text: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      commit: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      feature_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "features",
          key: "id",
        },
      },
    },
    {
      underscored: true,
    }
  );
}
