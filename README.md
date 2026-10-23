# ECHO

**autorka:** Julia Gonkiewicz  
**nazwa serwisu:** ECHO  
**forma realizacji:** indywidualna  
**profil podmiotu:** komercyjny (fikcyjna marka koncepcyjna)  
**repozytorium:** https://github.com/pyrogekuwu/ECHO  
**projekt interfejsu:** https://www.figma.com/design/ZNbElkiCFw3ZDcek7ghxgi/echo?node-id=12-28  

## KONCEPCJA

ECHO jest fikcyjną marką elektroniki użytkowej inspirowaną współczesnym wzornictwem produktów audio, osadzoną w kontekście południowokoreańskiego rynku technologicznego. Serwis prezentuje kolekcje słuchawek nausznych, słuchawek bezprzewodowych, głośników przenośnych i akcesoriów, eksponując ich formę, materiały oraz charakter wizualny. Strona łączy funkcję wizerunkową z katalogiem produktów i stanowi podstawę do rozbudowy o blog oraz moduł sprzedażowy.

Grupa docelowa soby zainteresowane elektroniką audio, wzornictwem przemysłowym i modą, w szczególności młodzi dorośli orientacyjnie w wieku 18–35 lat. Projekt zakłada zarówno szybkie przeglądanie oferty na smartfonie, jak i bardziej szczegółowe poznawanie kolekcji na tablecie i komputerze. Wiek i urządzenia są założeniami projektowymi, a nie wynikami badań użytkowników.

W docelowej wersji serwisu: przejście na kartę produktu i zakup. W obecnym etapie: zapoznanie się z kategoriami, przejście do wyróżnionych produktów oraz wysłanie zapytania przez formularz kontaktowy (obecnie demonstracyjny, bez backendu).

## STYL GUIDE

| Funkcja | Kolor | HEX |
|---|---|---|
| Primary — ciemne tło, nawigacja, sekcja marki | Głęboka czerń | `#050506` |
| Secondary — tło katalogu i kolekcji | Jasny lawendowy | `#EEF1FD` |
| Accent / CTA — jasne przyciski na ciemnym tle | Lodowa biel | `#EFF2FF` |
| Text — tekst na jasnych tłach | Grafitowa czerń | `#101114` |
| Text inverse — tekst na ciemnych tłach | Chłodna biel | `#F8F9FF` |
| Supporting — detal techniczny i ornamenty | Srebrnoszary | `#C0C3CD` |

Paleta bazuje na czerni i chłodnych odcieniach bieli. Jasnolawendowe tła i rozmyte fioletowe formy stanowią uzupełnienie fotografii produktowej, a nie dominujący kolor interfejsu. Dla wskazanych par tekst–tło kontrast wynosi orientacyjnie: `#F8F9FF` na `#050506` — **19,39:1**, `#101114` na `#EEF0FF` — **16,67:1**, `#06070B` na `#EFF2FF` — **18,04:1**. Spełniają wymaganie WCAG AA dla zwykłego tekstu; pozostałe warianty, stany interakcji i tekst na zdjęciach wymagają osobnego sprawdzenia.

## TYPOGRAFIA

| Funkcja | Krój pisma | Zastosowanie |
|---|---|---|
| Tekst podstawowy i większość nagłówków | **Inter** | Opisy produktów, menu, formularze, tytuły sekcji technicznych |
| Nagłówki redakcyjne | **Cormorant Garamond** | „shop by categories”, „shop by collections”, „our bestsellers” |
| Nagłówek produktu w Hero | **DotGothic16** | „LUMIA PRO 2” — cyfrowy charakter typografii |
| Logotyp | **Genos** | Znak słowny ECHO w nawigacji i stopce |
| Drobne etykiety techniczne | **IBM Plex Mono** | Metadane, numery, opisy o charakterze technicznym |

## KOMPOZYCJA

Estetyka ECHO opiera się na dużych fotografiach produktowych, prostokątnych przyciskach i płaskich kartach bez nadmiernego zaokrąglania. Kontrast czarnych sekcji z jasnym katalogiem, asymetryczny układ materiałów redakcyjnych oraz chromowane detale budują futurystyczny, minimalistyczny charakter. Nawigacja pozostaje oszczędna; na mniejszych ekranach przechodzi w menu zwijane. Inspiracje nowoczesnymi sklepami technologicznymi służą do opracowania własnego języka wizualnego marki.

## ZAKRES

Aktualny **One-Page Hub** zawiera następujące bloki, ułożone od góry strony:

1. **Nawigacja ECHO** — logotyp, kategorie „headphones”, „ear buds”, „speakers”, „accessories”, skróty do wyszukiwania i sekcji serwisu; na małych ekranach menu typu hamburger.
2. **Hero — Lumia Pro 2** — zdjęcie przewodnie, nazwa produktu, krótki opis i przycisk „discover”.
3. **Shop by categories** — cztery kafelki: headphones, earbuds, speakers, accessories.
4. **Shop by collections / AEROSPACE** — redakcyjna prezentacja kolekcji z zestawieniem dwóch fotografii.
5. **About Our World** — opis koncepcji marki i jej podejścia do wzornictwa.
6. **Our bestsellers** — trzy karty produktowe, nazwy, ceny i interfejs oznaczania ulubionych.
7. **Get in contact** — dane kontaktowe i formularz z polami imię, e-mail, temat i wiadomość.
8. **Footer** — identyfikacja marki, nawigacja, elementy społecznościowe i prawa autorskie.

**Priorytet nawigacyjny:** produkty i kolekcje są prezentowane przed informacjami o marce. Odbiorca może przejść od produktu promowanego do kategorii, a następnie do oferty wyróżnionej lub kontaktu. Obecne odnośniki działają głównie jako kotwice; osobne strony produktów zostaną opracowane później.

