//REQUIRE USER TO FINISH FORMS 
// BS5 OFFICIAL CODE
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()



//WORD COUNTER FOR TEXT INPUT
function countWords() {
    var text = document.getElementById('userInputText').value.trim();
    var count = text === '' ? 0 : text.split(' ').length;
    var counter = document.getElementById('wordCounter');

    counter.textContent = count + ' / 2000 words';

    if (count >= 2001) {
        counter.textContent = 'Maximum words reached.';
        counter.classList.remove('alert-secondary');
        counter.classList.add('alert-danger');
    } else {
        counter.textContent = count + ' / 2000 words';
        counter.classList.remove('alert-danger');
        counter.classList.add('alert-secondary');
    }

}




//UPDATE ALERT ERRORS
const errors = new Set();

function updateError() {
    const error = document.getElementById('infoError');
    const errorMsg = document.getElementById('infoErrorMsg');
    if (errors.size > 0) {
        error.classList.remove('d-none');
        errorMsg.innerHTML = '<strong>Error/s:</strong> ' + [...errors].join(' ');
    } else {
        error.classList.add('d-none');
        errorMsg.innerHTML = '';
    }
}



//VALIDATIONS
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword');

    if (confirmPassword.value && password !== confirmPassword.value) {
        errors.add('Passwords do not match.');
        confirmPassword.setCustomValidity('mismatch');
    } else {
        errors.delete('Passwords do not match.');
        confirmPassword.setCustomValidity('');
    }
    updateError();
}

function usernameValidation() {
    const value = document.create_acc.username.value;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (value === '' || usernameRegex.test(value)) {
        errors.delete('Invalid username.');
    } else {
        errors.add('Invalid username.');
    }
    updateError();
}


//TOGGLES
function togglePass(inputId, span) {
    const input = document.getElementById(inputId);
    const icon = span.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}





//DROPZONE
if (document.getElementById('sim-dropzone')) {
    Dropzone.autoDiscover = false;
    const myDropzone = new Dropzone("#sim-dropzone", {
        url: "/upload/",
        maxFilesize: 25,
        acceptedFiles: ".doc,.docx,.pdf,image/*",
        autoProcessQueue: true,
        addRemoveLinks: true,
        maxFiles: 1,
        dictMaxFilesExceeded: "You can only upload one file.",
        dictFileTooBig: "File is too large. Maximum file size is 25MB.",
    });

    myDropzone.on("addedfile", function () { });
    document.querySelector("#sim-dropzone .dz-message").innerHTML = `
      <i class="bi bi-inbox sim-drop-icon d-block"></i>
      <p class="sim-drop-label">Click or drag file to this area to upload</p>
      <p class="sim-drop-hint">Accepts DOC, DOCX, PDF, image files. Maximum file size 25MB.</p>
    `;

    document.querySelector(".sim-upload-btn").addEventListener("click", function () {
        myDropzone.processQueue();
    });
}



//CALLS

if (document.getElementById('confirmPassword')) {
    document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);
}

if (document.getElementById('username')) {
    document.getElementById('username').addEventListener('input', usernameValidation);
    document.getElementById('username').addEventListener('blur', usernameValidation);
}
if (document.getElementById('userInputText')) {
  document.getElementById('userInputText').addEventListener('input', countWords);
}

// TRENDS PAGE

document.addEventListener("DOMContentLoaded", function () {
  renderYearlyOutputChart();
  renderResearchDistributionChart();
  renderTopicHeatmap();
});

