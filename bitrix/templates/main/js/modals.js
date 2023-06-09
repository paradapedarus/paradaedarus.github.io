// скрипт модальных окон
let modal_links = document.querySelectorAll('[data-modal-link]');
let modal_btn_close = document.querySelectorAll('[data-modal-close]');
let lock_padding = document.querySelectorAll('._lock-padding');
let body = document.querySelector('body');
let modal_unlock = true;
let modal_timeout = 800;

function modal_open(modal_curent) {
  if (modal_curent && modal_unlock) {
    let modal_active = document.querySelector('.modal._active');
    if (modal_active) {
      modal_close(modal_active, false);
    } else {
      body_lock();
    }
    modal_curent.classList.add('_active');

    modal_curent.addEventListener('click', (e) => {
      if (!e.target.closest('.modal__dialog')) {
        modal_close(e.target.closest('.modal'));
      }
    });
  }
}

function modal_close(modal_active, do_un_lock = true) {
  if (modal_unlock) {
    modal_active.classList.remove('_active');
    if (do_un_lock) {
      body_un_lock();
    }
  }
}

function body_lock() {
  let lock_padding_value = window.innerWidth - document.querySelector('#sticky-header').offsetWidth + 'px';
  if (lock_padding.length > 0) {
    lock_padding.forEach(el => {
      el.style.paddingRight = lock_padding_value;
    });
  }

  body.style.paddingRight = lock_padding_value;
  body.classList.add('_scroll-lock');

  modal_unlock = false;
  setTimeout(() => {
    modal_unlock = true;
  }, modal_timeout);
}

function body_un_lock() {
  setTimeout(() => {
    if (lock_padding.length > 0) {
      lock_padding.forEach(el => {
        el.style.paddingRight = "0px";
      });
    }

    body.style.paddingRight = "0px";
    body.classList.remove('_scroll-lock');
  }, modal_timeout);

  modal_unlock = false;
  setTimeout(() => {
    modal_unlock = true;
  }, modal_timeout);
}


if (modal_links.length > 0) {
  modal_links.forEach((item) => {
    item.addEventListener('click', (e) => {
      let modal_name = e.target.closest('[data-modal-link]').getAttribute('data-modal-link');
      let modal_curent = document.querySelector("#" + modal_name);
      modal_open(modal_curent);
      e.preventDefault();
    });
  });

  modal_btn_close.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      modal_close(btn.closest('.modal'));
      e.preventDefault();
    });
  });
}

// скрипт модальных окон - END














// выход из личного кабинета
if (getCookie('logged') == 'true') {
  document.querySelectorAll('[data-logout]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let result = confirm("Вы точно хотите выйти из личного кабинета?");
      if (!result) {
        return;
      }
      setCookie('logged', false, { secure: true, 'max-age': 3600 });
      alert("Вы успешно вышли из личного кабинета");
      location.reload();
    });
  });
}





// скрипты для страницы бронирования
if (document.querySelectorAll('.booking__table-item').length > 0) {
  // бронирование
  let bookingBtn = document.querySelector('.booking__btn');
  let bookingPlaceText = document.querySelector('.booking__text span');
  let bookingDateInput = document.querySelector('#datapicker-input');
  let bookingPlaces = document.querySelectorAll('.booking__table-item');

  // датапикер
  new AirDatepicker(bookingDateInput, {
    selectedDates: [new Date()],
    timepicker: true,
    isMobile: true,
    autoClose: true,
  });

  bookingBtn.addEventListener('click', booking);
  function booking() {
    bookingPlaces.forEach(item => {
      if (item.querySelector('input').checked) {
        item.querySelector('input').disabled = true;
      }
    });
    alert("Запишите места и время, чтобы не забыть!" + "\nВаши места: " + bookingPlaceText.innerHTML + "\nВаше время: " + bookingDateInput.value);
    bookingPlaceText.innerHTML = "";
  }
  // вставка номеров мест выбранных
  bookingPlaces.forEach(item => {
    item.querySelector('input').addEventListener('change', input => {
      if (input.target.checked) {
        bookingPlaceText.innerHTML += item.querySelector('span').innerHTML + ', ';
      } else {
        bookingPlaceText.innerHTML = bookingPlaceText.innerHTML.replace(item.querySelector('span').innerHTML + ', ', "");
      }
    });
  });
}




// Павный скрол до страницы
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};