## TECHNOLOGIA

### Uruchamianie i publikacja

Wymagany jest Node.js co najmniej 22.22.0. W katalogu projektu uruchom:

```sh
npm ci
npm run dev -- --background
```

Lokalnie strona działa pod `/`, a katalog słuchawek pod `/headphones/`.
Serwerem w tle zarządzają polecenia `npm run astro -- dev status`,
`npm run astro -- dev logs` i `npm run astro -- dev stop`.
Lokalny build i podgląd: `npm run build`, następnie `npm run preview`.

Workflow `.github/workflows/deploy.yml` ustawia `ECHO_BASE_PATH=/ECHO` wyłącznie
na czas budowania witryny dla GitHub Pages. Dzięki temu ta sama aplikacja działa
pod `https://pyrogekuwu.github.io/ECHO/`, bez ręcznego zmieniania linków.
W ustawieniach repozytorium **Settings → Pages → Source** wybierz **GitHub Actions**.

**Środowisko:** Astro (szablony `.astro` generujące semantyczny HTML5), CSS3, Bootstrap 5 udostępniany przez CDN, niewielkie skrypty JavaScript i GitHub Codespaces. Główny widok znajduje się w `src/pages/index.astro`, niestandardowe style w `public/style.css`, grafiki w `public/images/`.

**Elementy już obecne w wersji roboczej:** znaczniki `header`, `nav`, `main`, `section` i `footer`, jeden nagłówek `h1`, teksty alternatywne dla merytorycznych obrazów, etykiety pól formularza, `meta viewport`, `title`, `description`, Open Graph oraz JSON-LD typu `Organization`. Zastosowano siatkę i komponenty Bootstrapa z własnymi nadpisaniami CSS, w tym menu mobilne oraz formularz.

**Wymogi do utrzymania podczas kolejnych etapów:** układ mobile-first, testy przy szerokościach 360–390, 768 i co najmniej 1200 px, brak niekontrolowanego poziomego przewijania, elastyczne obrazy i typografia, cele dotykowe minimum 44 × 44 px, logiczna hierarchia nagłówków i widoczny fokus klawiatury. Dokumentacja projektu wymaga także walidacji danych strukturalnych oraz audytu Lighthouse. Obecny arkusz zawiera również reguły `@media (max-width: …)`, dlatego przejście na konsekwentnie mobile-first pozostaje zadaniem porządkującym, a nie zakończonym wdrożeniem.

## PLAN ROZBUDOWY

| Etap | Planowany moduł | Zakres |
|---|---|---|
| Wizytówka | Strona główna | Prezentacja oferty, tożsamości marki i kontaktu; aktualny etap projektu |
| Informacyjny | Blog / artykuły | Poradniki i treści redakcyjne dotyczące sprzętu audio oraz projektowania produktów |
| Sprzedażowy | Sklep internetowy | Podstrony produktów, filtrowanie katalogu, koszyk i proces zamówienia w zakresie wymagań prowadzącego |
| Architektura | Brakujące podstrony | Np. szczegóły produktu, informacje o marce, kontakt i inne wymagane widoki |
| Optymalizacja | Audyt i poprawki | Lighthouse, WCAG, SEO, testy responsywności i poprawność linków |

Projekt prowadzony jest przyrostowo w jednym repozytorium. Kolejne etapy powinny być dokumentowane commitami na GitHubie, zgodnie z zasadami przedmiotu.

## PROMPT

> Jesteś front-end developerem pracującym nad studenckim projektem ECHO — responsywnym serwisem fikcyjnej marki elektroniki audio. Rozwijaj istniejący projekt w Astro, wykorzystując semantyczny HTML5, czysty CSS3 i Bootstrap 5 z CDN do siatki i niezbędnych komponentów. Nie zmieniaj samowolnie przyjętej architektury, nazewnictwa klas ani identyfikacji wizualnej. Pracuj przyrostowo: zachowuj działające sekcje i modyfikuj tylko zakres wymagany w bieżącym zadaniu.
>
> Zachowaj kolory: #050506 (ciemne tło), #EEF0FF (jasne tło katalogu), #EFF2FF (jasny CTA), #101114 (tekst na jasnym tle) i #F8F9FF (tekst na ciemnym tle). Typografia: Inter — treść; Cormorant Garamond — nagłówki redakcyjne; DotGothic16 — ekspozycja produktu Lumia Pro 2; Genos — logotyp; IBM Plex Mono — etykiety techniczne. Estetyka: editorial tech, prostokątne przyciski, regularny grid produktów, asymetryczne fotografie kolekcji, umiarkowane efekty i brak przypadkowych ozdobników.
>
> Każdy widok ma spełniać wymagania RWD: mobile-first, czytelność w szerokościach 360–390, 768 i 1200+ px, brak przewijania poziomego, dostępne menu mobilne, co najmniej 44 × 44 px dla celów dotykowych, jeden h1, logiczna hierarchia h2–h3, poprawne alt, label/for/id i czytelny fokus. Każda podstrona musi mieć własne title, description, Open Graph i adekwatny JSON-LD Schema.org.
>
> Style własne zapisuj w zewnętrznym pliku public/style.css, a obrazy odwołuj do public/images/. Nie zastępuj dostarczonych grafik generowanymi zamiennikami. Nie dodawaj nieuzgodnionych frameworków. Nie pozoruj działających zakupów, płatności, logowania lub wysyłania wiadomości: funkcje demonstracyjne oznaczaj wyraźnie. Zanim zaproponujesz kod, wskaż pliki i sekcje do zmiany; po zmianach podaj krótką listę testów w DevTools.


