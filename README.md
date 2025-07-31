# PogodApp

**Live Demo:** https://pogodapp.onrender.com/

A weather forecast application that allows you to check 3-day weather forecasts for any city worldwide, powered by OpenWeatherMap.org API integration.

The app also enables comparison with Polish cities in both table and card formats. I've added smart search functionality with city suggestions and input validation. The application is built as a Single Page Application (SPA) using Server-Side Rendering (SSR).

### Author: Patryk Czemierowski

## Tech Stack

* **React 19** - Latest React with modern features
* **TypeScript** - Type safety and better development experience
* **Redux Toolkit** - State management
* **React Router 7** - Client-side routing
* **Vite** - Fast build tool with SSR support
* **Tailwind CSS** - Utility-first CSS framework
* **TanStack Query** - Data fetching and caching
* **Express (Node.js)** - Server-side rendering
* **Lucide React** - Beautiful icon library

## Why These Technologies?

**Vite** provides significantly better developer experience than webpack for this type of project, while offering excellent SSR support. It allows you to get started with minimal configuration.

**Tailwind CSS** was chosen for speed and convenience, along with ready-made components and icons from Lucide React.

There was quite a dilemma with query handling - theoretically, using Redux as required would suggest RTK Query, but I decided on TanStack Query because I wanted to practice with it and find it more "elegant."

I believe there's also a possibility to build the application using only React Router with its actions/loaders, without Redux, but it was clearly stated in the requirements that Redux should be included.

## How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/devvile/pogodApp
   cd pogodApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory

4. **Add API key to .env file**
   ```
   VITE_OPENWEATHER_API_KEY={YOUR_API_KEY}
   ```
   Example: `VITE_OPENWEATHER_API_KEY=zewcbecb988477e4817f79ea1ff43f54`

5. **API Key Note**
   The API key has been sent to the recruiting person. You can also create your own account on OpenWeatherMap, but there's no need to if you have the provided key. Please contact me if there are any issues.

6. **Run the application**
   
   **Development mode:**
   ```bash
   npm run dev
   ```
   
   **Production build:**
   ```bash
   npm run build
   npm run preview
   ```

7. **Best Practice**
   Open in incognito mode in separate tabs for optimal performance

8. **Access URLs**
   - Development: http://localhost:5173
   - Production: http://localhost:5000

## Performance & Optimization

The application has been optimized for Lighthouse metrics, achieving 90%+ scores across all categories in production builds.

**Important Note:** When opening both dev and prod versions in a normal browser (without incognito), you might see dead code notifications from DevTools, which can cause performance drops in Performance tests. This is due to conflicts between cached dev and prod code. Opening in incognito mode eliminates this issue and provides lightning-fast performance.

The application is also responsive across different screen sizes.

## Lighthouse Performance Score
<img width="735" height="495" alt="Lighthouse Performance Score" src="https://github.com/user-attachments/assets/502485a8-24ee-4bc9-bf2d-817100dacb02" />

## Screenshots

### Home Page
<img width="1432" height="784" alt="Home Page" src="https://github.com/user-attachments/assets/970d4c20-2059-4755-9fae-10925587bfb3" />

### City Weather Details
<img width="1774" height="995" alt="City Weather Details" src="https://github.com/user-attachments/assets/c4081547-d5de-47a5-abb6-7a24ad0d9296" />

### Weather Comparison Table
<img width="1705" height="883" alt="Weather Comparison Table" src="https://github.com/user-attachments/assets/91a1d075-4c35-40f2-a8f0-bccb60a41ff1" />

### Weather Comparison Cards
<img width="1725" height="1004" alt="Weather Comparison Cards" src="https://github.com/user-attachments/assets/90111181-a1f3-4496-bdbe-b92446086138" />

## Features

- 🌍 **Global Weather Search** - Check weather for any city worldwide
- 📊 **Polish Cities Comparison** - Compare weather with Polish cities
- 🔍 **Smart Search** - Autocomplete with city suggestions
- 📱 **Responsive Design** - Works on all device sizes
- ⚡ **Server-Side Rendering** - Fast initial page loads
- 🎯 **Performance Optimized** - 90%+ Lighthouse scores
- 📅 **3-Day Forecast** - Extended weather predictions

