import connection from "./config/db.js";
import User from "./models/User.js";
import Dog from "./models/Dog.js";
import Match from "./models/Match.js";

const migrate = async () => {
    try {
        const result = await connection.sync();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

migrate();