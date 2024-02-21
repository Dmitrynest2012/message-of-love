// Массив четверостишьи
const quatrains = [
  {
    title: "Посыл",
    date: "08.07.16",
    text: [
      "Посыл – не только единое",
      "И сокровенно сильное!",
      "Это просто необходимое",
      "для Единения посильного!"
    ],
    link: "https://blagayavest.info/poems/2016-07-08"
  },
  {
    title: "Посыл – подсказка",
    date: "11.07.16",
    text: [
      "Посыл – подсказка, Посыл – напутствие!",
      "Посыл же лучше всяких слов!",
      "Он открывает Души присутствие",
      "Там, где не надо больше слов!"
    ],
    link: "https://blagayavest.info/poems/11.07.16.html"
  },
  {
    title: "Посылы",
    date: "04.10.16",
    text: [
      "Посылы важны, не спорю!",
      "Образ для всех ЕДИН!",
      "Пространство придётся строить,",
      "Но точно “один в один”!"
    ],
    link: "https://blagayavest.info/poems/04.10.16.html"
  },
  {
    title: "Посыл",
    date: "26.10.16",
    text: [
      "Посыл вам нужен обязательно!",
      "И в этом весь смысл!",
      "Мир изменится безотлагательно,",
      "Если правильная мысль!"
    ],
    link: "https://blagayavest.info/poems/26.10.16.html"
  },
  {
    title: "Тризна",
    date: "17.11.16",
    text: [
      "Посыл замечен и с Неба!",
      "Росток уже творит серьёзно!",
      "Ещё вчера была небыль,",
      "Сегодня уже всё возможно!"
    ],
    link: "https://blagayavest.info/poems/17.11.16.html"
  },
  {
    title: "Посыл",
    date: "04.12.16",
    text: [
      "Каждый Посыл – стресс,",
      "И не только для голограмм!",
      "Он приобретает вес",
      "При выполнении Программ!"
    ],
    link: "https://blagayavest.info/poems/04.12.16.html"
  },
  {
    title: "Обращение",
    date: "27.01.17",
    text: [
      "Попробуйте! У вас получится!",
      "Ритмом Посылов раскачать!",
      "Сердце цивилизации качнётся,",
      "Цивилизация начнёт дышать!"
    ],
    link: "https://blagayavest.info/poems/27.01.17.html"
  },
  {
    title: "Один за всех или Пророк*",
    date: "25.07.17",
    text: [
      "Часть Меня внутри человека!",
      "Истина – производная Бога!",
      "Служение на века",
      "Проявляется в Посыле и в Боге!"
    ],
    link: "https://blagayavest.info/poems/25.07.17.html"
  }
];

// Функция для выбора случайного четверостишия
function getRandomQuatrain() {
  const randomIndex = Math.floor(Math.random() * quatrains.length);
  return quatrains[randomIndex];
}

// Функция для отображения случайного четверостишия на сайте
function displayRandomQuatrain() {
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

// Определение переменной состояния кнопки
let isAudioActive = false;

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
    const audioButton = document.getElementById('audioButton');
    const audioIcon = document.getElementById('audioIcon');

    if (isAudioActive) {
        playAudio();
        audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.3)';
        audioIcon.innerHTML = '&#x1F50A;'; // Символ колонки/звука
    } else {
        pauseAudio();
        audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.15)';
        audioIcon.innerHTML = '&#x1F507;'; // Символ выключенной колонки/звука
    }
}




// Массив ссылок на картинки
const imageLinks = [
  'https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/Default_space_stars_0.jpg?v=1708360387249',
  'https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/Default_space_stars_0%20(2).jpg?v=1708419565436',
  'https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/Default_space_Pleiades_0%20(2).jpg?v=1708421340565',
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
        console.error('Ошибка при получении времени по Москве:', error);
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

function readExcelToJson(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.arrayBuffer();
            })
            .then(buffer => {
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
                        text: text.trim() // Удаляем лишние пробелы в тексте
                    });
                }

                // Здесь вы можете обработать полученные данные
                resolve(jsonArray); // Разрешаем промис с массивом JSON
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                reject(error); // Отклоняем промис с ошибкой
            });
    });
}

const excelUrlMin = 'https://raw.githubusercontent.com/Dmitrynest2012/message-of-love/raw/main/json_min.xlsx';
const excelUrlMax = 'https://raw.githubusercontent.com/Dmitrynest2012/message-of-love/raw/main/json_max.xlsx';



// Загружаем и читаем файлы Excel, сохраняем данные в переменные json_min и json_max
async function loadData() {
    try {
        json_min = await readExcelToJson(excelUrlMin);
        console.log('json_min:', json_min);
    } catch (error) {
        console.error('Error loading json_min:', error);
    }

    try {
        json_max = await readExcelToJson(excelUrlMax);
        console.log('json_max:', json_max);
    } catch (error) {
        console.error('Error loading json_max:', error);
    }
}

// Вызываем функцию загрузки данных
loadData();











async function loadDataAndRender() {
    try {
        await loadData(); // Ждем, пока данные загрузятся
        updateText(); // После успешной загрузки вызываем функцию обновления текста
    } catch (error) {
        console.error('Error loading data:', error);
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
  
    console.log('json_min:', json_min);
    console.log('json_max:', json_max);


    json = (dayOfMonth === 8 || dayOfMonth === 17 || dayOfMonth === 26) && (
        (hours === 10 && minutes >= 55) || (hours === 11) || (hours === 12 && minutes < 6)
    ) ? json_max : json_min;

    let newText = "";
  
    console.log('Значение json:', json); // Выводим значение json в консоль

    for (const interval of json) {
        if ((hours > interval.from.hour || (hours === interval.from.hour && minutes >= interval.from.minute)) &&
            (hours < interval.to.hour || (hours === interval.to.hour && minutes < interval.to.minute))) {
            newText = interval.text;
          
            if (imageElement.src != 'https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/image%205.jpeg?v=1708190781461') {
          imageElement.src = 'https://cdn.glitch.global/af9f7b9b-e7a6-44b6-8629-5c3b55fa7e18/image%205.jpeg?v=1708190781461';
        };
            
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
                        console.log("Устройство не поддерживает вибрацию.");
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
        console.log("Устройство не поддерживает вибрацию.");
    }
}




let wakeLock = null;

const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock активирован');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

// Запрос Wake Lock при загрузке страницы
document.addEventListener('DOMContentLoaded', requestWakeLock);

// Освобождение Wake Lock при закрытии страницы
window.addEventListener('unload', () => {
  if (wakeLock) {
    wakeLock.release()
      .then(() => {
        console.log('Wake Lock деактивирован');
      })
      .catch((err) => {
        console.error(`${err.name}, ${err.message}`);
      });
  }
});



// Вызываем функцию для обновления случайного четверостишия
displayRandomQuatrain();
// Вызываем функцию для обновления случайного четверостишия каждые 5 минут
setInterval(displayRandomQuatrain, 5 * 60 * 1000);
