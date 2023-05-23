import axios from "axios";
import dotenv from "dotenv";

// Define .env config
dotenv.config();
const { SERVER_API_KEY } = process.env.SERVER_API_KEY;
const { API_KEY } = process.env.API_KEY;

const generateScraperUrl = (serverApiKey) =>
	`http://api.scraperapi.com?api_key=${serverApiKey}&autoparse=true`;

export default class ProductsController {
	// GET search results
	static async getProducts(req, res) {
		const { search_query } = req.params;

		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		if (api_key === API_KEY) {
			const link = `${generateScraperUrl(
				SERVER_API_KEY
			)}&url=https://www.amazon.com/s?k=${search_query}`;
			axios
				.get(link)
				.then((response) => {
					res.json(JSON.parse(response));
				})
				.catch((err) => {
					res.json({
						error: `Unable to get products by search_query: ${product_id} on server`,
						details: `${err}`,
					});
				});
		} else {
			res.status(412).json({
				error: "[412] Precondition failed",
				details: "Provide Amazon Scraper API_KEY",
			});
		}
	}

	// GET product details
	static async getProductById(req, res) {
		const { product_id } = req.params;

		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		if (api_key === API_KEY) {
			const link = `${generateScraperUrl(
				SERVER_API_KEY
			)}&url=https://www.amazon.com/dp/${product_id}`;
			axios
				.get(link)
				.then((response) => {
					res.json(JSON.parse(response));
				})
				.catch((err) => {
					res.json({
						error: `Unable to get product by id ${product_id} on server`,
						details: `${err}`,
					});
				});
		} else {
			res.status(412).json({
				error: "[412] Precondition failed",
				details: "Provide Amazon Scraper API_KEY",
			});
		}
	}

	// GET product reviews
	static async getReviewsByProductId(req, res) {
		const { product_id } = req.params;

		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		if (api_key === API_KEY) {
			const link = `${generateScraperUrl(
				SERVER_API_KEY
			)}&url=https://www.amazon.com/product-reviews/${product_id}`;
			axios
				.get(link)
				.then((response) => {
					res.json(JSON.parse(response));
				})
				.catch((err) => {
					res.json({
						error: `Unable to get product reviews by product_id: ${product_id} on server`,
						details: `${err}`,
					});
				});
		} else {
			res.status(412).json({
				error: "[412] Precondition failed",
				details: "Provide Amazon Scraper API_KEY",
			});
		}
	}

	// GET product offers
	static async getProductOffersByProductId(req, res) {
		const { product_id } = req.params;

		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		if (api_key === API_KEY) {
			const link = `${generateScraperUrl(
				SERVER_API_KEY
			)}&url=https://www.amazon.com/gp/offer-listing/${product_id}`;
			axios
				.get(link)
				.then((response) => {
					res.json(JSON.parse(response));
				})
				.catch((err) => {
					res.json({
						error: `Unable to get product offers by product_id: ${product_id} on server`,
						details: `${err}`,
					});
				});
		} else {
			res.status(412).json({
				error: "[412] Precondition failed",
				details: "Provide Amazon Scraper API_KEY",
			});
		}
	}
}
