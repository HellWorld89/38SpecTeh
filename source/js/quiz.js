// source/js/quiz.js
document.addEventListener('DOMContentLoaded', () => {
  // === 1. Логика Всплывающего виджета ===
  const floater = document.querySelector('.quiz-floater');
  const modal = document.querySelector('.quiz-modal');
  const modalClose = document.querySelector('.quiz-modal__close');
  
  if (floater && modal) {
    // Показываем виджет через 15 секунд, если не в модалке
    setTimeout(() => {
      if (!localStorage.getItem('quiz_floater_closed')) {
        floater.classList.add('quiz-floater--visible');
      }
    }, 15000);

    floater.addEventListener('click', () => {
      modal.classList.add('quiz-modal--visible');
      floater.classList.remove('quiz-floater--visible');
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('quiz-modal--visible');
      localStorage.setItem('quiz_floater_closed', 'true'); // Запоминаем, что закрыли
    });

    // Закрытие по клику вне контента
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('quiz-modal--visible');
      }
    });
  }

  // === 2. Логика Самих Квизов (может быть несколько на странице) ===
  const quizzes = document.querySelectorAll('.quiz');

  quizzes.forEach((quiz) => {
    const form        = quiz.querySelector('form');
    const steps       = [...quiz.querySelectorAll('.quiz__step')];
    const totalSteps  = steps.length;
    const progressBar = quiz.querySelector('.quiz__progress-bar');
    const stepNow     = quiz.querySelector('.quiz__step-now');
    const btnBack     = quiz.querySelector('.quiz__back');
    const btnNext     = quiz.querySelector('.quiz__next');
    const btnSubmit   = quiz.querySelector('.quiz__submit');
    const thanks      = quiz.querySelector('.quiz__thanks');
    const progressWrap = quiz.querySelector('.quiz__progress');
    const stepCounter  = quiz.querySelector('.quiz__step-counter');

    if (!form || totalSteps === 0) return;

    let current = 1;

    function setStep(n) {
      current = n;
      steps.forEach(s => s.classList.toggle('quiz__step--active', Number(s.dataset.step) === n));
      progressBar.style.width = `${(n / totalSteps) * 100}%`;
      if (stepNow) stepNow.textContent = n;

      if (btnBack) btnBack.hidden = n === 1;
      
      // Скрываем кнопку "Далее" на последнем шаге и показываем "Отправить"
      if (btnNext) btnNext.hidden = n === totalSteps;
      if (btnSubmit) btnSubmit.hidden = n !== totalSteps;
    }

    function validateStep(n) {
      const step = steps.find(s => Number(s.dataset.step) === n);
      if (!step) return true;

      // Проверка радио-кнопок
      const radios = step.querySelectorAll('input[type="radio"][required]');
      if (radios.length) {
        const byName = {};
        radios.forEach(r => byName[r.name] = true);
        for (const name of Object.keys(byName)) {
          if (!step.querySelector(`input[name="${name}"]:checked`)) return false;
        }
      }

      // Проверка полей на последнем шаге
      if (n === totalSteps) {
        const nameInput  = quiz.querySelector('input[name="name"]');
        const phoneInput = quiz.querySelector('input[name="phone"]');
        const agreeInput = quiz.querySelector('input[name="agree"]');

        [nameInput, phoneInput].forEach(el => el && el.classList.remove('is-invalid'));

        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          nameInput.classList.add('is-invalid'); return false;
        }
        if (phoneInput.value.replace(/\D/g, '').length < 10) {
          phoneInput.classList.add('is-invalid'); return false;
        }
        if (agreeInput && !agreeInput.checked) return false;
      }
      return true;
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (!validateStep(current)) return;
        if (current < totalSteps) setStep(current + 1);
      });
    }

    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (current > 1) setStep(current - 1);
      });
    }

    // Форматирование телефона
    const phoneInput = quiz.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        let d = phoneInput.value.replace(/\D/g, '');
        if (d.startsWith('8')) d = '7' + d.slice(1);
        if (!d.startsWith('7')) d = '7' + d;
        d = d.slice(0, 11);

        let out = '+7';
        if (d.length > 1) out += ' (' + d.slice(1, 4);
        if (d.length >= 5) out += ') ' + d.slice(4, 7);
        if (d.length >= 8) out += '-' + d.slice(7, 9);
        if (d.length >= 10) out += '-' + d.slice(9, 11);

        phoneInput.value = out;
        phoneInput.classList.remove('is-invalid');
      });
    }

    // Отправка формы
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateStep(totalSteps)) return;

      const fd = new FormData(form);
      const equipment = fd.getAll('equipment');
      
      const payload = {
        name:      fd.get('name'),
        phone:     fd.get('phone'),
        equipment: equipment.join(', '),
        task:      fd.get('task') || '',
        when:      fd.get('when') || '',
        address:   fd.get('address') || '',
        page:      window.location.href
      };

      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Отправляем…';
      }

      try {
        const res = await fetch('sendmail.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Ошибка сервера');

        if (window.ym) ym(100691327, 'reachGoal', 'quiz_lead');

        // Показываем экран благодарности
        form.hidden = true;
        if (thanks) thanks.hidden = false;
        if (progressWrap) progressWrap.style.display = 'none';
        if (stepCounter) stepCounter.style.display = 'none';
        
        // Если квиз в модалке, можно автоматически закрыть её через 3 секунды
        if (quiz.closest('.quiz-modal')) {
          setTimeout(() => {
            quiz.closest('.quiz-modal').classList.remove('quiz-modal--visible');
          }, 3000);
        }

      } catch (err) {
        console.error(err);
        alert('Не удалось отправить. Позвоните нам: +7 (3952) 50-38-38');
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'Получить расчёт';
        }
      }
    });

    setStep(1);
  });
});