





let quatrains;

fetch('quatrains.json')
  .then(response => response.json())
  .then(data => {
    quatrains = data;
    // Вызываем функцию displayRandomQuatrain после успешного чтения файла JSON
    displayRandomQuatrain();
  })
  // .catch(error => console.error('Ошибка при чтении файла:', error));

// Функция для выбора случайного четверостишия
function getRandomQuatrain() {
  const randomIndex = Math.floor(Math.random() * quatrains.length);
  return quatrains[randomIndex];
}

// Функция для отображения случайного четверостишия на сайте
function displayRandomQuatrain() {
  // Проверяем, есть ли данные в переменной quatrains
  if (!quatrains || quatrains.length === 0) {
    // console.error('Отсутствуют данные в переменной quatrains');
    return;
  }

  const quatrainElement = document.querySelector('.quatrain');
  const randomQuatrain = getRandomQuatrain();

  const quatrainText = randomQuatrain.text.map(line => `<p>${line}</p>`).join('');

  // Проверяем, есть ли звездочка в конце строки названия катрена
  let titleLines = randomQuatrain.title.split('*');
  let quatrainInfo = '';
  if (titleLines.length > 1) {
    // Если название катрена состоит из двух строк или более, применяем line-height: 0.4; для каждой строки
    quatrainInfo = `<p style="line-height: 1.2;">${titleLines.join('<br>')} [Катрен от ${randomQuatrain.date}]</p>`;
  } else {
    // Иначе просто добавляем название катрена
    quatrainInfo = `<p>${randomQuatrain.title} [Катрен от ${randomQuatrain.date}]</p>`;
  }

  // Создаем элемент <a> и добавляем в него информацию о четверостишии
  const quatrainLink = document.createElement('a');
  quatrainLink.href = randomQuatrain.link; // Устанавливаем ссылку
  quatrainLink.target = "_blank"; // Открываем в новой вкладке
  quatrainLink.classList.add('quatrain-link'); // Добавляем класс
  quatrainLink.innerHTML = quatrainInfo + "<br>" + quatrainText;

  // Очищаем содержимое контейнера и добавляем в него четверостишие внутри элемента <a>
  quatrainElement.innerHTML = '';
  quatrainElement.appendChild(quatrainLink);
}




// Установка значения атрибута src для элемента с id="audioSource"
const audioSource = document.getElementById('audioSource');

let name_of_the_song = ''; // название песни
let songwriter = ''; // автор песни
let song_link = ''; // ссылка песни


function getRandomSong() {
    fetch('music.json')
        .then(response => response.json())
        .then(data => {
            // Получение случайного объекта из массива
            const randomSong = data[Math.floor(Math.random() * data.length)];

            // Присваивание значений переменным
            name_of_the_song = randomSong.название;
            songwriter = randomSong.автор;
            song_link = randomSong.ссылка;

            
            audioSource.src = song_link;
            
            // Обновление элемента <audio>, чтобы использовать новый источник
            audioPlayer.load();

            // Здесь можно выполнить другие действия с полученными данными
        })
        .catch(error => console.error('Ошибка:', error));
}

// Теперь мы можем вызывать функцию getRandomSong() в любом месте кода для получения случайной песни















let vibrationPlayed = false;
let lineElement; // Переменная для хранения ссылки на элемент линии

// Получаем ссылку на элемент с классом "container"
var container = document.getElementById('container');


// Получаем ссылку на изображение
var imageElement = document.getElementById('dynamic-image');


// Глобальная переменная для хранения ссылки на аудиоэлемент
let audioPlayer = document.getElementById('audioPlayer');

// Функция для запуска аудиоплеера
function playAudio() {
  let audioPlayer = document.getElementById('audioPlayer');
  if (audioPlayer.paused) {
    audioPlayer.play();
  }
}

// Функция для остановки аудиоплеера
function pauseAudio() {
  let audioPlayer = document.getElementById('audioPlayer');
  if (!audioPlayer.paused) {
    audioPlayer.pause();
  }
}

