import User from "../models/User.js";
import connectDB from "../config/db.js";

const seedDemoUser = async () => {
    try {
        await connectDB();

        // Check if demo user already exists
        const existingUser = await User.findOne({ email: "demo@example.com" });

        if (!existingUser) {
            const demoUser = new User({
                name: "Demo User",
                email: "demo@example.com",
                password: "demo123"
            });

            await demoUser.save();
            console.log("Demo user created successfully!");
        } else {
            console.log("Demo user already exists!");
        }
    } catch (error) {
        console.error("Error seeding demo user:", error);
    }
};

export default seedDemoUser;




