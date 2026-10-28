// Find the form and the message area on the page.
const form = document.querySelector("#lead-form");
const formMessage = document.querySelector(".form-message");

if (form) {
	// Select the submit button inside the form.
	const submitButton = form.querySelector(".form-submit");

	// Remember the original button text so we can restore it after an error.
	const submitText = submitButton.textContent;

	// Listen for the form submission and handle it with JavaScript.
	form.addEventListener("submit", async function (event) {
		// Stop the browser from submitting/reloading the page normally.
		event.preventDefault();

		// Disable the button while the request is running.
		submitButton.disabled = true;
		submitButton.textContent = "Submitting...";

		// Collect all named form fields.
		const formData = new FormData(form);

		// Convert FormData into a normal JavaScript object.
		const data = Object.fromEntries(formData);

		try {
			// Send the form data to the FastAPI backend.
			const response = await fetch("http://localhost:8000/leads", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			// response.ok is true for HTTP status codes 200-299.
			// Treat other HTTP responses as errors.
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}

			// Read the JSON response sent back by FastAPI.
			const result = await response.json();

			console.log(result);

			// Check whether the backend reports a successful submission.
			if (result.success) {
				// Remove any previous error or success state.
				formMessage.classList.remove(
					"form-message--error",
					"form-message--success"
				);

				// Mark this as the successful submission state.
				formMessage.classList.add("form-message--success");

				// Display the thank-you message.
				formMessage.textContent =
					"Thank you. Your form has been submitted.";

				// Hide the form so another submission cannot be made.
				form.hidden = true;

				// Show the success message.
				formMessage.hidden = false;

			} else {
				// Remove any previous error or success state.
				formMessage.classList.remove(
					"form-message--error",
					"form-message--success"
				);

				// Mark this as the retry/error state.
				formMessage.classList.add("form-message--error");

				// The request reached the backend, but the backend
				// reported that the submission was not successful.
				formMessage.textContent =
					"Something went wrong. Please try again.";

				// Allow the user to submit again.
				submitButton.disabled = false;
				submitButton.textContent = submitText;

				// Make the retry message visible.
				formMessage.hidden = false;
			}

		} catch (error) {
			// Handles HTTP errors and problems reaching the backend,
			// such as the FastAPI server being unavailable.
			console.error(error);

			// Remove any previous error or success state.
			formMessage.classList.remove(
				"form-message--error",
				"form-message--success"
			);

			// Mark this as the retry/error state.
			formMessage.classList.add("form-message--error");

			// Tell the user the submission failed.
			formMessage.textContent =
				"Something went wrong. Please try again.";

			// Keep the form usable so the user can retry.
			submitButton.disabled = false;
			submitButton.textContent = submitText;

			// Make the retry message visible.
			formMessage.hidden = false;
		}
	});
}

