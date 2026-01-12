const updatedPlugin = (schema) => {
  schema.add({
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: String,
      default: null,
    },
  });
  // Pre-save hook to update the updatedAt and updatedBy fields
  schema.pre("save", function (next) {
    this.updatedAt = Date.now();
    this.updatedBy = this.updatedBy || this.userId;
    next();
  });
};

export default updatedPlugin;
