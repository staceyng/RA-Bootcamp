"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "features",
      [
        {
          name: "login",
        },
        {
          name: "logout",
        },
        {
          name: "nav-bar",
        },
        {
          name: "home-button",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("features", null, {});
  },
};
