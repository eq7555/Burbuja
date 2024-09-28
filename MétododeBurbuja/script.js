function optimizedBubbleSort(arr) {
    let n = arr.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

function formatTime(timeInMs) {
    if (timeInMs >= 60000) {
        let timeInMin = timeInMs / 60000;
        return `${timeInMin.toFixed(2)} min`;
    } else {
        let timeInSec = timeInMs / 1000;
        return `${timeInSec.toFixed(2)} s`;
    }
}

function generateRandomArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 1000000) + 1);
    }
    return arr;
}

// Iniciar pruebas con botón
document.getElementById('startBtn').addEventListener('click', () => {
    let numTests = 10;
    let minVal = 10000; //10,000
    let maxVal = 100000; //100,000
    let increment = Math.floor((maxVal - minVal) / (numTests - 1)); 

    let testSizes = [];
    let times = [];
    let resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = '';

    for (let i = 1; i <= numTests; i++) {
        let arraySize;
        
        if (i === numTests) {
            arraySize = 100000;
        } else {
            arraySize = minVal + (i - 1) * increment; 
        }

        let arr = generateRandomArray(arraySize);

        let startTime = performance.now();
        optimizedBubbleSort(arr);
        let endTime = performance.now();
        let timeTaken = endTime - startTime;
        let formattedTime = formatTime(timeTaken);

        let row = `<tr>
                    <td>${i}</td>
                    <td>${arraySize}</td>
                    <td>${formattedTime}</td> 
                  </tr>`;
        resultTable.innerHTML += row;

        testSizes.push(i);
        times.push(timeTaken);
    }

    renderChart(testSizes, times);
});

function renderChart(labels, data) {
    const ctx = document.getElementById('timeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tiempo de ejecución (ms)',
                data: data,
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Número de Prueba'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tiempo (ms)'
                    }
                }
            }
        }
    });
}
