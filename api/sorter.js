export default function handler(req, res) {
	if (req.method === "POST") {
		const { name, email, url } = req.body;

		if (
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof url !== "string"
		) {
			return res
				.status(400)
				.json({ error: "Name, email, and URL must be strings." });
		}

		const cleanedUrl = url.toLowerCase().trim();
		const sorted = cleanedUrl.split("").sort();

		return res.status(200).json({
			name,
			email,
			sorted,
		});
	} else {
		return res.status(405).json({ error: "Only POST requests allowed" });
	}
}
