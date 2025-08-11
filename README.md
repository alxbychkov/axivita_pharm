# Axivita Pharm Website

A multi-page website for Axivita Pharm, a pharmaceutical company based in Vienna, Austria.

## Project Structure

```
axivita_pharm/
├── index.html            # Homepage
├── pages/                # Internal pages
│   ├── about.html        # About Us page
│   ├── services.html     # Services page
│   ├── quality.html      # Quality page
│   └── contact.html      # Contact Us page
├── styles/               # CSS files
│   ├── main.css          # Common styles and variables
│   ├── home.css          # Homepage specific styles
│   ├── about.css         # About page specific styles
│   ├── services.css      # Services page specific styles
│   ├── quality.css       # Quality page specific styles
│   └── contact.css       # Contact page specific styles
└── assets/               # Images and other assets
```

## Features

- **Responsive Design**: Mobile-first approach with CSS media queries
- **CSS Variables**: Consistent theming using CSS custom properties
- **Multi-page Structure**: Separate HTML files for each section
- **Modern Layout**: Flexbox and Grid layouts for optimal presentation
- **Accessibility**: Semantic HTML structure

## Pages

1. **Homepage** (`index.html`) - Company overview and main sections
2. **About Us** (`pages/about.html`) - Company mission, values, and advantages
3. **Services** (`pages/services.html`) - Pharmaceutical services offered
4. **Quality** (`pages/quality.html`) - Quality standards and certificates
5. **Contact Us** (`pages/contact.html`) - Contact information and location

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Responsive Web Design
- Figma Design Integration
- Vite (Build Tool)
- Handlebars (Templating)
- ESLint (Code Quality)

## Getting Started

### Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:3000 in your browser

### Production Build
1. Build the project: `npm run build`
2. Preview the build: `npm run preview`
3. Deploy the `dist/` folder to your server

### Code Quality
- Run linting: `npm run lint`

## Design Source

This website is based on Figma designs and includes:
- Modern, clean design aesthetic
- Consistent color scheme and typography
- Professional pharmaceutical industry styling

## Contact Information

- **Company**: Axivita Pharm GmbH
- **Address**: Leopold Ungar Platz 2, 1190 Vienna, Austria
- **Phone**: +43 664 148 06 20
- **Email**: office@axivita-pharm.com

## Development

The project uses a modular CSS approach with:
- `main.css` for common styles and CSS variables
- Page-specific CSS files for unique styling
- Responsive breakpoints for mobile, tablet, and desktop

## License

This project is proprietary to Axivita Pharm GmbH. 

# Axivita Pharm – i18n build

- Переводы: `axivita_pharm/locales/en.json`, `axivita_pharm/locales/de.json`
- Рантайм i18n: `scripts/i18n.js` — подставляет тексты по `data-i18n`.
- Определение языка: по префиксу пути. `/de/` → немецкий, иначе — английский.

## Сборка

1. Установить зависимости:
   ```bash
   npm install
   ```
2. Собрать проект:
   ```bash
   npm run build
   ```

Артефакты:
- `dist/` — английская версия (en)
- `dist/de/` — немецкая версия (de)

## Использование

- Откройте `dist/pages/quality.html` — увидите английский текст.
- Откройте `dist/de/pages/quality.html` — увидите немецкий текст. 