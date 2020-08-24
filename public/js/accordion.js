const acc = document.getElementsByClassName('accordion');
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');

    const panel = this.nextElementSibling;
    if (panel.style.display === 'grid') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'grid';
    }
  });
}
