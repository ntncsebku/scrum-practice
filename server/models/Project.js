const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    code: {
      type: String,
      default: shortid.generate
    },
    name: {
      type: String,
      required: true
    },
    cols: [
      {
        _id: {
          type: String,
          default: shortid.generate
        },
        name: {
          type: String,
          required: true
        },
        items: [
          {
            _id: {
              type: String,
              default: shortid.generate
            },
            title: String,
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
    members: [
      {
        type: Schema.Types.ObjectId
      }
    ]
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
