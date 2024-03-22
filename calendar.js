function generateCalendar() {
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    const calendarWrapper = document.getElementById('calendar-wrapper');
    calendarWrapper.innerHTML = ''; // Очистить предыдущий календарь

    const calendarContainer = document.createElement('div'); // Создаем контейнер
    calendarContainer.id = 'calendar-container'; // Присваиваем контейнеру идентификатор

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
    calendarContainer.appendChild(table); // Добавляем таблицу в контейнер

    const today = new Date(); // Получаем сегодняшнюю дату
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();

    let currentDay = 1;
    let currentRow = document.createElement('tr');

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const cell = createCalendarCell('', false);
        currentRow.appendChild(cell);
    }

    while (currentDay <= numDaysInMonth) {
        const isToday = currentDay === today.getDate() && year === today.getFullYear() && month === today.getMonth();
        const cell = createCalendarCell(currentDay, isToday);
        currentRow.appendChild(cell);

        if (currentRow.children.length === 7) {
            tbody.appendChild(currentRow);
            currentRow = document.createElement('tr');
        }

        currentDay++;
    }

    while (currentRow.children.length < 7) {
        const cell = createCalendarCell('', false);
        currentRow.appendChild(cell);
    }

    tbody.appendChild(currentRow);

    calendarWrapper.appendChild(calendarContainer); // Добавляем контейнер в общий контейнер

}

// Функция для создания ячейки календаря
function createCalendarCell(day, isToday) {
    const cell = document.createElement('td');
    cell.textContent = day;
    if (isToday) {
        cell.style.backgroundColor = 'red'; // Применяем желтый цвет фона к сегодняшней ячейке
    }
    return cell;
}

// Вызываем функцию для генерации календаря сразу после загрузки страницы
generateCalendar();

// Добавляем обработчики событий для изменения месяца или года
document.getElementById('month').addEventListener('change', generateCalendar);
document.getElementById('year').addEventListener('change', generateCalendar);

