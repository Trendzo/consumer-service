const { port } = require("./config/appConfig.js");
const connectDB = require("./frameworksAndDrivers/persistence/connection.js");
const app = require("./frameworksAndDrivers/web/server.js");

async function bootstrap() {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Consumer-Service running on port ${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