// Добавляем обработчик события ended для аудиоплеера
audioPlayer.addEventListener('ended', function() {
    // Вызываем функцию для получения случайной песни когда прошлая завершилась
    getRandomSong();

    // Проверяем, включен ли аудиоплеер, и если да, то необходимо запустить воспроизведение новой песни
    if (!audioPlayer.paused) {
        audioPlayer.play();
    }
});


// Определение переменных состояния кнопки и элементов кнопки
let isAudioActive = false;
const audioButton = document.getElementById('audioButton');
const audioIcon = document.getElementById('audioIcon');

// Получение значения переменной состояния кнопки из локального хранилища при загрузке страницы
window.addEventListener('load', () => {
    const storedAudioStatus = localStorage.getItem('isAudioActive');
    if (storedAudioStatus !== null) {
        isAudioActive = JSON.parse(storedAudioStatus);
        updateButtonState();
    }
});

// Функция для обновления состояния кнопки и сохранения состояния в локальное хранилище
function toggleAudio() {
    isAudioActive = !isAudioActive; // Инвертируем состояние кнопки
    updateButtonState(); // Обновляем состояние кнопки
    // Сохраняем состояние кнопки в локальное хранилище
    localStorage.setItem('isAudioActive', JSON.stringify(isAudioActive));
}

// Функция для обновления внешнего вида кнопки в соответствии с состоянием
function updateButtonState() {
    if (isAudioActive) {
        playAudio();
        audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
        audioIcon.innerHTML = '&#x1F50A;'; // Символ колонки/звука
    } else {
        pauseAudio();
        audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.15)';
        audioIcon.innerHTML = '&#x1F507;'; // Символ выключенной колонки/звука
    }
}

// Добавляем обработчик события наведения мыши на кнопку
audioButton.addEventListener('mouseenter', function() {
    // Задаем цвет фона кнопке
    audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
});

// Добавляем обработчик события увода мыши с кнопки
audioButton.addEventListener('mouseleave', function() {
    // Возвращаем исходный цвет фона кнопке
    audioButton.style.backgroundColor = isAudioActive ? 'rgba(128, 0, 128, 0.5)' : 'rgba(128, 0, 128, 0.15)';
});



// Массив ссылок на картинки
const imageLinks = [
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-1.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-2.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-3.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-4.png',
  // Добавьте здесь остальные ссылки на картинки
];



// Функция для генерации случайного числа в диапазоне от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для получения случайной ссылки из массива
function getRandomImageLink() {
  const randomIndex = getRandomInt(0, imageLinks.length - 1);
  return imageLinks[randomIndex];
}

let imageElementRandom;

// Функция для установки случайной ссылки на картинку при загрузке страницы
function setRandomImage() {
  const imageElement = document.querySelector('.image');
  const randomImageLink = getRandomImageLink();
  imageElement.src = randomImageLink;
}
















document.addEventListener("DOMContentLoaded", function () {
  
    
    getRandomSong();
    updateTime();
    // Вызываем функцию загрузки данных и отображения после загрузки
    loadDataAndRender();
    setInterval(updateTime, 1000);
    setInterval(updateText, 1000);
  
    setRandomImage();

    


    const container = document.querySelector(".container");
    const dateElement = document.querySelector(".date");
    const now = new Date();
    const dayOfMonth = now.getDate();

    // Установка актуальной даты
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = now.toLocaleDateString('ru-RU', options);

    // Добавление текста "Посыл" или "Часовой посыл" в зависимости от особого дня
    let prefix = "Сегодня ";
    if (dayOfMonth === 8 || dayOfMonth === 17 || dayOfMonth === 26) {
        prefix += "Часовой + Ежедневные Посылы. ";
        dateElement.style.color = "gold";
    } else {
        prefix += "Ежедневные Посылы. ";
    }
    dateElement.textContent = `${prefix}${dateString}`;
    // Установка шрифта для элемента dateElement
    dateElement.style.fontFamily = "Play";
    dateElement.style.fontSize = "14px";
  
  
    // Применение стилей из медиа-запроса
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
        dateElement.style.fontSize = "11px";
    } else {
        dateElement.style.fontSize = "14px";
    }


// Проверяем, поддерживает ли браузер API запроса на доступ к аудио и локальное хранилище
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices && 'localStorage' in window) {
    // Проверяем, было ли уже предложено разрешение на доступ к аудио
    if (!localStorage.getItem('audioPermissionRequested')) {
        // Запрашиваем разрешение на использование аудио
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            // Пользователь разрешил использование аудио
            // console.log('Доступ к аудио разрешен');
            // Устанавливаем флаг в локальном хранилище, чтобы не предлагать снова
            localStorage.setItem('audioPermissionRequested', true);
        })
        .catch(function(err) {
            // Пользователь отказал в доступе или произошла ошибка
            // console.log('Доступ к аудио отклонен или произошла ошибка: ' + err);
        });
    }
} else {
    // Браузер не поддерживает запрос на доступ к аудио или локальное хранилище
    // console.log('API запроса на доступ к аудио или локальное хранилище не поддерживается');
}






  
// Проверяем, было ли уже отображено всплывающее окно для разрешения звука
    if (!localStorage.getItem('soundPermissionShown')) {
        // Отображаем всплывающее окно с предложением разрешить звук
        if (confirm('Этот сайт хочет включить звук. Разрешить?')) {
            // Запрашиваем разрешение на включение звука
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => {
                    // Звук успешно разрешен
                    alert('Звук разрешен на этом сайте.');
                })
                .catch((err) => {
                    // Не удалось разрешить звук
                    alert('Не удалось разрешить звук на этом сайте.');
                });
        }
        // Устанавливаем флаг, что всплывающее окно было показано для разрешения звука
        localStorage.setItem('soundPermissionShown', 'true');
    }

    


  

  
  
  
  
    
});


