const button = document.getElementById("addCurrentURLButton");

button.addEventListener("click", function () {
	// Got this from https://stackoverflow.com/questions/1979583/how-can-i-get-the-url-of-the-current-tab-from-a-google-chrome-extension/14251218#14251218
	// Refer to this if things break
	(async () => {
	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	console.log(tab.url);
	})();
	
});
