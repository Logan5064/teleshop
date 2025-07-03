/**
 * 🌟 Блок заголовка (Hero)
 * Отображает главный заголовок магазина с фоном-градиентом
 */

function renderHeaderBlock(props, design) {
    const title = props.title || 'Добро пожаловать!';
    const subtitle = props.subtitle || '';
    
    return `
        <div class="hero-block" style="
            background: linear-gradient(135deg, ${design.primary_color} 0%, ${design.secondary_color || design.primary_color} 100%);
            color: white;
            padding: 40px 20px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 20px;
        ">
            <h1 style="font-size: 28px; margin-bottom: 10px;">${title}</h1>
            ${subtitle ? `<p style="font-size: 16px; opacity: 0.9;">${subtitle}</p>` : ''}
        </div>
    `;
}

// Экспортируем функцию для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderHeaderBlock };
} 