function clearLocalStorage() {
    localStorage.clear();
    alert('Локальное хранилище было успешно очищено.');
}




async function fetchMoscowTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Moscow');
        const data = await response.json();
        return new Date(data.utc_datetime);
    } catch (error) {
        // console.error('Ошибка при получении времени по Москве:', error);
        return new Date();
    }
}

async function updateTime() {
    // Получаем текущее локальное время
    const localTime = new Date();
    const localTimestamp = localTime.getTime();

    // Обновляем время на странице
    const timeElement = document.querySelector(".time");
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const seconds = localTime.getSeconds();
    timeElement.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Асинхронно получаем время по Москве
    const moscowTime = await fetchMoscowTime();
    const moscowTimestamp = moscowTime.getTime();

    // Если время из API новее, обновляем время на странице
    if (moscowTimestamp > localTimestamp) {
        const moscowHours = moscowTime.getHours();
        const moscowMinutes = moscowTime.getMinutes();
        const moscowSeconds = moscowTime.getSeconds();
        timeElement.textContent = `${moscowHours < 10 ? '0' + moscowHours : moscowHours}:${moscowMinutes < 10 ? '0' + moscowMinutes : moscowMinutes}:${moscowSeconds < 10 ? '0' + moscowSeconds : moscowSeconds}`;
    }

    // Вызываем функцию снова на следующем кадре анимации
    requestAnimationFrame(updateTime);
}





let json_min_origin;
let json_max_origin;


let json_min;
let json_max;


// функция для шифрования
function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const password = '3Bn#kP9!Hv5@mZsF2&'; // Пароль для шифрования (ключ)
    const encryptedText = CryptoJS.AES.encrypt(inputText, password).toString();
    document.getElementById('encryptedText').value = encryptedText;
}


// Функция для расшифровки текста
function decryptText(encryptedText) {
const password = '3Bn#kP9!Hv5@mZsF2&'; // Пароль для расшифровки (ключ)
const bytes = CryptoJS.AES.decrypt(encryptedText, password);
return bytes.toString(CryptoJS.enc.Utf8);
}

