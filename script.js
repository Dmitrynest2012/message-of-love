
 // Клиентский ID вашего счетчика
 const clientId = 'bb4b1fa766604b568174af4df7b5f120';

// Функция для получения количества посетителей через API Яндекс.Метрики
function fetchVisitors() {
    fetch(`https://api-metrika.yandex.net/stat/v1/data/bytime?metrics=ym:s:users&dimensions=ym:s:date&date1=today&date2=today&ids=${clientId}`)
      .then(response => response.json())
      .then(data => {
        // Получаем количество посетителей за последнюю минуту
        const visitors = data.totals[0];
        // Обновляем отображение счетчика
        document.getElementById('visitorCounter').textContent = `Current visitors: ${visitors}`;
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // Вызываем функцию для получения данных о посетителях каждую минуту
  fetchVisitors();
  setInterval(fetchVisitors, 60000); // Обновляем каждую минуту



  








// Объявляем переменные для времени до события
let hoursLeft, minutesLeft, secondsLeft;

let eventType = "";
let isIntervalActive;
let isButtonClicked = false; // Флаг, указывающий, был ли уже выполнен клик по кнопке



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
let jsonFileRandomMusic; // Объявляем переменную глобально по ссылке на список музыки.


// Получаем ссылки на элементы заголовка песни и имени исполнителя
const songTitleElement = document.getElementById('songTitle');
const artistNameElement = document.getElementById('artistName');

function getRandomSong() {
    
        
        fetch(jsonFileRandomMusic)
        .then(response => response.json())
        .then(data => {
            // Получение случайного объекта из массива
            const randomSong = data[Math.floor(Math.random() * data.length)];

            // Присваивание значений переменным
            name_of_the_song = randomSong.название;
            songwriter = randomSong.автор;
            song_link = randomSong.ссылка;

            audioSource.src = song_link;
            audioPlayer.load();

            // Подставляем значения переменных в текст элементов
            songTitleElement.textContent = name_of_the_song;
            artistNameElement.textContent = songwriter;

            // Здесь можно выполнить другие действия с полученными данными
        })
   

    
        
}



// Теперь мы можем вызывать функцию getRandomSong() в любом месте кода для получения случайной песни






let notificationShown = false;

function handleNotifications() {
    // Проверяем поддержку уведомлений в браузере
    if ("Notification" in window) {
        // Проверяем, показывали ли уже запрос на разрешение уведомлений
        if (!localStorage.getItem('notificationPermissionRequested')) {
            // Запрашиваем разрешение на отправку уведомлений
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    // Устанавливаем флаг о том, что запрос был показан
                    localStorage.setItem('notificationPermissionRequested', true);
                }
            });
        }

        
    }
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
  
  if (audioPlayer.paused) {
    audioPlayer.play();
  }
}

// Функция для остановки аудиоплеера
function pauseAudio() {
  
  if (!audioPlayer.paused) {
    audioPlayer.pause();
  }
}




// Определение переменных состояния кнопки и элементов кнопки
let isAudioActive = false;
const audioButton = document.getElementById('audioButton');
const audioIcon = document.getElementById('audioIcon');

