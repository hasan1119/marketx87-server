const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./src/models/user");
const app = require("./app");
const { hashPassword } = require("./src/utils/passwordUtils");

dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
}

async function seedAdminUser() {
  const adminUserExists = await User.exists({ role: "Admin" });

  if (!adminUserExists) {
    const adminUserData = {
      firstName: "Admin",
      lastName: "User",
      email: "admin@admin.com",
      role: "Admin",
      password: await hashPassword("12345678"), // You should hash this password before using it
    };

    const adminUser = await User.create(adminUserData);

    if (adminUser) {
      console.log("Admin user created");
    }
  }
}

async function startServer() {
  const PORT = process.env.PORT || 6000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

(async () => {
  await connectToDatabase();
  await seedAdminUser();
  await startServer();
})();
