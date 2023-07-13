//Імпорти бібліотек
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Report } from 'notiflix/build/notiflix-report-aio';

//Ініціалізація кнопки
const startButton = document.querySelector('button[data-start]');

//Параметри Flatpickr
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		console.log(selectedDates[0]);
		
		if (selectedDates[0] <= new Date()) {
			Report.warning('Choose a date in the future', 'Your date is gone by now', 'I understood');
            startButton.disabled = true;
		} else {
			
			startButton.disabled = false;
		}
	},
};

//Іниціалізація Flatpickr
const flatpickrValue = flatpickr("#datetime-picker", options);

//Конвертація подвійного індекса
function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}

//Оформлення елементів інтерфейсу
function markupTimer(days, hours, minutes, seconds) {
	document.querySelector('[data-days]').textContent = addLeadingZero(days);
	document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
	document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
	document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

//Конвертація дати в мілісекунди
function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}
//Прослуховувач кнопки
startButton.addEventListener('click', onClick);

let timerId = null;

//Функція яка здійснює зворотний відлік до певної дати
function onClick() {
	const selectedDate = flatpickrValue.selectedDates[0];
	
	function countdown() {
		const currentDate = new Date();
		const difference = selectedDate - currentDate;
    
		if (difference <= 0) {
		clearInterval(timerId);
		markupTimer(0, 0, 0, 0);
		return;
		}
		const { days, hours, minutes, seconds } = convertMs(difference);
		markupTimer(days, hours, minutes, seconds);
	}
	
	countdown();
	timerId = setInterval(countdown, 1000);
}