## Getting Started

First, clone or dowload this project:

```bash
git colne https://github.com/MDShakibul/online-products.git
```
or click download the button

then stat this commad for install all Package

```bash
npm install
```

last, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live site Link

[https://classibuy.netlify.app/](https://classibuy.netlify.app/)

## Architecture

### Technology
- **Framework:** Next.js (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS (DaisyUI)
- **State Management:** Redux Toolkit
- **Persistence:** localStorage

### Pages & Data‑Flow
- **Homepage(/)**
    1. Show product list.
    2. Each card expose an Add To Cart that dispatch to the Redux store.
    3. Image use <Image> for optimized delivery.
- **Product Details (/product/[id]):**
    1. Dynamic route uses server data fetching (Next.js generateStaticParams + fetch with revalidate)
    2. Show all details about a product and add a button Add To Cart.
- **Cart (/cart):**
    1. Client Component reading from Redux store, showing line items, quantity editor, remove button, and computed totals.
    2. Checkout simulation triggers a toast & store reset.
- **Success (/success):**
    2. After checkout simulation show the demo of success page.

### Theming (Dark/Light)
- ThemeProvider manages current theme in a client context and value persisted in localStorage
- ThemeToggle switches theme and toggles Tailwind classes


## Time Spent

> **Note:** These times are approximate and may be a little more or less than stated.

| Task                                   | Approx. Time |
| -------------------------------------- |  ----------- |
| Project setup and Tailwind class definitions | 20 min |
| Homepage (product list, search, filter, navigation, footer) | 2 hours |
| Product details page | 30 min |
| Cart page and calculation logic | 1 hour |
| Light and dark mode implementation | 1.5 hours |
| Responsive design checks | 30 min |
| Testing and debugging | 1 hour |
| README documentation writing | 1 hour |

