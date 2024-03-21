// Функция для загрузки JSON из файла
function loadJSON(callback) {   
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'events.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);  
}

// Функция для добавления событий в календарь
function addEventsToCalendar(events) {
    const calendarCells = document.querySelectorAll('#calendar tbody td');
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const year = eventDate.getFullYear();
        const month = eventDate.getMonth();
        const day = eventDate.getDate();
        calendarCells.forEach(calendarCell => {
            if (calendarCell.textContent == day && 
                parseInt(calendarCell.dataset.year) === year && 
                parseInt(calendarCell.dataset.month) === month) {
                    calendarCell.classList.add('event');
                    const eventText = document.createElement('span');
                    eventText.textContent = event.event;
                    eventText.classList.add('event-text');
                    calendarCell.appendChild(eventText);
            }
        });
    });
}

// Функция для генерации календаря
function generateCalendar() {
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
  
    const calendarWrapper = document.getElementById('calendar-wrapper');
    calendarWrapper.innerHTML = ''; // Очистить предыдущий календарь
  
    const table = document.createElement('table');
    table.id = 'calendar';
  
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');
  
    // Создание заголовков дней недели
    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    for (let day of daysOfWeek) {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
  
    table.appendChild(thead);
    table.appendChild(tbody);
    calendarWrapper.appendChild(table);
  
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
  
    let currentDay = 1;
    let currentRow = document.createElement('tr');
    
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const cell = document.createElement('td');
        currentRow.appendChild(cell);
    }
  
    while (currentDay <= numDaysInMonth) {
        const cell = document.createElement('td');
        cell.textContent = currentDay;
        cell.dataset.year = year; // Добавляем атрибуты с годом и месяцем
        cell.dataset.month = month;
        currentRow.appendChild(cell);
  
        if (currentRow.children.length === 7) {
            tbody.appendChild(currentRow);
            currentRow = document.createElement('tr');
        }
  
        currentDay++;
    }
  
    while (currentRow.children.length < 7) {
        const cell = document.createElement('td');
        currentRow.appendChild(cell);
    }
  
    tbody.appendChild(currentRow);
}

// Вызываем функцию для загрузки данных из файла JSON и добавления событий
loadJSON(function(events) {
    generateCalendar();
    addEventsToCalendar(events);
});

// Добавляем обработчики событий для изменения месяца или года
document.getElementById('month').addEventListener('change', function() {
    generateCalendar();
    loadJSON(function(events) {
        addEventsToCalendar(events);
    });
});

document.getElementById('year').addEventListener('change', function() {
    generateCalendar();
    loadJSON(function(events) {
        addEventsToCalendar(events);
    });
});
