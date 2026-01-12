const deletedPlugin = (schema) => {
  schema.add({
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: String,
      default: null,
    },
  });
};

export default deletedPlugin;
