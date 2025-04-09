exports.up = (pgm) => {
  pgm.addColumn('users', {
    name: {
      type: 'TEXT',
      notNull: true,
      default: ''
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('users', 'name');
};
