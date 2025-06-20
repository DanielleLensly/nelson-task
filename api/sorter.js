export default function handler(req, res) {
	if (req.method === "POST") {
		const { name, email, word } = req.body;

		if (
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof word !== "string"
		) {
			return res
				.status(400)
				.json({ error: "Name, email, and word must be strings." });
		}

		if (!/^[a-zA-Z]+$/.test(word)) {
			return res
				.status(400)
				.json({ error: "Word must contain only alphabetic characters." });
		}

		const sorted = word.toLowerCase().split("").sort();

		return res.status(200).json({
			name,
			email,
			sorted,
		});
	} else {
		return res.status(405).json({ error: "Only POST requests allowed" });
	}
}