// Получение значения переменной состояния кнопки изображения из локального хранилища при загрузке страницы
window.addEventListener('load', () => {
    const storedAudioStatus = localStorage.getItem('isAudioActive');
    if (storedAudioStatus !== null) {
        isAudioActive = JSON.parse(storedAudioStatus);
        updateButtonState();
    }

    const storedImageStatus = localStorage.getItem('isImageActive');
    if (storedImageStatus !== null) {
        isImageActive = JSON.parse(storedImageStatus);
        updateImageButtonState();
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

// Получаем ссылку на элемент информации о песне
const songInfo = document.getElementById('songInfo');

// Добавляем обработчик события наведения мыши на кнопку
audioButton.addEventListener('mouseenter', function() {
    // Задаем цвет фона кнопке
    audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.75)';
    if(isAudioActive){
    // Делаем элемент информации о песне видимым
    songInfo.style.visibility = 'visible';
    }
});

// Добавляем обработчик события увода мыши с кнопки
audioButton.addEventListener('mouseleave', function() {
    // Возвращаем исходный цвет фона кнопке
    audioButton.style.backgroundColor = isAudioActive ? 'rgba(128, 0, 128, 0.5)' : 'rgba(128, 0, 128, 0.15)';
    // Делаем элемент информации о песне невидимым
    songInfo.style.visibility = 'hidden';
});






let isImageActive = false;

// Функция для обновления состояния кнопки изображения и сохранения состояния в локальное хранилище
function toggleImage() {
    isImageActive = !isImageActive; // Инвертируем состояние кнопки изображения
    updateImageButtonState(); // Обновляем состояние кнопки изображения
    // Сохраняем состояние кнопки изображения в локальное хранилище
    localStorage.setItem('isImageActive', JSON.stringify(isImageActive));
}


// Функция для обновления внешнего вида кнопки изображения в соответствии с состоянием
function updateImageButtonState() {
    if (isImageActive) {
        imageButton.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
        imageIcon.innerHTML = '&#x1F4CB;'; // Значок "Записная книжка"
    } else {
        imageButton.style.backgroundColor = 'rgba(128, 0, 128, 0.15)';
        imageIcon.innerHTML = '&#x1F4CB;'; // Значок "Записная книжка"
    }
}





// Получаем ссылку на элемент кнопки изображения
const imageButton = document.getElementById('imageButton');

// Функция для делания кнопки неактивной
function disableButton() {
    const button = document.getElementById('imageButton');
    if (button) {
        button.disabled = true;
    }
}

// Функция для делания кнопки активной
function enableButton() {
    const button = document.getElementById('imageButton');
    if (button) {
        button.disabled = false;
    }
}

// Добавляем обработчик события наведения мыши на кнопку изображения
imageButton.addEventListener('mouseenter', function() {
    // Задаем цвет фона кнопке
    imageButton.style.backgroundColor = 'rgba(128, 0, 128, 0.75)'; // Новый цвет фона кнопки
});

// Добавляем обработчик события увода мыши с кнопки изображения
imageButton.addEventListener('mouseleave', function() {
    // Возвращаем исходный цвет фона кнопки
    imageButton.style.backgroundColor = isImageActive ? 'rgba(128, 0, 128, 0.5)' : 'rgba(128, 0, 128, 0.15)';
});




// Проверка ориентации устройства
function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        const existingTable = document.querySelector('table');
        if (existingTable) {
            

            // Определение количества строк в таблице
            const rowCount = existingTable.querySelectorAll('tr').length;

            // Установка размера текста для ячеек в зависимости от количества строк
            const cells = existingTable.querySelectorAll('td, th');
            cells.forEach(cell => {
                if (rowCount >= 1) {
                    cell.style.fontSize = '10px'; // Задаем размер текста в пикселях для 1-6 строк
                 
                }
            });
        }
    }
}







// Получаем элемент с идентификатором "imageContainer"
var imageContainerElement = document.getElementById("imageContainer");


// Создаем кнопку
const openTableButton = document.createElement('button');
// Присваиваем кнопке уникальный идентификатор (ID)
openTableButton.id = 'openTableButton';
// Добавляем класс для другой кнопки
openTableButton.classList.add('special-button');
openTableButton.innerHTML = '&#128270;'; // Юникод значок камеры





let tableCreated = false; // Флаг для отслеживания создания таблицы

// Функция для создания или удаления таблицы в зависимости от состояния переменной isImageActive
function toggleTable() {
    if (isImageActive && !tableCreated) {
        // Создаем таблицу и ее родительский контейнер только если они еще не созданы
        // Создаем контейнер для таблицы
        const tableContainer = document.createElement('div');
        tableContainer.id = 'table-container'; // Уникальный идентификатор контейнера
        tableContainer.classList.add('unique-container'); // Уникальный класс контейнера




        const table = document.createElement('table');
        table.id = 'my-table'; // Устанавливаем id для таблицы
        table.classList.add('unique-table'); // Добавляем уникальный класс для таблицы


        // Создаем заголовок таблицы
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        const headers = ['№', 'Посыл / Заповедь', 'Время [мск]'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.style.textAlign = 'center';
            headerRow.appendChild(th);
        });

        // Добавляем 14 строк с данными
for (let i = 0; i < json.length; i++) {
    const rowData = json[i];
    const row = table.insertRow();
    for (let j = 0; j < 3; j++) {
        const cell = row.insertCell();
        if (j === 0) {
            if (i < 6) {
                // Если это первый столбец и номер строки < 6, вставляем номер строки с учетом смещения
                cell.textContent = i + 1;
            }
            cell.style.width = '5%'; // Устанавливаем очень маленькую ширину для первого столбца
        } else if (j === 1) {
            const text = rowData.text.replace(/\*([^*]+)\*/g, '<br><span style="color: #fd7dff;">$1</span><br>');

            cell.innerHTML = text;
            cell.style.width = '85%'; // Устанавливаем длинную ширину для второго столбца
        } else if (j === 2) {
            const from = `${rowData.from.hour}:${rowData.from.minute}`;
            const to = `${rowData.to.hour}:${rowData.to.minute}`;
            cell.textContent = `${from} - ${to}`; // Вставляем время
            cell.style.width = '10%'; // Устанавливаем очень маленькую ширину для третьего столбца
        }
        cell.style.textAlign = 'center';
        cell.style.padding = '5px';
        cell.style.fontSize = '14px';

        // Определение количества строк в таблице
        const rowCount = table.rows.length;

        

        // Установка стилей для ячеек таблицы
        cell.style.backgroundColor = 'rgba(58, 0, 59, 0.8)';
        cell.style.border = '2px solid rgba(128, 0, 128, 0.8)'; // Светло-фиолетовая граница
        cell.style.transition = 'background-color 0.3s, box-shadow 0.3s'; // Добавляем CSS-переходы для плавной анимации смены цвета заднего фона и тени


    cell.addEventListener('mouseover', function() {
        // Применяем стиль при наведении
        cell.style.border = '2px solid rgba(255, 255, 255, 0.6)';
        cell.style.backgroundColor = 'rgba(33, 0, 54, 0.8)';
        // Добавляем стиль для градиентной тени
        cell.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0.3)';
        
    });

    cell.addEventListener('mouseout', function() {
        // Удаляем стиль при уводе курсора с ячейки
        cell.style.border = '2px solid rgba(128, 0, 128, 0.8)'; // Светло-фиолетовая граница
        cell.style.backgroundColor = 'rgba(58, 0, 59, 0.8)';
        // Удаляем стиль для градиентной тени
        cell.style.boxShadow = 'none';
    });




        
    }
}




