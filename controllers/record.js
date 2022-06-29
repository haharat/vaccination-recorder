const RecordModel = require("../models/record");

const createRecord = async (req, res) => {
  const { vaxDate, vaxType, vaxBrand, doseNumber, feeling, description} = req.body;

  const record = await RecordModel.create({
    vaxDate: vaxDate,
    vaxType: vaxType,
    vaxBrand: vaxBrand,
    doseNumber: doseNumber,
    feeling: feeling,
    description: description,
    recordedBy:req.user
  });

  if (record) {
    res.status(201).json({
      id: record._id,
      vaxDate: record.vaxDate,
      vaxType: record.vaxType,
      vaxBrand: record.vaxBrand,
      doseNumber: record.doseNumber,
      feeling: record.feeling,
      description: record.description,
      recordedBy:record.recordedBy
    });
  } else {
    res.status(500).send({ message: "Unable to create record" });
  }
};

const getRecords = async (req, res) => {
  const records = await RecordModel.find({}); 
  res.status(200).send(records);
};

const getMyRecords = async (req, res) => {
  const records = await RecordModel.find({recordedBy:req.user._id})

  res.status(200).send(records);
};

const getRecord = async (req, res) => {
  const record = await RecordModel.findById(req.params.id);
  if (record) {
    res.json(record);
  } else {
    res.status(404).send({ message: "Record not found!" });
  }
};

const updateRecord = async (req, res) => {
  const record = await RecordModel.findById(req.params.id);
  if (record) {
    record.vaxDate = req.body.vaxDate;
    record.vaxType = req.body.vaxType;
    record.vaxBrand = req.body.vaxBrand;
    record.doseNumber = req.body.doseNumber;
    record.feeling = req.body.feeling;
    record.description = req.body.description;

    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } else {
    res.status(404).send({ message: "Record not found!" });
  }
};

const deleteRecord = async (req, res) => {
  const record = await RecordModel.findById(req.params.id);
  if (record) {
    await record.remove();
    res.status(200).send({ message: "Record successfully removed" });
  } else {
    res.status(404).send({ message: "Record not found!" });
  }
};

module.exports = { createRecord, getRecords, updateRecord, getRecord, deleteRecord, getMyRecords };