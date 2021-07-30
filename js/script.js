import { Text, Image } from "./res.js";
import {
	fadeIn,
	fadeOut,
	imgAnim,
	slideDown,
	typeWritting,
} from "./animation.js";

const music = document.querySelector("#music");
const hbd = document.querySelector("#hbd");

let scene3Flag = true;

function DatenTime() {
	const date = document.querySelectorAll("header h4")[0];
	const time = document.querySelectorAll("header h4")[1];
	const day = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	setInterval(() => {
		let d = new Date();
		let t = d.toLocaleTimeString();
		date.innerHTML =
			day[d.getDay()] +
			", " +
			d.getDate() +
			" " +
			month[d.getMonth()] +
			" " +
			d.getFullYear();
		time.innerHTML = t;
	}, 1);
}

function scene1() {
	const div = document.querySelector("#scene-1");

	fadeIn(div, 10, "flex");
	setTimeout(() => {
		fadeOut(div, 10, "none");
		setTimeout(() => {
			scene2();
		}, 1000);
	}, 4000);
}

function scene2() {
	const div = document.querySelector("#scene-2");
	const textArea = document.querySelector("#scene-2 .text-area");
	const paragraph = document.querySelector("#scene-2 .text-area p");

	div.style.display = "flex";
	div.style.opacity = 0;
	paragraph.innerHTML = Text.Scene_2[0];
	let textAreaHeight = paragraph.clientHeight + "px";
	// alert(textAreaHeight)
	// textArea.style.height = textAreaHeight

	let typingSound = new Audio("../sound/typewrite.wav");
	typingSound.oncanplay = () => {
		typingSound.muted = true;
		typingSound.play();
		typingSound.muted = false;
		typingSound.loop = true;
	};
	typeWritting(paragraph, Text.Scene_2, 50, 2000);
	fadeIn(div, 10, "flex");
	setTimeout(() => {
		typingSound.pause();
	}, 18000);
	setTimeout(() => {
		music.src = "../sound/music.mp3";
		music.loop = true;
		music.oncanplay = () => {
			fadeOut(div, 10, "none");
			music.muted = true;
			music.play();
			music.muted = false;
			if (scene3Flag) {
				scene3Flag = false;
				setTimeout(() => {
					scene3();
				}, 1000);
			}
		};
	}, 20000);
}

function scene3() {
	const div = document.querySelector("#scene-3");
	const img = document.querySelector("#scene-3 img");
	const title = document.querySelector("#scene-3 .title");
	const textArea = document.querySelector("#scene-3 .text-area");
	const paragraph = document.querySelector("#scene-3 .text-area p");

	div.style.display = "flex";
	div.style.opacity = 0;
	const textAreaHeight = textArea.offsetHeight + "px";
	console.log(textAreaHeight);
	// textArea.style.height = textAreaHeight
	title.style.display = "none";
	// Start Animation
	fadeIn(div, 10, "flex");
	imgAnim(img, Image, 25, "vw", 10);
	typeWritting(paragraph, Text.Scene_3, 50, 3500);
	setTimeout(() => {
		hbd.src = "../sound/hbd.mp3";
		hbd.oncanplay = () => {
			hbd.muted = true;
			hbd.play();
			hbd.muted = false;
			slideDown(title, 10);
			fadeIn(title, 10, "flex");
		};
	}, 36000);
	setTimeout(() => {
		fadeOut(div, 10, "none");
		setTimeout(() => {
			scene4();
		}, 2000);
	}, 45000);
}

function scene4() {
	const div = document.querySelector("#scene-4");
	const img = document.querySelector("#scene-4 img");
	const title = document.querySelector("#scene-4 h2");
	const textArea = document.querySelector("#scene-4 .text-area");
	const paragraph = document.querySelector("#scene-4 .text-area p");

	div.style.opacity = 0;
	div.style.display = "flex";
	const textAreaHeight = textArea.offsetHeight + "px";
	textArea.style.height = textAreaHeight;
	paragraph.innerHTML = "";
	img.style.display = "none";
	textArea.style.display = "none";

	let text = Text.Scene_4.doa;
	let strIndex = 0;
	let i = 0;
	let opc = 0;

	let opcAnim = setInterval(() => {
		div.style.opacity = opc;
		if (opc >= 1) {
			clearInterval(opcAnim);
			div.style.opacity = opc = 1;
			setTimeout(() => {
				let fade = setInterval(() => {
					div.style.opacity = opc;
					if (opc <= 0) {
						clearInterval(fade);
						div.style.opacity = opc = 0;
						// div.style.display = 'none'
						img.style.display = "block";
						textArea.style.display = "flex";
						img.src = "../img/" + Text.Scene_4.img[i];
					}
					opc -= 0.01;
				}, 10);
			}, 1000);
		}
		opc += 0.01;
	}, 10);

	// console.log(text);
	const run = () => {
		let str = text[i];
		// let str = "TEXT DOA FAYS FAMILY DISINI"
		let element = Text.Scene_4.fays[i];

		title.innerHTML = element;
		let opcAnim = setInterval(() => {
			div.style.opacity = opc;
			if (opc >= 1) {
				clearInterval(opcAnim);
				div.style.opacity = opc = 1;
			}
			opc += 0.01;
		}, 10);

		let textAnim = setInterval(() => {
			paragraph.innerHTML += str[strIndex];
			strIndex++;
			if (strIndex >= str.length) {
				clearInterval(textAnim);
				strIndex = 0;
				setTimeout(() => {
					let fade = setInterval(() => {
						div.style.opacity = opc;
						if (opc <= 0) {
							clearInterval(fade);
							div.style.opacity = opc = 0;
							div.style.display = "none";
							i++;
							if (i < Text.Scene_4.fays.length) {
								paragraph.innerHTML = "";
								div.style.display = "flex";
								setTimeout(() => {
									img.src = "../img/" + Text.Scene_4.img[i];
								}, 500);
							} else {
								div.style.display = "none";
								setTimeout(() => {
									scene5();
								}, 1000);
							}
						}
						opc -= 0.01;
					}, 10);
				}, 1500);
			}
		}, 50);
	};
	img.onload = run;
}

function scene5() {
	const div = document.querySelector("#scene-5");

	div.style.display = "flex";
	div.style.opacity = 0;

	fadeIn(div, 10, "flex");
}

scene1();
DatenTime();
