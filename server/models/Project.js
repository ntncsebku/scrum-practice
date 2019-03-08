const mongoose = require('mongoose');

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
          note: String,
          start: Date,
          due: Date,
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
  ],
  creator: Schema.Types.ObjectId,
  members: [{
    type: Schema.Types.ObjectId
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
