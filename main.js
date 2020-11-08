class CountdownTimer {
	constructor({ selector, targetData }) {
		this.selector = selector;
		this.targetData = targetData;

		this.refs = {
			days: document.querySelector('span[data-value="days"]'),
			hours: document.querySelector('span[data-value="hours"]'),
			mins: document.querySelector('span[data-value="mins"]'),
			secs: document.querySelector('span[data-value="secs"]'),
			timerFace: document.querySelector("#timer-1"),
		};
	}
	renderCoutnDownTime() {
		setInterval(() => {
			this.currentTime = Date.now();
			const deltaTime = this.targetData - this.currentTime;
			this.updateTimerFace(getTimeComponents(deltaTime));
			// console.log(deltaTime);
		}, 1000);
	}
	updateTimerFace({ days, hours, mins, secs }) {
		this.refs.days.innerHTML = days;
		this.refs.hours.innerHTML = hours;
		this.refs.mins.innerHTML = mins;
		this.refs.secs.innerHTML = secs;
	}
}

const counter = new CountdownTimer({
	selector: "#timer-1",

	targetData: new Date("Nov 11, 2020"),
});
counter.renderCoutnDownTime();

function pad(value) {
	return String(value).padStart(2, "0");
}

function getTimeComponents(time) {
	/*
	 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
	 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
	 */
	const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

	/*
	 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
	 * остатка % и делим его на количество миллисекунд в одном часе
	 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
	 */
	const hours = pad(
		Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	);
	/*
	 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
	 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
	 */
	const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

	/*
	 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
	 * миллисекунд в одной секунде (1000)
	 */
	const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

	return { days, hours, mins, secs };
}
