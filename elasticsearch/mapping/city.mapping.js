const userSchema = {
  Acceleration: {
    type: "long",
  },
  Cylinders: {
    type: "long",
  },
  Displacement: {
    type: "long",
  },
  Horsepower: {
    type: "long",
  },
  Miles_per_Gallon: {
    type: "long",
  },
  Name: {
    type: "text",
    fields: {
      keyword: {
        type: "keyword",
        ignore_above: 256,
      },
    },
  },
  Origin: {
    type: "text",
    fields: {
      keyword: {
        type: "keyword",
        ignore_above: 256,
      },
    },
  },
  Weight_in_lbs: {
    type: "long",
  },
  Year: {
    type: "date",
  },
};
