# ECHO

**autor:** Julia Gonkiewicz  
**nazwa serwisu:** ECHO  
**forma realizacji:** indywidualna  
**profil podmiotu:** komercyjny  
**repozytorium:** https://github.com/pyrogekuwu/ECHO  
**github pages:** 

## KONCEPCJA

ECHO jest marką audio i elektroniki użytkowej osadzoną w Korei Południowej. Oferta obejmuje słuchawki nauszne, słuchawki bezprzewodowe, głośniki oraz akcesoria.

Grupa docelowa soby zainteresowane elektroniką audio, wzornictwem i modą, w szczególności młodzi dorośli. Układ pozwala przeglądać ofertę na telefonach, tabletach i komputerach.

Identyfikacja wizualna opiera się na dużych fotografiach produktów, czerni, bieli, chłodnych szarościach, jasnolawendowych tłach, prostokątnych przyciskach oraz redakcyjnej typografii.

## STYL

Nagłówkom redakcyjnym towarzyszą cienka linia i czteroramienny ornament. 

Przyciski wykorzystują prostokątny kształt, kontrastowe wypełnienie lub obramowanie oraz stany interakcji. 

Ikony Bootstrap Icons oznaczają między innymi wyszukiwanie, konto, koszyk, filtrowanie i nawigację. 

Karty produktów eksponują zdjęcie, nazwę i cenę, a dodatkowe informacje przedstawiają jako etykiety, oceny lub przyciski. 

Powtarzalne elementy zachowują wspólne kolory, odstępy i sposób wyrównania.

## KOLORYSTYKA

| Funkcja | Kolor | Wartość |
|---|---|---|
| Bazowe ciemne tło | Głęboka czerń | `#050506` |
| Tekst na jasnym tle | Grafitowa czerń | `#101114` |
| Jasne powierzchnie i tekst na ciemnym tle | Biel | `#FFFFFF` |
| Jasne przyciski na ciemnym tle | Chłodna biel | `#EFF2FF` |
| Teksty pomocnicze i metadane | Chłodna szarość | `#62646D` |
| Delikatne obramowania i podziały | Jasna szarość | `#DEDEE3` |

Paletę uzupełniają jasnolawendowe tła i rozmyte formy graficzne. Srebrne akcenty wynikają również z fotografii produktów. Kolor nie jest jedynym nośnikiem informacji — dostępność, promocje oraz wybrane filtry mają także oznaczenia tekstowe.

## TYPOGRAFIA

| Zastosowanie | Krój pisma |
|---|---|
| Treść, nawigacja i formularze | Inter |
| Nagłówki redakcyjne | Cormorant Garamond |
| Logotyp ECHO | Genos |
| Metadane i etykiety techniczne | IBM Plex Mono |
| LUMIA i nagłówek hero | VT323 |
| AEROSPACE | Sekuya |
| STARLIGHT | Uncial Antiqua |
| VENUS | BBH Bartle |
| VESPER | Major Mono Display |
| MONO | Sixtyfour |
| SPHERE | Plaster |

Fonty są dołączane w `SiteHead.astro`, a ich zastosowanie definiuje wspólny arkusz CSS.

## ZAKRES

Strona zawiera 11 produktów, 6 artykułów, 4 kategorie produktów i 7 kolekcji. Astro generuje z projektu 37 statycznych stron.

| Moduł | Zawartość |
|---|---|
| Strona główna | Prezentacja LUMIA, kategorie, sekcja AEROSPACE, informacje o marce i bestsellery |
| Kategorie | Headphones, earbuds, speakers i accessories; filtry, sortowanie, licznik wyników i mechanizm paginacji |
| Kolekcje | Kafelki kolekcji oraz osobne strony z przypisanymi produktami |
| Produkt | Galeria, cena, dostępność, warianty, ilość, opis, parametry, opinie i powiązane produkty |
| Koszyk | Zmiana ilości, usuwanie produktów, kod rabatowy i podsumowanie kosztów |
| Checkout | Dane klienta, adres, dostawa, wybór płatności, dane do faktury i podsumowanie zamówienia |
| Moje konto | Pulpit, historia i szczegóły zamówień, edycja adresu i profilu oraz demonstracyjne wylogowanie |
| Magazine | Lista artykułów i podstrony wpisów zapisanych w Markdown |
| Kontakt | Dane przykładowej firmy, formularz, mapa i wskazówki dojazdu |
| Polityka prywatności | Informacje o projekcie, formularzach, pamięci przeglądarki i usługach zewnętrznych |
| Strona 404 | Komunikat błędu, wyszukiwarka zasobów i odnośniki pomocnicze |
| Elementy wspólne | Nawigacja mobilna, ikony Bootstrap Icons oraz czterokolumnowa stopka z newsletterem |

