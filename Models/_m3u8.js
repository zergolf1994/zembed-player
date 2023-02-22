const { DataTypes } = require("sequelize");
const sequelize = require("./conn");

const M3u8Cache = sequelize.define(
  "m3u8-cache",
  {
    type: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },
    name: {
      type: DataTypes.STRING(255),
    },
    value: {
      type: DataTypes.TEXT("long"),
    },
    fileId: {
      type: DataTypes.INTEGER(11),
    },
    userId: {
      type: DataTypes.INTEGER(11),
    },
    storageId: {
      type: DataTypes.INTEGER(11),
    },
    groupdomainId: {
      type: DataTypes.INTEGER(11),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["name"],
      },
      {
        unique: false,
        fields: ["fileId"],
      },
      {
        unique: false,
        fields: ["userId"],
      },
      {
        unique: false,
        fields: ["storageId"],
      },
      {
        unique: false,
        fields: ["groupdomainId"],
      },
    ],
  }
);

(async () => {
  await M3u8Cache.sync({ force: false });
})();

module.exports = M3u8Cache;
