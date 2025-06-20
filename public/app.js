const form = document.getElementById("sortForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const wordInput = document.getElementById("word");

const emailWarning = document.getElementById("email-warning");
const wordWarning = document.getElementById("word-warning");

const submitButton = form.querySelector('button[type="submit"]');
const result = document.getElementById("response-box");

let emailTouched = false;
let wordTouched = false;

function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
}

function validateWord(value) {
	// ✅ changed to allow letters and numbers after sending test and getting feedback
	return /^[a-zA-Z0-9]+$/.test(value);
}

function updateSubmitButtonState() {
	const emailValid = validateEmail(emailInput.value);
	const wordValid = validateWord(wordInput.value);

	emailWarning.style.display = emailTouched && !emailValid ? "block" : "none";
	wordWarning.style.display = wordTouched && !wordValid ? "block" : "none";

	submitButton.disabled = !(emailValid && wordValid);
}

emailInput.addEventListener("input", () => {
	emailTouched = true;
	updateSubmitButtonState();
});
emailInput.addEventListener("blur", () => {
	emailTouched = true;
	updateSubmitButtonState();
});

wordInput.addEventListener("input", () => {
	wordTouched = true;
	updateSubmitButtonState();
});
wordInput.addEventListener("blur", () => {
	wordTouched = true;
	updateSubmitButtonState();
});

updateSubmitButtonState();

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	if (submitButton.disabled) return;

	try {
		const res = await fetch("/api/sorter", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: nameInput.value.trim(),
				email: emailInput.value.trim(),
				word: wordInput.value.trim(),
			}),
		});

		const json = await res.json();

		if (json.error) {
			result.textContent = "Error: " + json.error;
		} else {
			result.innerHTML = `
				<div class="response-message">
					<p><strong>Hi ${json.name}</strong>,</p>
					<p>Here's the email address you added:</p>
					<p class="original-email">${json.email}</p>
					<p>And here is your word sorted alphabetically:</p>
					<p class="sorted-email">${json.sorted.join("")}</p>
				</div>
			`;
		}
	} catch (err) {
		result.textContent = "Error: " + err.message;
	}
});
