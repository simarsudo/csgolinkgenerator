"use strict";

const baseLink = "https://steamcommunity.com/market/listings/730/";

const conditions = {
	FN: "Factory New",
	MW: "Minimal Wear",
	FT: "Field-Tested",
	WW: "Well-Worn",
	BS: "Battle-Scarred",
};

const tdClass = ["py-4", "px-6"];
const aClass = [
	"underline",
	"decoration-indigo-400",
	"decoration-2",
	"hover:decoration-indigo-500",
	"text-indigo-400",
	"hover:text-indigo-500",
	"gunLinks",
];

const mainTable = document.getElementById("mainTable");

function capitalize(word) {
	return word.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}

// Add gun to summary

const gun = document
	.getElementById("addGun")
	.addEventListener("click", function (event) {
		event.preventDefault();
		const gunType = document.getElementById("gunType").value;
		const gunName = document.getElementById("gunName").value;
		let gunConditions = [];

		if (document.getElementById("FN").checked) {
			gunConditions.push("FN");
		}

		if (document.getElementById("MW").checked) {
			gunConditions.push("MW");
		}

		if (document.getElementById("FT").checked) {
			gunConditions.push("FT");
		}

		if (document.getElementById("WW").checked) {
			gunConditions.push("WW");
		}

		if (document.getElementById("BS").checked) {
			gunConditions.push("BS");
		}

		const tr = document.createElement("tr");
		const nametd = document.createElement("td");
		const typetd = document.createElement("td");
		const conditionstd = document.createElement("td");

		nametd.innerText = gunName;
		nametd.classList.add(...tdClass);
		typetd.innerText = gunType;
		typetd.classList.add(...tdClass);
		conditionstd.classList.add(
			...tdClass,
			"flex",
			"flex-row",
			"justify-evenly"
		);

		gunConditions.forEach((gunCondition) => {
			const aLink = document.createElement("a");
			aLink.target = "_blank";
			aLink.innerText = gunCondition;
			aLink.classList.add(...aClass);
			aLink.href = encodeURI(
				baseLink +
					gunType +
					" " +
					"| " +
					capitalize(gunName) +
					" " +
					`(${conditions[gunCondition]})`
			)
				.replace("(", "%28")
				.replace(")", "%29");

			conditionstd.appendChild(aLink);
		});

		tr.appendChild(nametd);
		tr.appendChild(typetd);
		tr.appendChild(conditionstd);

		mainTable.appendChild(tr);

		// console.log(conditionstd);
		// console.log(gunType, gunName, gunConditions);
	});

document.getElementById("generateGunsLink").addEventListener("click", () => {
	const gunLinks = document.querySelectorAll("a.gunLinks");
	gunLinks.forEach((gunLink) => {
		window.open(gunLink.href, "_blank");
		console.log(gunLink.href);
	});
});
