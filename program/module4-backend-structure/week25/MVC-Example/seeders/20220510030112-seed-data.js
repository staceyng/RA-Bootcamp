module.exports = {
  up: async (queryInterface) => {
    const itemsList = [
      {
        name: "doritos",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "watermelon",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "chicken nuggets",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert("items", itemsList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("items", null, {});
  },
};
