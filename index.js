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

const navClass = ["bg-indigo-500", "text-slate-50"];

const mainTable = document.getElementById("mainTable");

const gunNav = document.getElementById("gunNav");
const stickerNav = document.getElementById("stickerNav");

// Navbar click navigation function

gunNav.addEventListener("click", () => {
	gunNav.classList.add(...navClass);
	gunNav.classList.remove("hover:bg-indigo-100");
	stickerNav.classList.remove(...navClass);
	stickerNav.classList.add("hover:bg-indigo-100");

	const gunForm = document.getElementById("gunForm");
	const stickerForm = document.getElementById("stickerForm");

	gunForm.classList.remove("hidden");
	stickerForm.classList.add("hidden");
});

stickerNav.addEventListener("click", () => {
	stickerNav.classList.add(...navClass);
	stickerNav.classList.remove("hover:bg-indigo-100");
	gunNav.classList.remove(...navClass);
	gunNav.classList.add("hover:bg-indigo-100");

	const gunForm = document.getElementById("gunForm");
	const stickerForm = document.getElementById("stickerForm");

	gunForm.classList.add("hidden");
	stickerForm.classList.remove("hidden");
});

// Gun Generator

const gun = document
	.getElementById("addGun")
	.addEventListener("click", function (event) {
		event.preventDefault();

		const gunType = document.getElementById("gunType").value;
		const gunName = document.getElementById("gunName").value;
		let gunConditions = [];

		// Checking check boxes

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

		// Creating table elements

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
					gunName +
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
	});

// Generate all Gun links

document.getElementById("generateGunsLink").addEventListener("click", () => {
	const gunLinks = document.querySelectorAll("a.gunLinks");
	gunLinks.forEach((gunLink) => {
		window.open(gunLink.href, "_blank");
		console.log(gunLink.href);
	});
});

// Sticker Generator
