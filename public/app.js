const form = document.getElementById("sortForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const url = document.getElementById("url").value;

	try {
		const res = await fetch("/api/sorter", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: url }),
		});

		const json = await res.json();
		result.textContent = JSON.stringify(json, null, 2);
	} catch (err) {
		result.textContent = "Error: " + err.message;
	}
});
