# Produkty w Markdown

Jedynym źródłem danych produktów są pliki `src/content/products/*.md`. Astro odczytuje je jako kolekcję `products` zdefiniowaną w `src/content.config.ts` i generuje statyczne strony. Nie ma serwerowego API produktów.

## Edycja istniejącego produktu

Otwórz odpowiedni plik, np. `src/content/products/product-lumia-white.md`.

- Pomiędzy pierwszymi dwiema liniami `---` są dane YAML: nazwa, cena, dostępność, kolekcja, kolory, zdjęcia i parametry.
- Po drugiej linii `---` jest długi opis produktu w Markdown. Możesz używać akapitów, pogrubienia i list.
- `description` to krótki opis widoczny obok ceny.
- `price` to cena sprzedaży w euro. Opcjonalne `originalPrice` wyświetla cenę regularną, jeśli jest wyższa.
- `order` określa kolejność „Featured”; mniejsza liczba pojawia się wcześniej. Nowy produkt bez tego pola trafia na koniec.
- `popularity` określa sortowanie „Most popular”; większa liczba pojawia się wcześniej.
- `color` może być tekstem lub listą, np. `[Silver, Pink]`.
- `id` jest stałym identyfikatorem używanym w adresach stron, wariantach i koszyku. Zachowaj identyfikatory istniejących produktów.

## Nowy produkt

Dodaj plik `.md` w tym samym folderze z nowym, unikalnym `id`. Przykład poniżej używa istniejącego zdjęcia jako tymczasowej ilustracji:

```md
---
id: product-example-white
name: Example White
category: headphones
collection: LUMIA
color: White
price: 199.99
image: /images/product-lumia-white.png
alt: Przykładowe białe słuchawki
inStock: true
description: Krótki opis nowego produktu.
order: 20
---

Długi opis produktu. Ten tekst pojawi się w sekcji Description.

Możesz dodać **pogrubienie** albo kolejne akapity.
```

Dostępne kategorie to `headphones`, `earbuds`, `speakers` i `accessories`. Wartość `collection` musi odpowiadać nazwie kolekcji, np. `LUMIA` albo `AEROSPACE`.

Produkt zostanie automatycznie uwzględniony na stronie kategorii, odpowiedniej istniejącej kolekcji, we filtrach, wyszukiwarce 404 oraz w danych koszyka. Wyróżnione produkty strony głównej nadal wybiera lista `bestsellerIds` w `src/pages/index.astro`.

Nową kolekcję jako kafelek dodaje się osobno w `src/data/collections.ts`.

## Galeria i warianty

W YAML możesz dopisać:

```yaml
gallery:
  - src: /images/product-lumia-white.png
    alt: Słuchawki widziane z przodu
  - src: /images/product-lumia-white-detail-1.png
    alt: Zbliżenie słuchawek
variants:
  - label: Silver
    productId: product-aerospace-silver
```

Ścieżki muszą wskazywać na rzeczywiste zdjęcia w `public/images/`, a `productId` musi być identyfikatorem istniejącego produktu. Brak galerii pozostawia zdjęcie główne. Brak opinii wyświetla „No reviews yet”.

## Jak dane trafiają do koszyka

`src/data/products.ts` udostępnia funkcję `getProducts()` odczytującą kolekcję Markdown. `ProductCatalog.astro` umieszcza potrzebne dane w nieuruchamialnym bloku JSON w wygenerowanym HTML. Skrypty koszyka, kasy i konta odczytują ten blok przez `client-products.ts`.

Ten JSON powstaje automatycznie z Markdown podczas generowania strony. Nie jest drugą kopią katalogu do ręcznej edycji. Dane koszyka i zamówień w localStorage zachowują dotychczasowy format i identyfikatory.

## Sprawdzenie i publikacja

Lokalnie: `npm run dev`.

Przed wysłaniem zmian: `npm run build`.

Po pushu na `main` istniejący workflow automatycznie buduje stronę i publikuje ją na GitHub Pages.
