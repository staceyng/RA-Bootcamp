export default function initFeatureModel(sequelize, DataTypes) {
  return sequelize.define(
    "feature",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
}
