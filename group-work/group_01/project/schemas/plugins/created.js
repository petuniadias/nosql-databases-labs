const createdPlugin = (schema) => {
  schema.add({
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  // Pre-save hook to update the createdAt field
  schema.pre("save", function (next) {
    this.createdAt = Date.now();
    next();
  });
};

export default createdPlugin;