Kategoriami sklepu są `headphones`, `earbuds`, `speakers` i `accessories`. Kolekcje to AEROSPACE, LUMIA, STARLIGHT, VENUS, VESPER, MONO oraz SPHERE.

## TECHNOLOGIA

- **Astro 7.4** — komponenty, routing i generowanie statycznych stron.
- **HTML5, CSS3 i TypeScript** — struktura, wygląd oraz interakcje interfejsu.
- **Bootstrap 5.3.3** — siatka i komponenty interfejsu, dołączane przez CDN.
- **Bootstrap Icons 1.13.2** — ikony, dołączane przez CDN.
- **Markdown** — treści artykułów oraz dane i opisy produktów.
- **yaml** — odczyt metadanych YAML z plików produktów.
- **marked** — renderowanie opisów produktów z Markdown do HTML.
- **Google Fonts** — kroje pisma używane w identyfikacji wizualnej.
- **GitHub Actions i GitHub Pages** — automatyczne budowanie i publikacja.

Wersje zależności są zapisane w `package.json` i `package-lock.json`.

### Uruchamianie lokalne

Wymagany jest **Node.js w wersji co najmniej 22.22.0** oraz npm. Workflow publikacji korzysta z Node.js 24.

W katalogu projektu, zawierającym `package.json`, strone uruchomić można za pomocą:

```bash
npm ci
npm run dev
```

Adres podany w terminalu to `http://localhost:4321/`.

## BUILD I PODGLĄD

```bash
npm run build
npm run preview
```

Build zapisuje wygenerowane pliki w folderze `dist/`. Podgląd uruchamia się pod adresem wskazanym w terminalu.

Bootstrap, ikony, fonty oraz osadzone usługi zewnętrzne wymagają dostępu do internetu.

## PUBLIKACJA NA GITHUB PAGES

Publikację obsługuje workflow `.github/workflows/deploy.yml`.

Po wysłaniu zmian do gałęzi `main` GitHub Actions automatycznie instaluje zależności, buduje witrynę i publikuje ją na GitHub Pages. Workflow można również uruchomić ręcznie z zakładki Actions.

W ustawieniach repozytorium źródłem publikacji w **Settings → Pages → Source** jest **GitHub Actions**.

Konfiguracja `astro.config.mjs` rozróżnia dwa środowiska:

- lokalnie projekt działa pod `/`;
- podczas publikacji workflow ustawia `ECHO_BASE_PATH=/ECHO`, zgodnie z adresem `https://pyrogekuwu.github.io/ECHO/`.

Odnośniki w szablonach korzystają z `import.meta.env.BASE_URL`, dzięki czemu działają w obu środowiskach.

## STRUKTURA PROJEKTU

