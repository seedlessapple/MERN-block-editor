import { Request, Response } from "express";
import database from "../model/databaseSchema";
import mongoose from "mongoose";
import { isArray, isObject } from "lodash";

const createDatabase = async (req: Request, res: Response) => {
  try {
    const { _name } = req.body;
    const newDocument = new database({
      _name,
    });

    const savedDocument = await newDocument.save();

    return res.status(201).json(savedDocument);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const addFieldToDatabase = async (req: Request, res: Response) => {
  try {
    const newField = req.body;
    const newFieldType = newField.type;
    if (
      !["string", "number", "boolean", "array", "object"].includes(newFieldType)
    ) {
      return res.status(400).send("Field type invaild");
    }
    if (newField.field === "_id") {
      return res.status(400).send("Field name _id is reserved");
    }
    const data = await database.findOneAndUpdate(
      { _id: req.params.param, "fields.field": { $ne: newField.field } },
      {
        $addToSet: {
          fields: newField,
        },
      },
      {
        fields: { fields: 1, _name: 1, _id: 1 },
        new: true,
      }
    );
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "Database not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDatabaseInfo = async (req: Request, res: Response) => {
  const param = req.params.param;
  try {
    const doc = await database.findById(param, { _data: 0 });
    return res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
const getDatabaseData = async (req: Request, res: Response) => {
  const param = req.params.param;
  const query = req.body;
  // console.log(query);

  try {
    const doc = await database.findById(param);
    if (doc) {
      return res.status(200).json(doc._data);
    } else {
      return res.status(404).json({ message: "Database not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const getDatabases = async (req: Request, res: Response) => {
  try {
    const databases = await database.find({}, { _data: 0 });
    return res.status(200).json(databases);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const addToDatabase = async (req: Request, res: Response) => {
  try {
    const databaseId = req.params.param;
    const initialData = req.body;
    const databaseInfo = await database.findById(databaseId, { fields: 1 });
    let data: any = {};
    if (databaseInfo && databaseInfo.fields) {
      const keys = Object.keys(databaseInfo.fields);
      for (let i = 0; i < keys.length; i++) {
        const field = databaseInfo.fields[keys[i]];
        const fieldName = field.field;
        if (field.required && initialData[fieldName] === undefined) {
          return res.status(400).json({ message: `${fieldName} undefined` });
        }
        if (
          (field.type === "array" && isArray(initialData[fieldName])) ||
          (field.type === "object" && isObject(initialData[fieldName]))
        ) {
        } else if (typeof initialData[fieldName] !== field.type) {
          return res
            .status(400)
            .json({ message: `${fieldName} type is not ${field.type}` });
        }
        if (fieldName && initialData[fieldName] !== undefined) {
          data[fieldName.toString()] = initialData[fieldName];
        }
      }
    } else {
      return res.status(400).json({ message: "data type invaild" });
    }
    if (Object.keys(data).length < 1) {
      return res.status(400).json({ message: "data undefined" });
    }

    await database.findOneAndUpdate(
      { _id: databaseId },
      {
        $push: {
          _data: { ...initialData, _id: new mongoose.Types.ObjectId() },
        },
      }
    );

    return res.status(200).send("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default {
  getDatabaseInfo,
  getDatabaseData,
  createDatabase,
  addFieldToDatabase,
  addToDatabase,
  getDatabases,
};
