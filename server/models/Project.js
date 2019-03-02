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
            type: mongoose.Types.ObjectId,
            required: true
          },
          assign: {
            type: [mongoose.Types.ObjectId]
          }
        }
      ]
    }
  ]
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