// Функция для чтения данных из Excel и их расшифровки
async function readAndDecryptExcel(url) {
try {
const response = await fetch(url);
if (!response.ok) {
    throw new Error('Network response was not ok');
}
const buffer = await response.arrayBuffer();
const data = new Uint8Array(buffer);
const workbook = XLSX.read(data, { type: 'array' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Преобразуем данные в нужный формат, пропуская первую строку и первую колонку
const jsonArray = [];
for (let i = 1; i < jsonData.length; i++) {
    const [_, text, interval] = jsonData[i]; // Пропускаем первый элемент (первая колонка)
    let fromHour, fromMinute, toHour, toMinute;

    // Извлекаем часы и минуты для времени начала
    const fromMatch = interval.match(/^(\d+):(\d+)/);
    if (fromMatch) {
        fromHour = parseInt(fromMatch[1]);
        fromMinute = parseInt(fromMatch[2]);
    } else {
        fromHour = NaN;
        fromMinute = NaN;
    }

    // Извлекаем часы и минуты для времени окончания
    const toMatch = interval.match(/-(\d+):(\d+)/);
    if (toMatch) {
        toHour = parseInt(toMatch[1]);
        toMinute = parseInt(toMatch[2]);
    } else {
        // Если временной интервал не содержит "-", то его продолжительность 0 минут
        toHour = fromHour;
        toMinute = 0;
    }

    jsonArray.push({
        from: { hour: fromHour, minute: fromMinute },
        to: { hour: toHour, minute: toMinute },
        text: decryptText(text.trim()) // Расшифровываем текст и удаляем лишние пробелы
    });
}

return jsonArray; // Возвращаем массив JSON
} catch (error) {
// console.error('There was a problem with your fetch operation:', error);
throw error; // Пробрасываем ошибку дальше
}
}

// URL файлов Excel
const excelUrlMin = 'https://raw.githubusercontent.com/Dmitrynest2012/message-of-love/main/json_min.xlsx';
const excelUrlMax = 'https://raw.githubusercontent.com/Dmitrynest2012/message-of-love/main/json_max.xlsx';

// Загружаем и расшифровываем данные из Excel
async function loadData() {
try {
json_min = await readAndDecryptExcel(excelUrlMin);
// console.log('json_min:', json_min);
} catch (error) {
// console.error('Error loading and decrypting json_min:', error);
}

try {
json_max = await readAndDecryptExcel(excelUrlMax);
// console.log('json_max:', json_max);
} catch (error) {
// console.error('Error loading and decrypting json_max:', error);
}
}

// Вызываем функцию загрузки данных
loadData();


async function loadDataAndRender() {
try {
await loadData(); // Ждем, пока данные загрузятся
updateText(); // После успешной загрузки вызываем функцию обновления текста
} catch (error) {
// console.error('Error loading data:', error);
}
}



















let json = null; // Начальное значение

let isSoundAndVibrationPlayed = false; // Добавляем переменную для отслеживания проигрывания звука и вибрации

function updateText() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const textElement = document.querySelector(".text");
    const dayOfMonth = now.getDate();
  
    // console.log('json_min:', json_min);
    // console.log('json_max:', json_max);


    json = (dayOfMonth === 8 || dayOfMonth === 17 || dayOfMonth === 26) && (
        (hours === 10 && minutes >= 55) || (hours === 11) || (hours === 12 && minutes < 6)
    ) ? json_max : json_min;

    let newText = "";
  
    // console.log('Значение json:', json); // Выводим значение json в консоль

    for (const interval of json) {
        if ((hours > interval.from.hour || (hours === interval.from.hour && minutes >= interval.from.minute)) &&
            (hours < interval.to.hour || (hours === interval.to.hour && minutes < interval.to.minute))) {
            newText = interval.text;
          
            if (imageElement.src != 'https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/image%205.jpeg?v=1708190781461') {
          imageElement.src = 'https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/image%205.jpeg?v=1708190781461';
        };




 // Применение стилей из медиа-запроса
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
        
    } else {
      
            document.body.style.background = "linear-gradient(to bottom, black 50%, #3e2723 100%)";
     
 
    }
      





         container.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #3e2723, #3e2723)';
          
            // Скрыть элемент блока катрена
            document.querySelector('.quatrain').style.display = 'none';
            const intervalDuration = (interval.to.hour - hours) * 3600 + (interval.to.minute - minutes) * 60 - now.getSeconds();
            if (!lineElement) {
                const container = document.querySelector(".container");
                lineElement = document.createElement("div");
                lineElement.classList.add("line");
                container.appendChild(lineElement);
                lineElement.style.transition = `width ${intervalDuration}s linear`;
                setTimeout(() => {
                    lineElement.style.width = "100%";
                }, 100);
                setTimeout(() => {
                    playSoundAndVibration();
                    if (navigator.vibrate) {
                        navigator.vibrate(3000);
                    } else {
                        // console.log("Устройство не поддерживает вибрацию.");
                    }
                    lineElement.style.width = "0";
                    setTimeout(() => {
                        lineElement.remove();
                        lineElement = null;
                        const nextInterval = json.find(next => {
                            const startTime = new Date();
                            startTime.setHours(next.from.hour, next.from.minute, 0);
                            return startTime > now;
                        });
                        if (!nextInterval) {
                            setTimeout(() => {
                                
                            }, 3000);
                        }
                    }, 1000);
                }, intervalDuration * 1000 + 100);
            }
            break;
        }
    }

    if (!newText) {
      
     if (imageElement.src == 'https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/image%205.jpeg?v=1708190781461') {
          setRandomImage();
        };





    // Применение стилей из медиа-запроса
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
       
    } else {
        document.body.style.background = "linear-gradient(to bottom, black 50%, rgba(0, 2, 141, 0.815) 100%)";
 
    }
      





        container.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #3500a8df, #3500a8df)';
        // Отобразить элемент
        document.querySelector('.quatrain').style.display = 'block';
      
      
    let nextSending = null;
    let nextSendingDate = null;

    // Перебираем массив, чтобы найти ближайший посыл
    for (const interval of json) {
        const startTime = new Date();
        startTime.setHours(interval.from.hour, interval.from.minute, 0);
        
        // Если время начала текущего посыл - позже текущего времени и это первый найденный посыл
        if (startTime > now && !nextSending) {
            nextSending = startTime;
            nextSendingDate = startTime;
        }
    }

    // Если не был найден посыл в текущем дне
    if (!nextSending) {
        // Определяем первый посыл на следующий день
        const firstSending = new Date();
        firstSending.setDate(firstSending.getDate() + 1);
        firstSending.setHours(json[0].from.hour, json[0].from.minute, 0);

        // Вычисляем время до первого посыл на следующий день
        const timeDiff = Math.max(firstSending - now, 0);
        nextSendingDate = firstSending;

        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

        newText = `До следующего Посыла: ${hoursLeft} ч. ${minutesLeft} мин. ${secondsLeft} сек.`;
    } else {
        // Вычисляем время до ближайшего посыл в текущем дне
        const timeDiff = Math.max(nextSending - now, 0);

        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

        newText = `До следующего Посыла: ${hoursLeft} ч. ${minutesLeft} мин. ${secondsLeft} сек.`;
    } 
        if (lineElement) {
            lineElement.remove();
            lineElement = null;
        }
    }

    const parts = newText.split('*');
    const html = parts.map((part, index) => `<span${index % 2 !== 0 ? ' class="animated"' : ''}>${part}</span>`).join('');
    textElement.innerHTML = html;
}










