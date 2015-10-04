var menuButton = document.querySelector('[menu-button]');
var nav = document.querySelector('nav > ul');

menuButton.addEventListener('click', function(){
  nav.classList.toggle('open');
});
