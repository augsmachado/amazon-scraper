import express from "express";
import dotenv from "dotenv";

import NodeCache from "node-cache";

import { v4 as uuidv4 } from "uuid";

// Define .env config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Define node caching settings > default 15 seconds

const cache = new NodeCache({ stdTTL: 15 });
const verifyCache = (req, res, next) => {
	try {
		const { id } = req.params;
		if (cache.has(id)) {
			return res.status(200).json(cache.get(id));
		}
		return next();
	} catch (err) {
		throw new Error(err);
	}
};

app.use(express.json());

// GET API status
app.get("/status", (req, res) => {
	try {
		let response = {
			msg: "Current API status",
			name: process.env.API_NAME,
			environment: process.env.API_ENVIRONMENT,
			version: process.env.API_VERSION,
			uptime: new Date().getTime(),
			hash: uuidv4(),
		};

		res.json(response);
	} catch (err) {
		res.status(500).json({
			error: "Unable to request API status",
			details: `${err}`,
		});
	}
});

app.use("*", (req, res) => {
	res.status(400).json({ error: "Not route found" });
});

app.listen(PORT, () => {
	try {
		console.log(`Server running on port ${PORT}`);
	} catch (err) {
		console.log(err);
		process.exit();
	}
});

export default app;