// Добавляем кнопку в документ
document.body.appendChild(openTableButton);
        

        // Добавляем таблицу в контейнер
    tableContainer.appendChild(table);

    // Добавляем контейнер на страницу
    document.body.appendChild(tableContainer);

    

setTimeout(function() {
    document.getElementById('table-container').classList.add('show');
}, 500); // Применяем класс show через 100 миллисекунд

        
        // Устанавливаем флаг, что таблица создана
    tableCreated = true;
    checkOrientation();
    container.style.overflowY = 'hidden'; // Прячем скроллбар
} else if (!isImageActive && tableCreated) {
    // Удаляем контейнер с таблицей, если он существует и необходимо его скрыть
    const existingContainer = document.getElementById('table-container');
    if (existingContainer) {
        // Удаляем класс 'show', чтобы запустить анимацию скрытия
        existingContainer.classList.remove('show');
        // Ждем завершения анимации, прежде чем удалять контейнер
        setTimeout(function() {
            existingContainer.remove();
            container.style.overflowY = 'auto'; // Разрешаем скроллбар
            // Сбрасываем флаг
            tableCreated = false;
            // Удаляем кнопку
            openTableButton.remove();
        }, 500); // Подождите 500 миллисекунд, чтобы анимация завершилась
    }
}

}







// Массив ссылок на картинки
const imageLinks = [
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-1.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-2.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-3.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-4.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-5.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-6.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-7.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-8.jpg',
  'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-random-9.jpg',
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











let wakeLock = null;

const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    // console.log('Wake Lock активирован');
  } catch (err) {
    // console.error(`${err.name}, ${err.message}`);
  }
};



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






