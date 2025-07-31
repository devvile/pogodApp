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