```text
ECHO/
├── .github/workflows/deploy.yml
├── public/
│   ├── images/
│   └── style.css
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── SiteHead.astro
│   │   ├── ProductCard.astro
│   │   ├── Product.astro
│   │   └── CategoryPage.astro
│   ├── content/
│   │   └── magazine/
│   │       ├── *.md
│   │       └── images/
│   ├── data/
│   │   ├── products/
│   │   │   └── *.md
│   │   ├── products.ts
│   │   └── collections.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── headphones.astro
│   │   ├── earbuds.astro
│   │   ├── speakers.astro
│   │   ├── accessories.astro
│   │   ├── collections/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── product/[id].astro
│   │   ├── magazine.astro
│   │   ├── magazine/[id].astro
│   │   ├── cart.astro
│   │   ├── checkout.astro
│   │   ├── my-account.astro
│   │   ├── contact.astro
│   │   ├── privacy-policy.astro
│   │   └── 404.astro
│   ├── scripts/
│   │   ├── cart.ts
│   │   ├── checkout.ts
│   │   ├── account.ts
│   │   └── category-filters.ts
│   └── content.config.ts
├── astro.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

`Navbar.astro` pełni funkcję wspólnego komponentu nagłówka. `Footer.astro` zawiera wspólną stopkę, a `ProductCard.astro` jest używany na stronie głównej, w kategoriach, kolekcjach i rekomendacjach.

Wspólne style znajdują się w `public/style.css`. Foldery `dist/`, `.astro/` i `node_modules/` są generowane przez narzędzia i nie stanowią źródła treści serwisu.

## PRODUKTY W MARKDOWN

Źródłem danych produktów są pliki **`src/data/products/*.md`**. Każdy produkt ma osobny plik.

- Pomiędzy liniami `---` znajdują się metadane YAML: identyfikator, nazwa, cena, kategoria, kolekcja, kolory, dostępność, zdjęcia i pozostałe parametry.
- Poniżej drugiej linii `---` znajduje się długi opis w Markdown.
- `src/data/products.ts` automatycznie odczytuje wszystkie pasujące pliki i udostępnia wspólną tablicę `products`.
- `src/pages/product/[id].astro` generuje statyczne podstrony produktów. `Product.astro` renderuje ich opisy przy użyciu `marked`.

### Edycja produktów

| Pole | Znaczenie |
|---|---|
| `description` | Krótki opis obok ceny |
| `order` | Kolejność Featured; niższa liczba pojawia się wcześniej, domyślna wartość to 999 |
| `popularity` | Sortowanie według popularności; wyższa liczba oznacza wyższą pozycję |
| `originalPrice` | Cena regularna, przekreślana, gdy jest wyższa od `price` |
| `badge` | Etykieta produktu, np. New lub Bestseller |
| `gallery` | Lista zdjęć zawierających `src` i `alt` |
| `variants` | Lista wariantów zawierających `label` i `productId` |
| `specifications` | Parametry w parach `label` i `value` |
| `reviews` | Opinie z polami `author`, `rating` i `text` |

Zdjęcia produktów znajdują się w `public/images/`. W metadanych zapisuje się ścieżkę `/images/nazwa-pliku.png`, bez prefiksu `public` ani `/ECHO`.

### Dodawanie produktów

Nowy produkt dodawany jest za pomocą duplikacji już istniejących plików `.md`, nadając mu nową nazwę i unikalne `id`, a następnie uzupełniając nowe dane.

Zostanie on automatycznie uwzględniony w odpowiedniej kategorii, filtrach, danych koszyka oraz istniejącej kolekcji, której nazwa odpowiada polu `collection`.

Dostępne kategorie to `headphones`, `earbuds`, `speakers` i `accessories`. Nazwy kolekcji powinny odpowiadać wpisom w `src/data/collections.ts`, z zachowaniem wielkości liter.

Filtry dostępności, kolekcji i kolorów powstają z danych produktów danej strony. Zakres cen zaczyna się od 0 i obejmuje co najmniej 1000 EUR; wyższe ceny automatycznie zwiększają górny limit. Wygląd próbek nowych kolorów można dopisać w obiekcie `swatches` w `CategoryPage.astro`.

Nową kolekcję i jej okładkę dodaje się w `src/data/collections.ts`; jej typografię określa `public/style.css`. Produkty wyróżnione na stronie głównej wybiera lista `bestsellerIds` w `src/pages/index.astro`.

## ARTYKUŁY W MARKDOWN

Artykuły znajdują się w **`src/content/magazine/*.md`**. Kolekcję i wymagane metadane definiuje `src/content.config.ts`.

Każdy wpis zawiera pola `title`, `description`, `pubDate`, `category`, `author`, `image`, `imageAlt` i `tags`, a następnie treść w Markdown.

Nowy artykuł można utworzyć, kopiując istniejący wpis i zmieniając nazwę pliku, metadane oraz treść. Domyślnie nazwa pliku określa identyfikator wpisu używany w adresie `/magazine/[id]/`.

Lista w `src/pages/magazine.astro` automatycznie wyświetla artykuły od najnowszego. Szablon `src/pages/magazine/[id].astro` generuje ich statyczne podstrony.

## FUNKCJE DEMONSTRACYJNE I PRZECHOWYWANIE DANYCH

- Koszyk, demonstracyjne zamówienia, profil oraz adres są przechowywane w `localStorage` danej przeglądarki. Stan demonstracyjnego wylogowania korzysta z `sessionStorage`.
- Podczas pierwszej wizyty koszyk może zawierać dwa przykładowe produkty. Kod `ECHO10` nalicza 10% rabatu od wartości produktów.
- Checkout symuluje złożenie zamówienia i zapisuje je lokalnie. Wybór BLIK, karty lub przelewu nie uruchamia prawdziwej płatności.
- Panel konta prezentuje funkcje klienta bez rzeczywistego uwierzytelniania użytkownika.
- Formularz kontaktowy i newsletter walidują dane oraz wyświetlają komunikaty demonstracyjne, lecz nie wysyłają wiadomości ani nie zapisują adresów do zewnętrznej listy mailingowej.
- Linki społecznościowe prowadzą do zewnętrznych serwisów i mają charakter demonstracyjny.
- Mapa przedstawia przykładową lokalizację COEX w Seulu.

## DODATKOWE WYMAGANIA ASTRO

| Wymaganie | Realizacja |
|---|---|
| Działanie lokalne i automatyczna publikacja na GitHub Pages | Skrypty npm, konfiguracja Astro i workflow GitHub Actions uruchamiany po wysłaniu zmian do `main` |
| Wspólne komponenty Header, Footer i Card | `Navbar.astro`, `Footer.astro` i `ProductCard.astro` |
| Wpisy blogowe w formacie Markdown | `src/content/magazine/*.md` |
| Produkty jako wpisy Markdown i statyczne strony sklepu | `src/data/products/*.md` oraz szablon `src/pages/product/[id].astro` |