function playSoundAndVibration() {
    // Воспроизводим звук
    const audio = new Audio('https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/14-30%20%D0%9A%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE%D0%BB.wav?v=1708276523227');
    audio.play();

    // Воспроизводим вибрацию
    if (navigator.vibrate) {
            // Если есть поддержка вибрации
            navigator.vibrate(3000); // Вибрация на 2 секунды
    } else {
        // console.log("Устройство не поддерживает вибрацию.");
    }
}




let wakeLock = null;

const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    // console.log('Wake Lock активирован');
  } catch (err) {
    // console.error(`${err.name}, ${err.message}`);
  }
};

// Запрос Wake Lock при загрузке страницы
document.addEventListener('DOMContentLoaded', requestWakeLock);

// Освобождение Wake Lock при закрытии страницы
window.addEventListener('unload', () => {
  if (wakeLock) {
    wakeLock.release()
      .then(() => {
        // console.log('Wake Lock деактивирован');
      })
      .catch((err) => {
        // console.error(`${err.name}, ${err.message}`);
      });
  }
});



// Вызываем функцию для обновления случайного четверостишия
displayRandomQuatrain();
// Вызываем функцию для обновления случайного четверостишия каждые 5 минут
setInterval(displayRandomQuatrain, 5 * 60 * 1000);




// Для хтмл запаска <meta property="og:url" content="https://message-of-love.glitch.me/">