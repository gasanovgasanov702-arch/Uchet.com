/**
 * animations.js
 * Строгие анимации для системы учета (без затрагивания режима планшета)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Добавляем базовые стили для анимаций через JS, чтобы не менять основной файл
    const style = document.createElement('style');
    style.textContent = `
        /* Анимация появления модальных окон */
        .modal {
            backdrop-filter: blur(4px);
            transition: opacity 0.2s ease;
        }
        
        .modal-content {
            transform: translateY(-20px);
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Эффект при наведении на кнопки управления */
        .header-btns button:hover, .btn-main:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .header-btns button:active, .btn-main:active {
            transform: translateY(0);
        }

        /* Строгое появление строк таблицы */
        #admin-data-body tr, #user-data-body tr {
            animation: fadeInRow 0.3s ease forwards;
        }

        @keyframes fadeInRow {
            from { opacity: 0; transform: translateX(-5px); }
            to { opacity: 1; transform: translateX(0); }
        }

        /* Акцент на изменениях в дашборде */
        .stat-box strong {
            transition: color 0.3s ease;
        }
        
        /* Плавный переход темы */
        body {
            transition: background-color 0.4s ease, color 0.4s ease;
        }
    `;
    document.head.appendChild(style);

    // Перехват открытия модальных окон для запуска анимации контента
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const target = mutation.target;
                const content = target.querySelector('.modal-content');
                if (content) {
                    if (target.style.display === 'block') {
                        setTimeout(() => {
                            content.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        content.style.transform = 'translateY(-20px)';
                    }
                }
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        observer.observe(modal, { attributes: true });
    });
});