## License

This project is for demonstration purposes.

# PogodApp

Aplikacja pozwala sprawdzac prognoze pogody na 3 dni dla dowolnego miasta na swiecie w oparciu o intergracje z api Openweathermap.org.
Pozawala takze, na porownanie z miastami w Polsce w formie tabeli albo kart. 
Dodalem tez smartsearch, czyli podpowiedzi dla wyszukiwanego miasta wraz z walidacja inputu. 
Aplikacja jest SPA w technologii SSR.

### Autor: Patryk Czemierowski

## Tech stack

* React 19
* Typescript 
* Redux 
* React Router 7 
* Vite 
* Tailwind CSS 
* Tanstack Query 
* Express (Node.js) 
* Lucide React

Czemu taki wybor?
Vite przy tego typu projekcie daje znacznie lepszy developer experience niz webpack, takze oferujac wsparcie dla SSR. 
Pozwala przy minimalnej konfiguracji zabrac sie do roboty.
Podobnie ze wzgledu na szybkosc i wygode zdecdowalem sie na tailwind i gotowe komponenty / ikony z lucide.
Dosc spory dylemat byl z oblusga zapytan, bo w teorii samo uzycie reduxa jako wymagane by podsuwalo RTK Query, ale 
zdecydowalem sie na tanstacka bo chcialem go sobie pocwiczyc i wydaje mi sie bardziej "elegancki".

Wydaje mi sie ze istnieje tez mozliwosc zbudowania aplikacji tylko w oparciu o react router i jego actions/loaders,
bez reduxa, ale jasno bylo w wymaganiach, ze ma sie pojawic.

## Jak odpalic?

1. Zaciagnac kod z repo
2. Npm install w folderze z aplikacja (ssr-vite)
3. Utworzyc plik .env w folderze bedacym rootem. 
4. W pliku .env dodac zmienna srodowiskowa dla klucza API:
   VITE_OPENWEATHER_API_KEY={API_KEY}
   czyli przykladowo: VITE_OPENWEATHER_API_KEY=zewcbecb988477e4817f79ea1ff43f54
5. Klucz wyslalem do osoby rekrutujacej, oczywiscie mozecie tez sobie zalozyc, no ale nie ma po co, jesli by byl z tym problem prosze o kontakt.
6. Npm run dev ( dla dev)
7. Npm run build, npm run preview (dla buildu produkcyjnego)
8. Najlepiej otwierac w incognito w oddzielnych kartach.
9. Adres dla dev: http://localhost:5173 | prod:http://localhost:3000 

## Inne uwagi
Zoptymalizowalem aplikacje pod parametry z Lighthouse'a i  produckyjny build ma u mnie wszedzie pow 90%.  Przy otwarciu kodu dev i prod w normlanej przegladarce ( bez incognito)
moze wystapic powiadomienie o martwym kodzie z DevToolsa, powoduje to spadek wydajnosci w testach na Performance. Nastepuje jakis konflikt miedzy scachownaym kodem dev i z prod.
Przy otwarciu w incognito jest blyskawica i nie ma problemu. Aplikacja powinna tez byc w miare responsywna.

<img width="735" height="495" alt="image" src="https://github.com/user-attachments/assets/502485a8-24ee-4bc9-bf2d-817100dacb02" />


## Screnshooty :)

<img width="1432" height="784" alt="image" src="https://github.com/user-attachments/assets/970d4c20-2059-4755-9fae-10925587bfb3" />

<img width="1774" height="995" alt="image" src="https://github.com/user-attachments/assets/c4081547-d5de-47a5-abb6-7a24ad0d9296" />

<img width="1705" height="883" alt="image" src="https://github.com/user-attachments/assets/91a1d075-4c35-40f2-a8f0-bccb60a41ff1" />

<img width="1725" height="1004" alt="image" src="https://github.com/user-attachments/assets/90111181-a1f3-4496-bdbe-b92446086138" />
