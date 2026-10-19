# ECHO — karta projektu

**Projekt semestralny: Responsive Web Design**  
**Autorka:** Julia Gonkiewicz  
**Nazwa serwisu:** ECHO  
**Forma realizacji:** indywidualna  
**Profil podmiotu:** komercyjny (fikcyjna marka koncepcyjna)  
**Repozytorium:** https://github.com/pyrogekuwu/ECHO  
**Projekt interfejsu:** https://www.figma.com/design/ZNbElkiCFw3ZDcek7ghxgi/echo?node-id=12-28  

## 1. Koncepcja i profil działalności

ECHO jest fikcyjną marką elektroniki użytkowej inspirowaną współczesnym wzornictwem produktów audio, osadzoną w kontekście południowokoreańskiego rynku technologicznego. Serwis prezentuje kolekcje słuchawek nausznych, słuchawek bezprzewodowych, głośników przenośnych i akcesoriów, eksponując ich formę, materiały oraz charakter wizualny. Strona łączy funkcję wizerunkową z katalogiem produktów i stanowi podstawę do rozbudowy o blog oraz moduł sprzedażowy.

**Grupa docelowa.** Osoby zainteresowane elektroniką audio, wzornictwem przemysłowym i modą, w szczególności młodzi dorośli orientacyjnie w wieku 18–35 lat. Projekt zakłada zarówno szybkie przeglądanie oferty na smartfonie, jak i bardziej szczegółowe poznawanie kolekcji na tablecie i komputerze. Wiek i urządzenia są założeniami projektowymi, a nie wynikami badań użytkowników.

**Główny cel konwersji.** W docelowej wersji serwisu: przejście na kartę produktu i zakup. W obecnym etapie: zapoznanie się z kategoriami, przejście do wyróżnionych produktów oraz wysłanie zapytania przez formularz kontaktowy (obecnie demonstracyjny, bez backendu).

## 2. Wytyczne identyfikacji wizualnej — Style Guide

### 2.1. Kolorystyka

| Funkcja | Kolor | HEX |
|---|---|---|
| Primary — ciemne tło, nawigacja, sekcja marki | Głęboka czerń | `#050506` |
| Secondary — tło katalogu i kolekcji | Jasny lawendowy | `#EEF0FF` |
| Accent / CTA — jasne przyciski na ciemnym tle | Lodowa biel | `#EFF2FF` |
| Text — tekst na jasnych tłach | Grafitowa czerń | `#101114` |
| Text inverse — tekst na ciemnych tłach | Chłodna biel | `#F8F9FF` |
| Supporting — detal techniczny i ornamenty | Srebrnoszary | `#C0C3CD` |

Paleta bazuje na czerni i chłodnych odcieniach bieli. Jasnolawendowe tła i rozmyte fioletowe formy stanowią uzupełnienie fotografii produktowej, a nie dominujący kolor interfejsu. Dla wskazanych par tekst–tło kontrast wynosi orientacyjnie: `#F8F9FF` na `#050506` — **19,39:1**, `#101114` na `#EEF0FF` — **16,67:1**, `#06070B` na `#EFF2FF` — **18,04:1**. Spełniają wymaganie WCAG AA dla zwykłego tekstu; pozostałe warianty, stany interakcji i tekst na zdjęciach wymagają osobnego sprawdzenia.

### 2.2. Typografia

| Funkcja | Krój pisma | Zastosowanie |
|---|---|---|
| Tekst podstawowy i większość nagłówków | **Inter** | Opisy produktów, menu, formularze, tytuły sekcji technicznych |
| Nagłówki redakcyjne | **Cormorant Garamond** | „shop by categories”, „shop by collections”, „our bestsellers” |
| Nagłówek produktu w Hero | **DotGothic16** | „LUMIA PRO 2” — cyfrowy charakter typografii |
| Logotyp | **Genos** | Znak słowny ECHO w nawigacji i stopce |
| Drobne etykiety techniczne | **IBM Plex Mono** | Metadane, numery, opisy o charakterze technicznym |

### 2.3. Zasady kompozycji

Estetyka ECHO opiera się na dużych fotografiach produktowych, prostokątnych przyciskach i płaskich kartach bez nadmiernego zaokrąglania. Kontrast czarnych sekcji z jasnym katalogiem, asymetryczny układ materiałów redakcyjnych oraz chromowane detale budują futurystyczny, minimalistyczny charakter. Nawigacja pozostaje oszczędna; na mniejszych ekranach przechodzi w menu zwijane. Inspiracje nowoczesnymi sklepami technologicznymi służą do opracowania własnego języka wizualnego marki.

## 3. Architektura informacji i zakres strony głównej

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

## 4. Technologia i zasady wdrożenia

**Środowisko:** Astro (szablony `.astro` generujące semantyczny HTML5), CSS3, Bootstrap 5 udostępniany przez CDN, niewielkie skrypty JavaScript i GitHub Codespaces. Główny widok znajduje się w `src/pages/index.astro`, niestandardowe style w `public/style.css`, grafiki w `public/images/`.

