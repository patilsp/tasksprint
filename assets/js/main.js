// Function to toggle the theme
function toggleTheme() {
    var htmlElement = document.getElementById('mainHtml');
  
    if (htmlElement.getAttribute('data-bs-theme') === 'light') {
      htmlElement.setAttribute('data-bs-theme', 'dark');
    } else {
      htmlElement.setAttribute('data-bs-theme', 'light');
    }
  }
  
  // Event listener for the toggle button
  var themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', toggleTheme);
  