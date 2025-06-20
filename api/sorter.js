export default function handler(req, res) {
	if (req.method === "POST") {
		const { data } = req.body;

		if (typeof data !== "string") {
			return res.status(400).json({ error: "Data must be a string." });
		}

		const sorted = data.split("").sort();
		res.status(200).json({ word: sorted });
	} else {
		res.status(405).json({ error: "Only POST requests are allowed." });
	}
}