document.addEventListener("DOMContentLoaded", function () {
  
    requestWakeLock(); // Запрещаем авто-отключение экрана пока открыт сайт.
    handleNotifications(); // Первый запрос на разрешение Уведомлений на сайте.
    
    createLocalContainer();
    updateJsonFile();

    
    
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

    dateElement.style.backgroundColor = '#00000000';

    // Устанавливаем тени для элемента даты
    dateElement.style.textShadow = `
    2px 2px 4px rgba(48, 48, 48, 0.6), /* Тень вправо-вниз */
    -2px -2px 4px rgba(48, 48, 48, 0.6), /* Тень влево-вверх */
    2px -2px 4px rgba(48, 48, 48, 0.6), /* Тень вправо-вверх */
    -2px 2px 4px rgba(48, 48, 48, 0.6) /* Тень влево-вниз */
    `;

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
        dateElement.style.color = "white";
    }

    dateElement.style.left = '0px';

    // Устанавливаем позицию и отступы в медиа запросе для портретного режима
if (window.matchMedia("(orientation: portrait)").matches) {
    dateElement.style.position = 'relative';
    dateElement.style.left = '12px';
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


// Сброс всех установок ..........................................................................................
// Функция для проверки, зажаты ли клавиши Shift, Control и Space одновременно
function areAllKeysPressed(event) {
    return event.shiftKey && event.ctrlKey && event.code === "Space";
}

// Обработчик события нажатия клавиши
document.addEventListener("keydown", function(event) {
    // Проверяем, зажаты ли клавиши Shift, Control и Space одновременно
    if (areAllKeysPressed(event)) {
        // Выполняем действие
        clearLocalStorage();
    }
});

// Функция для очистки локального хранилища
function clearLocalStorage() {
    // Удаляем необходимые элементы из локального хранилища
    localStorage.removeItem('xBcF');
    localStorage.clear();
    alert('Локальное хранилище было успешно очищено.');

}
// Сброс всех установок ..........................................................................................

// Рандомный блок
const RandomBlock = ['33426E235E6B503921487635406D5A73463226'];


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
    try {
        // Асинхронно получаем время по Москве из API
        const moscowTime = await fetchMoscowTime();
        const moscowTimestamp = moscowTime.getTime();

        // Получаем текущее локальное время
        const localTime = new Date();
        const localTimestamp = localTime.getTime();

        // Определяем, используем ли время из API или локальное время
        let displayTime;
        if (moscowTimestamp > localTimestamp) {
            displayTime = moscowTime;
        } else {
            displayTime = localTime;
        }

        // Обновляем время на странице
        const timeElement = document.querySelector(".time");
        const hours = displayTime.getHours();
        const minutes = displayTime.getMinutes();
        const seconds = displayTime.getSeconds();
        timeElement.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    } catch (error) {
        //console.error('Error fetching Moscow time:', error);
        // Если возникла ошибка при получении времени из API, используем локальное время
        const localTime = new Date();
        const hours = localTime.getHours();
        const minutes = localTime.getMinutes();
        const seconds = localTime.getSeconds();
        const timeElement = document.querySelector(".time");
        timeElement.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
}

// Вызываем функцию снова через 5 секунд
setTimeout(updateTime, 5000);






let json_min_origin;
let json_max_origin;


let json_min;
let json_max;

















// функция для шифрования
function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const text = ReverseContainer(RandomBlock); 
    const encryptedText = CryptoJS.AES.encrypt(inputText, text).toString();
    document.getElementById('encryptedText').value = encryptedText;
}

// Функция для расшифровки текста
function decryptText(encryptedText) {
    const text = ReverseContainer(RandomBlock); 
    const bytes = CryptoJS.AES.decrypt(encryptedText, text);
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

    updateJsonFile();

// Проверяем, находится ли аудиоплеер на паузе и включен ли он, и если да, то загружаем аудио и запускаем воспроизведение
if (audioPlayer.paused && isAudioActive) {
    audioPlayer.pause(); // Останавливаем текущее воспроизведение

    getRandomSong(); // Получаем следующую песню

    audioPlayer.src = song_link; // Устанавливаем новую песню в качестве источника для аудиоплеера
    audioPlayer.load(); // Загружаем новую песню

    // Добавляем обработчик события loadedmetadata, который вызывается, когда метаданные аудиофайла (например, продолжительность) загружены
    audioPlayer.addEventListener('loadedmetadata', function() {
        audioPlayer.play().then(_ => {
            // Обработчик успешного запуска воспроизведения
            // console.log('Воспроизведение начато');
        }).catch(error => {
            // Обработчик ошибки запуска воспроизведения
            // console.error('Ошибка запуска воспроизведения:', error);
        });
    });
}

toggleTable();

openTableButton.addEventListener('click', function() {
    if (!isButtonClicked) { // Проверяем, не было ли уже выполнено нажатие
        // Получаем HTML-содержимое таблицы
        const tableHTML = document.getElementById('my-table').outerHTML;

        // Отправляем данные в буферный скрипт
        localStorage.setItem('tableHTML', tableHTML);

        // Открываем новую вкладку с table.html
        window.open('table.html');

        isButtonClicked = true; // Устанавливаем флаг в true, чтобы указать, что кнопка была нажата

        // Сбрасываем флаг через 3 секунды
        setTimeout(function() {
            isButtonClicked = false; // Устанавливаем флаг обратно в false
        }, 2000); // 2000 миллисекунд = 2 секунды
    }
});


function checkAndShowNotification() {
    if (hoursLeft === 0 && minutesLeft <= 5) {
        // Если уведомление еще не было показано или осталось ровно 5 минут
        if (!notificationShown || (hoursLeft === 0 && minutesLeft === 5)) {
            // Проверяем текущий статус разрешения на уведомления
            if (Notification.permission === "granted") {
                // Определяем текст уведомления в зависимости от оставшегося времени
                var notificationText = (minutesLeft < 5) ? "Внимание! Осталось менее 5 минут до подготовки к Посылу." : "Готовность. Осталось 5 минут до подготовки к Посылу.";
                
                // Отправляем уведомление
                var notification = new Notification(notificationText);

                // Устанавливаем флаг, что уведомление было показано
                notificationShown = true;
            }
        }
    }
}

setInterval(checkAndShowNotification, 500); // Вызываем функцию каждую секунду


 


    json = (dayOfMonth === 8 || dayOfMonth === 17 || dayOfMonth === 26) && (
        (hours === 10 && minutes >= 55) || (hours === 11) || (hours === 12 && minutes < 5)
    ) ? json_max : json_min;

    if (json === json_min) {
        eventType = 'обычное';
    } else if (json === json_max) {
        eventType = 'часовое';
    } else {
        //console.error('Некорректное значение переменной json');
    }

    
    


    let newText = "";
    
  
    // console.log('Значение json:', json); // Выводим значение json в консоль

    for (const interval of json) {
        if ((hours > interval.from.hour || (hours === interval.from.hour && minutes >= interval.from.minute)) &&
            (hours < interval.to.hour || (hours === interval.to.hour && minutes < interval.to.minute))) {
            newText = interval.text;

            isIntervalActive = true;
            
            if (isIntervalActive) {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = false;
                }
            } else {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = true;
                }
            }

            const buttonBuild = document.getElementById('buttonBuild');
            if(xBcF == 1 || xBcF == true){
                buttonBuild.style.display = 'block';
                } else if (xBcF == 0 || xBcF == false || xBcF == undefined) {
                    buttonBuild.style.display = 'none';
                }
            
            
            // Вызов функции каждые 1 секунд
          if (isIntervalActive) {
            jsonFileRandomMusic = 'main-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'none';
            titleVisitorsElement.style.display = 'none';
            // Применение стилей из медиа-запроса

        } else {
            jsonFileRandomMusic = 'free-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'block';
            titleVisitorsElement.style.display = 'block';
            buttonBuild.display = 'block';

        }
            
          
            if (imageElement.src != 'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-base-1.png') {
          imageElement.src = 'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-base-1.png';
          isIntervalActive = true;

          
            if (hoursLeft === 0 && minutesLeft <= 5) {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = false;
                }
            } else {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = true;
                }
            }
        

          // Вызов функции каждые 1 секунд
          if (isIntervalActive) {
            jsonFileRandomMusic = 'main-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'none';
            titleVisitorsElement.style.display = 'none';
            
            if(xBcF == 1 || xBcF == true){
                buttonBuild.style.display = 'block';
                } else if (xBcF == 0 || xBcF == false || xBcF == undefined) {
                    buttonBuild.style.display = 'none';
                }



        } else {
            jsonFileRandomMusic = 'free-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'block';
            titleVisitorsElement.style.display = 'block';
            buttonBuild.display = 'block';

        }


          fetch(jsonFileRandomMusic)
        .then(response => response.json())
        .then(data => {
            // Получение случайного объекта из массива
            const randomSong = data[Math.floor(Math.random() * data.length)];

            // Присваивание значений переменным
            name_of_the_song = randomSong.название;
            songwriter = randomSong.автор;
            song_link = randomSong.ссылка;

            audioSource.src = song_link;
            audioPlayer.load();

            // Подставляем значения переменных в текст элементов
            songTitleElement.textContent = name_of_the_song;
            artistNameElement.textContent = songwriter;

            // Здесь можно выполнить другие действия с полученными данными
        });

        playSoundAndVibration();

    };


 // Применение стилей из медиа-запроса
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
        
    } else {
            // Ждем завершения анимации, прежде чем обновлять переливающийся фон.
        setTimeout(function() {
            document.body.style.background = "linear-gradient(to bottom, black 50%, #3e2723 100%)";
        }, 300); // Подождите 500 миллисекунд, чтобы анимация завершилась
 
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


       

            if (imageElement.src == 'https://github.com/Dmitrynest2012/message-of-love/raw/main/message-base-1.png') {

            setRandomImage();
            isIntervalActive = false;

            
                if (hoursLeft === 0 && minutesLeft <= 5) {
                    const buttonT = document.getElementById('imageButton');
                    if (buttonT) {
                        buttonT.disabled = false;
                    }
                } else {
                    if (buttonT) {
                    const buttonT = document.getElementById('imageButton');
                        buttonT.disabled = true;
                    }
                }
            
  
            // Вызов функции каждые 1 секунд
            if (isIntervalActive) {
              jsonFileRandomMusic = 'main-music.json';
              // Получаем ссылку на элемент по его id
              const watchElement = document.getElementById('watch');
              const titleVisitorsElement = document.getElementById('titleVisitors');
              const buttonBuild = document.getElementById('buttonBuild');
              // Скрываем элемент
              watchElement.style.display = 'none';
              titleVisitorsElement.style.display = 'none';
              if(xBcF == 1 || xBcF == true){
                buttonBuild.style.display = 'block';
                } else if (xBcF == 0 || xBcF == false || xBcF == undefined) {
                    buttonBuild.style.display = 'none';
                }
          } else {
              jsonFileRandomMusic = 'free-music.json';
              // Получаем ссылку на элемент по его id
              const watchElement = document.getElementById('watch');
              const titleVisitorsElement = document.getElementById('titleVisitors');
              const buttonBuild = document.getElementById('buttonBuild');
              // Скрываем элемент
              watchElement.style.display = 'block';
              titleVisitorsElement.style.display = 'block';
              buttonBuild.display = 'block';

          }
  
            fetch(jsonFileRandomMusic)
          .then(response => response.json())
          .then(data => {
              // Получение случайного объекта из массива
              const randomSong = data[Math.floor(Math.random() * data.length)];
  
              // Присваивание значений переменным
              name_of_the_song = randomSong.название;
              songwriter = randomSong.автор;
              song_link = randomSong.ссылка;
  
              audioSource.src = song_link;
              audioPlayer.load();
  
              // Подставляем значения переменных в текст элементов
              songTitleElement.textContent = name_of_the_song;
              artistNameElement.textContent = songwriter;
  
              // Здесь можно выполнить другие действия с полученными данными
          });  
          };

        
      
     

        isIntervalActive = false;
        
        
      

        
        // Вызов функции каждые 1 секунд
        if (isIntervalActive) {
            jsonFileRandomMusic = 'main-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            
            // Скрываем элемент
            watchElement.style.display = 'none';
            titleVisitorsElement.style.display = 'none';


            if(xBcF == 1 || xBcF == true){
                buttonBuild.style.display = 'block';
                } else if (xBcF == 0 || xBcF == false || xBcF == undefined) {
                    buttonBuild.style.display = 'none';
                }


            
        } else {
            jsonFileRandomMusic = 'free-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'block';
            titleVisitorsElement.style.display = 'block';
            // Применение стилей из медиа-запроса
            buttonBuild.style.display = 'block';

        }

        


    // Применение стилей из медиа-запроса
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
       
    } else {
        // Ждем завершения анимации, прежде чем обновлять переливающийся фон.
        setTimeout(function() {
            document.body.style.background = "linear-gradient(to bottom, black 50%, rgba(0, 2, 141, 0.815) 100%)";
        }, 300); // Подождите 500 миллисекунд, чтобы анимация завершилась
 
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

        hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

        newText = `До следующего Посыла: ${hoursLeft} ч. ${minutesLeft} мин. ${secondsLeft} сек.`;


        if (hoursLeft === 0 && minutesLeft <= 5) {
            const buttonT = document.getElementById('imageButton');
            if (buttonT) {
                buttonT.disabled = false;
            }
        } else {
            const buttonT = document.getElementById('imageButton');
            if (buttonT) {
                buttonT.disabled = true;
            }
        }
            
         
    
       
     

    


        
    } else {
        // Вычисляем время до ближайшего посыл в текущем дне
        const timeDiff = Math.max(nextSending - now, 0);

        hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

        newText = `До следующего Посыла: ${hoursLeft} ч. ${minutesLeft} мин. ${secondsLeft} сек.`;

        
            if (hoursLeft === 0 && minutesLeft <= 5) {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = false;
                }
            } else {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = true;
                }
            }
        

       
        
    


        
            
        





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




