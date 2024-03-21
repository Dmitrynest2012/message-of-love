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
  
  // Вызываем функцию для генерации календаря сразу после загрузки страницы
  generateCalendar();
  
  // Добавляем обработчики событий для изменения месяца или года
  document.getElementById('month').addEventListener('change', generateCalendar);
  document.getElementById('year').addEventListener('change', generateCalendar);
  


