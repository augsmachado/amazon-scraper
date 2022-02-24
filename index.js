const express = require("express");
const request = require("request-promise");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 5000;

// to dev use this
//const apiKey = "...";
//const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// to deploy use this
const generateScraperUrl = (apiKey) =>
	`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to Amazon Scraper API!");
});

// GET product details
app.get("/products/:product_id", async (req, res) => {
	const { product_id } = req.params;
	const { api_key } = req.query;

	try {
		const response = await request(
			`${generateScraperUrl(
				api_key
			)}&url=https://www.amazon.com/dp/${product_id}`
		);

		res.json(JSON.parse(response));
	} catch (err) {
		res.json(err);
	}
});

// GET product reviews
app.get("/products/:product_id/reviews", async (req, res) => {
	const { product_id } = req.params;
	const { api_key } = req.query;

	try {
		const response = await request(
			`${generateScraperUrl(
				api_key
			)}&url=https://www.amazon.com/product-reviews/${product_id}`
		);

		res.json(JSON.parse(response));
	} catch (err) {
		res.json(err);
	}
});

// GET product offers
app.get("/products/:product_id/offers", async (req, res) => {
	const { product_id } = req.params;
	const { api_key } = req.query;

	try {
		const response = await request(
			`${generateScraperUrl(
				api_key
			)}&url=https://www.amazon.com/gp/offer-listing/${product_id}`
		);

		res.json(JSON.parse(response));
	} catch (err) {
		res.json(err);
	}
});

// GET search results
app.get("/search/:searchQuery", async (req, res) => {
	const { searchQuery } = req.params;
	const { api_key } = req.query;

	try {
		const response = await request(
			`${generateScraperUrl(
				api_key
			)}&url=https://www.amazon.com/s?k=${searchQuery}`
		);

		res.json(JSON.parse(response));
	} catch (err) {
		res.json(err);
	}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
