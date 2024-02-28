document.addEventListener('DOMContentLoaded', function() {
    const screenshotButton = document.createElement('button');
    screenshotButton.id = 'screenshot-button';
    screenshotButton.innerHTML = '&#128247;'; // Юникод значок камеры
    screenshotButton.style.fontSize = '24px'; // Размер шрифта для иконки
    screenshotButton.style.marginTop = '5px'; // Вертикальный отступ от прочих элементов
    screenshotButton.style.width = '40px'; // Установите нужные размеры кнопки
    screenshotButton.style.height = '40px'; // Установите нужные размеры кнопки
    screenshotButton.style.display = 'flex'; // Устанавливаем flex-контейнер
    screenshotButton.style.justifyContent = 'center'; // Центрируем содержимое по горизонтали
    screenshotButton.style.alignItems = 'center'; // Центрируем содержимое по вертикали

    // Добавляем кнопку на страницу в новой вкладке
    document.body.appendChild(screenshotButton);

    const screenshotBtn = document.getElementById('screenshot-button');
    screenshotBtn.addEventListener('click', handleScreenshotButtonClick);
});

function convertHtmlToPdf() {
    // Данные для аутентификации на сервисе PDFCrowd
    const username = 'dmitrynest';
    const apiKey = '437b0d373139aa9f5ef2cc83c080bbe4';

    // URL и имя файла для конвертации
    const url = 'https://example.com';
    const fileName = 'document.pdf';

    // Формируем данные для запроса
    const requestData = {
        url: url,
        pdf: fileName
    };

    // Отправляем запрос на конвертацию HTML в PDF
    fetch('https://pdfcrowd.com/api/pdf/convert/html/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ':' + apiKey)
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при конвертации в PDF: ' + response.statusText);
        }
        return response.blob();
    })
    .then(pdfBlob => {
        // Преобразуем полученный Blob в URL
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Открываем PDF в новой вкладке
        window.open(pdfUrl, '_blank');
    })
    .catch(error => {
        console.error('Ошибка при конвертации в PDF:', error);
    });
}

// Вызываем функцию для выполнения конвертации
convertHtmlToPdf();



