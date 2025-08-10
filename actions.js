const addButton = document.getElementById("addCurrentURLButton");
const exportButton = document.getElementById("exportCSV");

addButton.addEventListener("click", function () {
	// Got this from https://stackoverflow.com/questions/1979583/how-can-i-get-the-url-of-the-current-tab-from-a-google-chrome-extension/14251218#14251218
	// Refer to this if things break
	(async () => {
		const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
		const newEntry = [tab.url];
		const data = await getCSVData();
		data.push(newEntry);
		await saveCSVData(data);
		console.log("Added ", tab.url);
	})();
	
});

exportButton.addEventListener("click", function (){
	//Same as above, look at the stackoverflow question to know what's going on here
	(async() => {
		//Do stuff
		const data = await getCSVData();
		const csvString = data.map(row => row.join(",")).join("\n");

		const blob = new Blob([csvString], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const downloadIt = document.createElement("a");
		downloadIt.href = url;
		downloadIt.download = "data.csv";
		downloadIt.click();
		URL.revokeObjectURL(url);
		console.log("Data to export: ", data);
		console.log("Exported CSV");
	})();
})

// Helpers to store and retrieve CSV data from chrome.storage.local
async function getCSVData() {
	return new Promise(resolve => {
		chrome.storage.local.get(["csvData"], (result) => {
			resolve(result.csvData || []);
		});
	});
}

async function saveCSVData(data) {
	return new Promise(resolve => {
		chrome.storage.local.set({ csvData: data }, resolve);
	});
}