/*  Yearly Research Output (bars + trend lines per year)  */
function renderYearlyOutputChart() {
  const ctx = document.getElementById("yearlyOutputChart");
  if (!ctx) return;

  const labels = ["Thesis", "Capstone"];

  const years = [
    { year: "2021", color: "#7fd1c1", data: [30, 44] },
    { year: "2022", color: "#8f7ee0", data: [55, 69] },
    { year: "2023", color: "#e08fa0", data: [80, 95] },
    { year: "2024", color: "#f2c94c", data: [110, 130] },
    { year: "2025", color: "#5b9bd5", data: [140, 165] },
  ];

  const datasets = [];

  years.forEach((y) => {
    // Bar for this year (shown in the legend)
    datasets.push({
      type: "bar",
      label: y.year,
      data: y.data,
      backgroundColor: y.color,
      borderRadius: 4,
      barPercentage: 0.85,
      categoryPercentage: 0.9,
      order: 2,
      showLegend: true,
    });

    // Line connecting this year's bars (hidden from the legend)
    datasets.push({
      type: "line",
      label: y.year,
      data: y.data,
      borderColor: y.color,
      backgroundColor: y.color,
      pointRadius: 4,
      pointBackgroundColor: "#fff",
      pointBorderColor: y.color,
      pointBorderWidth: 2,
      borderWidth: 2,
      fill: false,
      tension: 0,
      order: 1,
      showLegend: false,
    });
  });

  new Chart(ctx, {
    data: { labels: labels, datasets: datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "nearest", intersect: true },
      plugins: {
        legend: {
          position: "top",
          labels: {
            filter: (item, data) => data.datasets[item.datasetIndex].showLegend,
            usePointStyle: true,
            pointStyle: "rect",
            font: { family: "Inter", size: 11 },
            color: "#555",
            boxWidth: 10,
            boxHeight: 10,
          },
        },
        tooltip: {
          titleFont: { family: "Inter" },
          bodyFont: { family: "Inter" },
          callbacks: {
            title: (items) => items[0].label,
            label: (item) => `${item.dataset.label}: ${item.formattedValue}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: "Inter", size: 11 }, color: "#555" },
        },
        y: {
          min: 0,
          max: 180,
          ticks: { stepSize: 20, font: { family: "Inter", size: 10 }, color: "#888" },
          grid: { color: "#f0f0f0" },
        },
      },
    },
  });
}

/* Research Distribution (exploded pie) */
function renderResearchDistributionChart() {
  const ctx = document.getElementById("researchDistributionChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["BSIT", "BSIS", "BSCS"],
      datasets: [
        {
          data: [300, 250, 160],
          backgroundColor: ["#8c7cda", "#fd948a", "#3dc3e1"],
          borderColor: "#fdfdfd",
          borderWidth: 3,
          offset: [10, 10, 10],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { family: "Inter", size: 11 },
            color: "#555",
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: { titleFont: { family: "Inter" }, bodyFont: { family: "Inter" } },
      },
    },
  });
}

/* Topic Heat Map */
function renderTopicHeatmap() {
  const grid = document.getElementById("heatmapGrid");
  if (!grid) return;

  const years = [2021, 2022, 2023, 2024, 2025];
  const topics = [
    "Machine Learning",
    "Web Development",
    "Cybersecurity",
    "Mobile Development",
    "Data Science",
  ];

  // Sample paper counts per topic per year (rows follow the topics order above)
  const data = {
    "Machine Learning": [2, 6, 10, 17, 4],
    "Web Development": [5, 9, 9, 7, 3],
    "Cybersecurity": [2, 3, 6, 9, 13],
    "Mobile Development": [3, 6, 5, 8, 4],
    "Data Science": [3, 5, 12, 13, 12],
  };

  let html = "";

  // One row per topic: a label cell followed by one colored segment per year
  topics.forEach((topic) => {
    html += `<div class="heatmap-row-label">${topic}</div>`;

    data[topic].forEach((value, i) => {
      const swatchClass = getHeatmapSwatchClass(value);
      const isFirst = i === 0;
      const isLast = i === data[topic].length - 1;
      const positionClass = isFirst ? "heatmap-segment-first" : isLast ? "heatmap-segment-last" : "";

      html += `<div class="heatmap-segment ${swatchClass} ${positionClass}" title="${topic} ${value} papers"></div>`;
    });
  });

  // Bottom axis row with year labels
  html += `<div></div>`;
  years.forEach((year) => {
    html += `<div class="heatmap-year-label">${year}</div>`;
  });

  grid.innerHTML = html;
}

function getHeatmapSwatchClass(value) {
  if (value <= 3) return "heatmap-swatch-1";
  if (value <= 7) return "heatmap-swatch-2";
  if (value <= 11) return "heatmap-swatch-3";
  if (value <= 15) return "heatmap-swatch-4";
  return "heatmap-swatch-5";
}