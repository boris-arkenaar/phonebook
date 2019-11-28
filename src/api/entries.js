import fs from "fs";
import swaggerMongoose from "swagger-mongoose";
import yaml from "js-yaml";

const swagger = yaml.safeLoad(
  fs.readFileSync(`${__dirname}/swagger.yaml`, "utf8")
);
const { Entry } = swaggerMongoose.compile(swagger).models;

const getSwaggerParams = req => {
  const params = req.swagger ? req.swagger.params : {};
  return Object.keys(params).reduce(
    (acc, param) => ({
      ...acc,
      [param]: params[param].value
    }),
    {}
  );
};

export async function getEntries(req, res) {
  try {
    const options = req.query._page
      ? {
          limit: 10,
          skip: (req.query._page - 1) * 10
        }
      : {};
    const count = await Entry.countDocuments();
    const entries = await Entry.find(null, null, options);

    res.setHeader("X-Total-Count", count);
    return res.json(entries);
  } catch (error) {
    return res.send(error);
  }
}

export async function getEntry(req, res) {
  try {
    const params = getSwaggerParams(req);
    const entry = await Entry.findById(params.entryId);

    return (entry && res.json(entry)) || res.sendStatus(404);
  } catch (error) {
    return error.name === "CastError" ? res.sendStatus(404) : res.send(error);
  }
}

export async function postEntry(req, res) {
  try {
    const { _id, ...params } = req.body;
    const newEntry = await Entry.create(params);

    return (newEntry && res.json(newEntry)) || res.sendStatus(404);
  } catch (error) {
    return error.name === "CastError" ? res.sendStatus(404) : res.send(error);
  }
}

export async function putEntry(req, res) {
  try {
    const params = getSwaggerParams(req);
    const oldEntry = await Entry.findById(params.entryId);
    const newEntry =
      oldEntry &&
      (await Entry.findOneAndUpdate(
        { _id: oldEntry._id },
        { ...req.body },
        { new: true }
      ));

    return (newEntry && res.json(newEntry)) || res.sendStatus(404);
  } catch (error) {
    return error.name === "CastError" ? res.sendStatus(404) : res.send(error);
  }
}

export async function deleteEntry(req, res) {
  try {
    const params = getSwaggerParams(req);
    const result = await Entry.remove({
      _id: params.entryId
    });

    return (result && result.n && res.sendStatus(204)) || res.sendStatus(404);
  } catch (error) {
    return error.name === "CastError" ? res.sendStatus(404) : res.send(error);
  }
}
