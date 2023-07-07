
  //Функція генератор кольорів
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

//Визначення кнопок
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');
    let intervalId = null;


//Прослуховування кнопки Start
startButton.addEventListener('click', (e) => {
    e.target.disabled = true;
    stopButton.disabled = false;
        
    intervalId = setInterval(function() {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    });

//Прослуховування кнопки Stop
stopButton.addEventListener('click', (e) => {
	e.target.disabled = true;
	startButton.disabled = false;
	
	clearInterval(intervalId);
});
