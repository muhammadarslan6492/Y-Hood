module.exports = {
  up: async queryInterface =>
    queryInterface.bulkInsert(
      'example',
      [
        {
          title: 'Example',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('example', null, {}),
};
