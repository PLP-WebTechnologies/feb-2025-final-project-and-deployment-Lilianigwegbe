// Add dark mode toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Toggle Dark Mode';
  toggleBtn.style.margin = '10px';
  toggleBtn.style.padding = '8px 16px';
  toggleBtn.style.backgroundColor = '#66bb6a';
  toggleBtn.style.color = '#fff';
  toggleBtn.style.border = 'none';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.borderRadius = '5px';

  document.body.insertBefore(toggleBtn, document.body.firstChild);

  const enableDarkMode = () => {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#f5f5f5';
    document.querySelector('header').style.backgroundColor = '#1b5e20';
    document.querySelector('footer').style.backgroundColor = '#1b5e20';
    localStorage.setItem('theme', 'dark');
  };

  const disableDarkMode = () => {
    document.body.style.backgroundColor = '#f0fff0';
    document.body.style.color = '#2e4d2c';
    document.querySelector('header').style.backgroundColor = '#2e7d32';
    document.querySelector('footer').style.backgroundColor = '#2e7d32';
    localStorage.setItem('theme', 'light');
  };

  toggleBtn.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  // Apply saved theme on load
  if (localStorage.getItem('theme') === 'dark') {
    enableDarkMode();
  }
});
