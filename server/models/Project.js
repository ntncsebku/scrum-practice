const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cols: [
    {
      name: {
        type: String,
        required: true
      },
      items: [
        {
          note: {
            type: String
          },
          due: {
            type: Date
          },
          start: {
            type: Date,
            default: Date.now()
          },
          author: {
            type: Schema.Types.ObjectId,
            required: true
          },
          assign: {
            type: Schema.Types.ObjectId
          }
        }
      ]
    }
  ]
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
