
sync("TextShake")

function onLiClick(a) {

	let console_line = document.createElement("p");
	console_line.innerHTML = 'C:\\Site&gt;'+a;
	console_line.className = "text-console";
	document.getElementById("beforeConsole").appendChild(console_line);


	let fakeFile = document.createElement("p");
	fakeFile.className = "text-created";
	let fileInner = pageSections[a];
	//fakeFile.innerHTML = fileInner;
	document.getElementById("beforeConsole").appendChild(fakeFile);
	oneCharAtATime(fakeFile, fileInner);
}

function onLiHover(a) {
	document.getElementById("consoleLine").innerHTML = 'C:\\Site&gt;'+a+'<span class="input-caret">█</span>'
}

function oneCharAtATime(el, str) {
	let c = str[0];
	if (c==null) {
		return;
	}

	let end_index = 1;
	if (c=="<") { // Encounter a <
		let n = "";
		let counter=0;
		while(counter != 2) {
			n = str[end_index];
			if (n === "!") { end_index = 2; break;} // so we know that it is a tag and not just a <

			c+=n;
			end_index++;
			if (n === ">") { counter++; } // End of tag
		}
		
	}

	let temp = el.innerHTML;
	el.innerHTML = temp.concat(c);

	setTimeout(() => {oneCharAtATime(el, str.substring(end_index))}, 15)
	return
}

function sync(animationNameOrNames) {
	const animationNames = new Set(
		Array.isArray(animationNameOrNames) ? animationNameOrNames : [animationNameOrNames]
	);
	const elements = new Set();
	let animationDuration;
	let isPaused = false;
	let lastIterationTimestamp = 0;

	const api = {
		getElements() {
			return elements;
		},

		free() {
			window.removeEventListener('animationiteration', animationIteration, true);
			window.removeEventListener('animationstart', animationStart, true);

			this.start();
			elements.clear();
		},

		start() {
			elements.forEach((el) => {
				if (validate(el)) {
					if (isPaused) {
						el.style.removeProperty('animation-play-state');
					} else {
						el.style.removeProperty('animation');
					}
				}
			});
			isPaused = false;
		},

		stop() {
			isPaused = false;
			elements.forEach((el) => {
				if (validate(el)) {
					el.style.setProperty('animation', 'none');
				}
			});
		},

		pause() {
			isPaused = true;
			elements.forEach((el) => {
				if (validate(el)) {
					el.style.setProperty('animation-play-state', 'paused');
				}
			});
		}
	};

	function shouldSync(event) {
		return animationNames.has(event.animationName);
	}

	function validate(el) {
		const isValid = document.body.contains(el);
		if (!isValid) {
			elements.delete(el);
		}
		return isValid;
	}

	function init() {
		setTimeout(restart, animationDuration);
	}

	function restart() {
		api.stop();
		setTimeout(api.start, 50);
	}

	function animationStart(event) {
		if (shouldSync(event)) {
			const { target: element, timeStamp } = event;
			elements.add(element);

			const diff = timeStamp - lastIterationTimestamp;
			element.style.setProperty('animation-delay', `-${diff}ms`);
		}
	}


	function animationIteration(event) {
		if (shouldSync(event)) {
			const { target: element, timeStamp } = event;
			elements.add(element);

			lastIterationTimestamp = timeStamp;

			if (!animationDuration) {
				animationDuration = cssToMs(window.getComputedStyle(element).animationDuration);
				init();
			}
		}
	}

	window.addEventListener('animationiteration', animationIteration, true);
	window.addEventListener('animationstart', animationStart, true);


	return api;
}

function cssToMs(time) {
	const num = parseFloat(time);
	let unit = time.match(/m?s/);

	if (!unit) return 0;

	[unit] = unit;

	switch (unit) {
		case 's':
			return num * 1000;
		case 'ms':
			return num;
		default:
			return 0;
	}
}