**Elementy już obecne w wersji roboczej:** znaczniki `header`, `nav`, `main`, `section` i `footer`, jeden nagłówek `h1`, teksty alternatywne dla merytorycznych obrazów, etykiety pól formularza, `meta viewport`, `title`, `description`, Open Graph oraz JSON-LD typu `Organization`. Zastosowano siatkę i komponenty Bootstrapa z własnymi nadpisaniami CSS, w tym menu mobilne oraz formularz.

**Wymogi do utrzymania podczas kolejnych etapów:** układ mobile-first, testy przy szerokościach 360–390, 768 i co najmniej 1200 px, brak niekontrolowanego poziomego przewijania, elastyczne obrazy i typografia, cele dotykowe minimum 44 × 44 px, logiczna hierarchia nagłówków i widoczny fokus klawiatury. Dokumentacja projektu wymaga także walidacji danych strukturalnych oraz audytu Lighthouse. Obecny arkusz zawiera również reguły `@media (max-width: …)`, dlatego przejście na konsekwentnie mobile-first pozostaje zadaniem porządkującym, a nie zakończonym wdrożeniem.

## 5. Plan rozbudowy serwisu

| Etap | Planowany moduł | Zakres |
|---|---|---|
| 1 — wizytówka | Strona główna | Prezentacja oferty, tożsamości marki i kontaktu; aktualny etap projektu |
| 2 — informacyjny | Blog / artykuły | Poradniki i treści redakcyjne dotyczące sprzętu audio oraz projektowania produktów |
| 3 — sprzedażowy | Sklep internetowy | Podstrony produktów, filtrowanie katalogu, koszyk i proces zamówienia w zakresie wymagań prowadzącego |
| 4 — architektura | Brakujące podstrony | Np. szczegóły produktu, informacje o marce, kontakt i inne wymagane widoki |
| 5 — optymalizacja | Audyt i poprawki | Lighthouse, WCAG, SEO, testy responsywności i poprawność linków |

Projekt prowadzony jest przyrostowo w jednym repozytorium. Kolejne etapy powinny być dokumentowane commitami na GitHubie, zgodnie z zasadami przedmiotu.

## 6. Wzorcowy System Prompt do kolejnych ćwiczeń

> Jesteś front-end developerem pracującym nad studenckim projektem ECHO — responsywnym serwisem fikcyjnej marki elektroniki audio. Rozwijaj istniejący projekt w Astro, wykorzystując semantyczny HTML5, czysty CSS3 i Bootstrap 5 z CDN do siatki i niezbędnych komponentów. Nie zmieniaj samowolnie przyjętej architektury, nazewnictwa klas ani identyfikacji wizualnej. Pracuj przyrostowo: zachowuj działające sekcje i modyfikuj tylko zakres wymagany w bieżącym zadaniu.
>
> Zachowaj kolory: #050506 (ciemne tło), #EEF0FF (jasne tło katalogu), #EFF2FF (jasny CTA), #101114 (tekst na jasnym tle) i #F8F9FF (tekst na ciemnym tle). Typografia: Inter — treść; Cormorant Garamond — nagłówki redakcyjne; DotGothic16 — ekspozycja produktu Lumia Pro 2; Genos — logotyp; IBM Plex Mono — etykiety techniczne. Estetyka: editorial tech, prostokątne przyciski, regularny grid produktów, asymetryczne fotografie kolekcji, umiarkowane efekty i brak przypadkowych ozdobników.
>
> Każdy widok ma spełniać wymagania RWD: mobile-first, czytelność w szerokościach 360–390, 768 i 1200+ px, brak przewijania poziomego, dostępne menu mobilne, co najmniej 44 × 44 px dla celów dotykowych, jeden h1, logiczna hierarchia h2–h3, poprawne alt, label/for/id i czytelny fokus. Każda podstrona musi mieć własne title, description, Open Graph i adekwatny JSON-LD Schema.org.
>
> Style własne zapisuj w zewnętrznym pliku public/style.css, a obrazy odwołuj do public/images/. Nie zastępuj dostarczonych grafik generowanymi zamiennikami. Nie dodawaj nieuzgodnionych frameworków. Nie pozoruj działających zakupów, płatności, logowania lub wysyłania wiadomości: funkcje demonstracyjne oznaczaj wyraźnie. Zanim zaproponujesz kod, wskaż pliki i sekcje do zmiany; po zmianach podaj krótką listę testów w DevTools.

## 7. Kontrola jakości i materiały do oddania

Karta obejmuje wymaganą metrykę, koncepcję, grupę docelową, Style Guide i powtarzalny prompt. Osobnym wymogiem ćwiczenia jest **tabela testu generatorów AI**; nie wpisano ocen Lovable, v0 ani generatora czatowego, ponieważ nie przekazano wyników audytu.

Przed oddaniem projektu końcowego trzeba zweryfikować kontrast wszystkich stanów interaktywnych, działanie formularza, kompletność podstron i linków, wyniki Lighthouse oraz responsywność. Obecny formularz, wyszukiwarka i funkcje zakupowe mają charakter demonstracyjny; nie należy deklarować ich jako pełnego systemu e-commerce.

**Uwaga organizacyjna:** instrukcja przewiduje pracę zespołową; indywidualną realizację ECHO należy potwierdzić u prowadzącego.
