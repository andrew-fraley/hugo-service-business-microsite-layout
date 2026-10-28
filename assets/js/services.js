/* SERVICES SELECTOR */

document.querySelectorAll("[data-services]").forEach((component) => {
	const buttons = component.querySelectorAll("[data-service-index]");
	const panels = component.querySelectorAll("[data-service-panel]");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const selectedIndex = button.dataset.serviceIndex;

			/* Update the selected button */
			buttons.forEach((item) => {
				const isSelected =
					item.dataset.serviceIndex === selectedIndex;

				item.setAttribute("aria-pressed", String(isSelected));
			});

			/* Show the matching panel and hide the others */
			panels.forEach((panel) => {
				panel.hidden = 
					panel.dataset.servicePanel !== selectedIndex;
			});
		});
	});
});