// Функция для Реверсирования из одного контейра в другой.
function ReverseContainer(value) {
    return value[0].match(/.{1,2}/g).map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
}





function playSoundAndVibration() {
    // Воспроизводим звук
    const audio = new Audio('https://raw.githubusercontent.com/Dmitrynest2012/message-of-love/main/sound_of_a_bell.wav');
    audio.play();

    // Воспроизводим вибрацию
    if (navigator.vibrate) {
            // Если есть поддержка вибрации
            navigator.vibrate(1500); // Вибрация на 2 секунды
    } else {
        // console.log("Устройство не поддерживает вибрацию.");
    }
}








// Вызываем функцию для обновления случайного четверостишия
displayRandomQuatrain();
// Вызываем функцию для обновления случайного четверостишия каждые 5 минут
setInterval(displayRandomQuatrain, 5 * 60 * 1000);




// Для хтмл запаска <meta property="og:url" content="https://message-of-love.glitch.me/">



function updateJsonFile() {

    if (isIntervalActive) {
        jsonFileRandomMusic = 'main-music.json';
    } else {
        jsonFileRandomMusic = 'free-music.json';
    }
    // Далее вы можете использовать переменную jsonFileRandomMusic по вашему усмотрению
}







// Функция для проверки пароля
function checkPassword() {
    // Получаем введенный пользователем пароль
    const userPassword = document.getElementById('admin-password').value;

    // Чтение содержимого файла "key.txt"
    fetch('key.txt')
        .then(response => response.text())
        .then(encryptedPassword => {
            console.log(encryptedPassword);
            
            

            // Дешифрование полученного зашифрованного пароля
            const decryptedPassword = CryptoJS.AES.decrypt('U2FsdGVkX1+Q0REYIvTY+t8ml5pFPrTMGieZ7MKGOefqIQiDkN7uSXi2wlPNUU1l', decryptText('U2FsdGVkX1+yXQvK/Dj8nYyfVEuidGrZTyCAkEB2FHR9qFF6qEa1TOfGarhgGG3d')).toString(CryptoJS.enc.Utf8);

            console.log('Дешифрованный пароль:', decryptedPassword);

            // Используем дешифрованный пароль как ожидаемый пароль
            const expectedPassword = decryptedPassword;
            console.log('Ожидаемый пароль:', expectedPassword);

            // Проверяем существование админского контейнера
            const adminContainer = document.querySelector('.admin-container');

            if (adminContainer) {
                // Проверяем, существует ли уже сообщение в контейнере
                let messageElement = adminContainer.querySelector('.admin-message');
                
                if (!messageElement) {
                    // Если сообщения нет, создаем новое
                    messageElement = document.createElement('div');
                    messageElement.classList.add('admin-message');
                    adminContainer.appendChild(messageElement);
                }

                // Проверяем длину строки введенного пользователем пароля
                if (userPassword.length === 0) {
                    messageElement.textContent = 'Ожидание данных';
                    messageElement.classList.remove('success', 'error');
                    messageElement.classList.add('waiting');
                } else {
                    // Сравнение введенного пользователем пароля с ожидаемым паролем и обновление текста сообщения
                    if (userPassword === expectedPassword) {
                        messageElement.textContent = 'Секретный ключ совпал';
                        messageElement.classList.remove('error', 'waiting');
                        messageElement.classList.add('success');

                        // Проверяем, существует ли уже кнопка в контейнере
                        let buttonElement = adminContainer.querySelector('.get-access-button');
                        if (!buttonElement) {
                            // Если кнопки нет, создаем новую
                            buttonElement = document.createElement('button');
                            buttonElement.textContent = 'ПОЛУЧИТЬ ДОСТУП';
                            buttonElement.classList.add('get-access-button');
                            buttonElement.id = 'get-access-button';
                            messageElement.appendChild(buttonElement);
                        }
                    } else {
                        messageElement.textContent = 'Ошибка ввода';
                        messageElement.classList.remove('success', 'waiting');
                        messageElement.classList.add('error');

                        // Удаляем кнопку, если она существует
                        const buttonElement = adminContainer.querySelector('.get-access-button');
                        if (buttonElement) {
                            buttonElement.remove();
                        }
                    }
                }
            } else {
                console.error('Админский контейнер не найден');
            }
        })
        .catch(error => {
            console.error('Произошла ошибка при чтении файла:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    setInterval(checkPassword, 500);

});








// Обработчик нажатия клавиш
document.addEventListener('keydown', function(event) {
    // Проверяем нажатие клавиши Shift + Пробел + F8
    if (event.shiftKey && event.code === 'F8') {
        // Проверяем, существует ли контейнер
        const adminContainer = document.querySelector('.admin-container');
        if (adminContainer) {
            // Удаляем созданные элементы, если они уже существуют
            adminContainer.remove();
        } else {
            // Создаем контейнер
            const container = document.createElement('div');
            container.classList.add('admin-container');

            // Создаем надпись
            const label = document.createElement('div');
            label.textContent = 'Введите пароль для административного доступа.';
            container.appendChild(label);

            // Создаем поле ввода
            const input = document.createElement('input');
            input.classList.add('admin-input');
            input.id = 'admin-password'; // Устанавливаем айди для инпута
            input.type = 'password'; // Устанавливаем тип инпута
            input.placeholder = 'Введите секретный ключ ...'; // Устанавливаем плейсхолдер
            container.appendChild(input);

            // Добавляем контейнер в body
            document.body.appendChild(container);
        }

        // Предотвращаем дальнейшее выполнение события
        event.preventDefault();
    }
});

// Проверка сторонних сервисов
const xBcF = localStorage.getItem('xBcF');
let LermA;

document.addEventListener('click', function(event) {
    // Проверяем, было ли событие клика по кнопке 
    if (event.target.matches('.get-access-button')) {
        // Устанавливаем флаг в true
        localStorage.setItem('xBcF', true);
        // Проверка сторонних сервисов
        LermA = true;

        
        createLocalContainer();

        // Удаляем родительский контейнер и его содержимое
        const adminContainer = document.querySelector('.admin-container');
        if (adminContainer) {
            adminContainer.remove();
        }
    }
});

function createLocalContainer() {
    if(xBcF || LermA) {
        // Проверяем, существует ли уже контейнер
        if (!document.getElementById('yHxJ')) {
            const uPmH = document.createElement('div');
            const AES_KEY = "ThisIsTheSecretKey123"; 

            // Обозначаем заголовок
            const encryptedString = CryptoJS.AES.encrypt(decryptText('U2FsdGVkX1+vRMFZcJjJvLVKNNdr/NrdFMxFFFe72KuL4GNLc/ia+Krpd1qI+E2C'), AES_KEY).toString();
            
            // Заменяем значение в rQwE
            const rQwE = [encryptedString];
            
            // Расшифровываем значение для отображения в uPmH.textContent
            const decryptedString = CryptoJS.AES.decrypt(rQwE[0], AES_KEY).toString(CryptoJS.enc.Utf8);
            
            uPmH.textContent = decryptedString; // Расшифровываем значение
            uPmH.classList.add('uPmH'); // Класс
            uPmH.id = 'yHxJ'; // Айди
            document.body.appendChild(uPmH); // Добавляем контейнер в body
            

          // Создаем кнопку
          const exitButton = document.createElement('button');
          // Присваиваем кнопке уникальный идентификатор (ID)
          exitButton.id = 'ExitRNT';
          // Добавляем класс для кнопки
          exitButton.classList.add('ExitRNT');
          // Устанавливаем текст кнопки
          exitButton.textContent = 'Выйти';

          // Помещаем кнопку в родительский элемент
          document.body.appendChild(exitButton);

          // Привязываем обработчик события клика по кнопке
    exitButton.addEventListener('click', function() {
        clearLocalStorage();
        // Обновляем страницу
        location.reload();
    })


        }
    }
}


function showPopup() {
    var popup = document.getElementById('popup');
    var localContainer = document.getElementById('yHxJ'); // ID локального контейнера

    // Проверяем, существует ли локальный контейнер
    if (localContainer) {
        popup.style.display = 'block'; // Показываем попап
    } else {
        popup.style.display = 'none'; // Скрываем попап
    }
}

// Вызываем функцию при загрузке страницы
window.onload = function() {
    showPopup();
};


setInterval(showPopup, 2000);










// Функция для вставки описания в контейнер
function insertDescription(container, description) {
    // Разбиваем описание на строки по тире
    const lines = description.split('- ');

    // Создаем HTML-разметку для описания
    const descriptionHTML = lines.map((line, index) => {
        if (index === 0) {
            // Первая строка без тега <br>
            return `<p>${line.trim()}</p>`;
        } else {
            // Остальные строки с тегом <br>
            return `<p> - ${line.trim()}</p>`;
        }
    }).join('');

    // Вставляем HTML-разметку в контейнер
    container.innerHTML = descriptionHTML;
}

  
  
  
  
  // Получаем кнопку
  const button = document.getElementById('buttonBuild');
  
  // Переменная для хранения состояния активности кнопки
  let buttonBuildActive = false;
  
  // Функция для создания контейнера
  function createContainer() {
    // Проверяем, существует ли контейнер
    const existingContainer = document.getElementById('historyContainer');
    if (!existingContainer) {
      // Создаем новый контейнер
      const container = document.createElement('div');
      container.id = 'historyContainer';
      container.className = 'history-container';
  
      // Загружаем содержимое файла news.json
      fetch('news.json')
        .then(response => response.json()) // Распарсиваем JSON-ответ
        .then(data => {
          // Создаем HTML-разметку текста внутри контейнера на основе данных из файла
          container.innerHTML = `
            <div class="history-header">История изменений:</div>
            <div class="history-content">
              ${data.map(entry => `
                <div>
                  <span class="date">${entry.date}</span><br>
                  <span class="change"></span>
                </div>
              `).join('')}
            </div>
          `;
  
          // Добавляем описание в каждую запись
          const changeElements = container.querySelectorAll('.change');
          data.forEach((entry, index) => {
            insertDescription(changeElements[index], entry.description);
          });
  
          // Добавляем контейнер в тело документа
          document.body.appendChild(container);
        })
        .catch(error => console.error('Error loading news.json:', error));
  
      // Изменяем значение переменной состояния кнопки
      buttonBuildActive = true;
    } else {
      // Если контейнер уже существует, удаляем его
      existingContainer.remove();
  
      // Изменяем значение переменной состояния кнопки
      buttonBuildActive = false;
    }
  
    // Обновляем стили кнопки в зависимости от значения переменной состояния кнопки
    button.style.backgroundColor = buttonBuildActive ? 'rgba(72, 0, 228, 0.695)' : 'rgba(53, 0, 168, 0.25)';
  }
  
  // Добавляем обработчик события при нажатии на кнопку
  button.addEventListener('click', createContainer);
  











    

    
    
