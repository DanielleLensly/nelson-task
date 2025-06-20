const form = document.getElementById("sortForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const urlInput = document.getElementById("url");

const emailWarning = document.getElementById("email-warning");
const urlWarning = document.getElementById("url-warning");

const submitButton = form.querySelector('button[type="submit"]');
const result = document.getElementById("response-box");

let emailTouched = false;
let urlTouched = false;

function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUrl(value) {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

function updateSubmitButtonState() {
	const emailValid = validateEmail(emailInput.value);
	const urlValid = validateUrl(urlInput.value);

	emailWarning.style.display = emailTouched && !emailValid ? "block" : "none";
	urlWarning.style.display = urlTouched && !urlValid ? "block" : "none";

	submitButton.disabled = !(emailValid && urlValid);
}

emailInput.addEventListener("input", () => {
	emailTouched = true;
	updateSubmitButtonState();
});
emailInput.addEventListener("blur", () => {
	emailTouched = true;
	updateSubmitButtonState();
});

urlInput.addEventListener("input", () => {
	urlTouched = true;
	updateSubmitButtonState();
});
urlInput.addEventListener("blur", () => {
	urlTouched = true;
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
				url: urlInput.value.trim(),
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
					<p>And here is your URL sorted alphabetically:</p>
					<p class="sorted-email">${json.sorted.join("")}</p>
				</div>
			`;
		}
	} catch (err) {
		result.textContent = "Error: " + err.message;
	}
});
