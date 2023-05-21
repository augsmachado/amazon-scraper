import axios from "axios";
import cheerio from "cheerio";
import dotenv from "dotenv";

// Define .env config
dotenv.config();
const SERVER = process.env.SERVER_BASE_URL;
const API_KEY = process.env.API_KEY;

export default class ProductsController {
	static async getProductById(req, res) {
		const product_id = req.params.product_id;

		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		if (api_key === API_KEY) {
			const link = `${SERVER}/dp/${product_id}`;
			axios
				.get(link)
				.then((response) => {
					const html = response.data;
					const $ = cheerio.load(html);

					res.json({
						msg: "teste",
						html: html,
					});
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
}
