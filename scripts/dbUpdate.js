// Color codes
const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";

const { config } = require("dotenv");
config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

console.log("\n\nStarting database update\n\n");

// Check if all required environment variables are set
const requiredEnvVars = ["MONGO_HOST", "MONGO_PORT", "MONGO_DATABASE"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    `${RED} Missing environment variables: ${missingEnvVars.join(
      ", "
    )} ${RESET}`
  );
  process.exit(1);
}

// Construct the MongoDB URI
let mongoUri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

// Append username and password if available
if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
  mongoUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
}

// Connect to the MongoDB database
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log(`${GREEN} Connected to MongoDB ${RESET}`);

    // Define the directories to process
    const directories = [
      "architecture",
      "building-block",
      "business-model",
      "decision-process",
      "perimeter",
      "pricing-model",
      "requirement",
      "roles",
      "value-sharing",
      "data-categories",
      "service-categories",
    ];

    const schema = new mongoose.Schema({
      type: { type: String, required: true },
      refURL: { type: String, required: false },
      title: { type: String, unique: true, required: true },
      jsonld: { type: String, required: true },
    });

    const DefinedReference = mongoose.model("DefinedReference", schema);
    await DefinedReference.collection.createIndex(
      { title: 1 },
      { unique: true }
    );

    // Process each directory
    const processDirectories = directories.map(async (directory) => {
      const directoryPath = path.join(
        __dirname,
        "..",
        "reference-models",
        "src",
        "references",
        directory
      );

      // Read files in the directory
      const files = await fs.promises.readdir(directoryPath);

      const processFiles = files.map(async (file) => {
        const filePath = path.join(directoryPath, file);

        try {
          // Read the JSON-LD file content
          const fileContent = await fs.promises.readFile(filePath, "utf8");

          // Parse the JSON-LD content
          const jsonld = JSON.parse(fileContent);
          const refURL = jsonld["@id"];
          const title = jsonld["title"]
            ? jsonld["title"]["@value"]
            : jsonld["name"]
            ? jsonld["name"]["@value"]
            : "";

          try {
            // Update or insert the document
            await DefinedReference.findOneAndUpdate(
              { title },
              { type: directory, refURL, jsonld: fileContent },
              { upsert: true }
            );
          } catch (error) {
            console.error(`Error processing file ${file}:`, error);
          }
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
        }
      });

      // Wait for all file processing to complete
      await Promise.all(processFiles);
    });

    // Wait for all directory processing to complete
    Promise.all(processDirectories)
      .then(() => {
        console.log(`${GREEN} Database update complete ${RESET}`);
        process.exit(0);
      })
      .catch((error) => {
        console.error("Error updating database:", error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
