# The First Ace

A one-page, self-contained interactive probability investigation.

## What students do

1. Make a prediction, either saving it anonymously to the community poll or continuing without saving.
2. The page reveals an explanation of **experimental probability** and scrolls to it automatically. The heading is **Let's test what you think** for a chosen probability and **Let's try to figure it out** for **Not sure yet**.
3. Select **Run the Experiment** to watch one shuffled deck reveal cards until the first ace and the following card.
4. Answer a Yes/No reflection question chosen from the *actual result* (2♣ before the first ace, A♠ first, a target card next, or 2♣ still face down). The page explains the answer.
5. Select **Run 10 Shuffles**. Ten new decks reveal their cards sequentially, with an accessible progress indicator and updated counts after each shuffle. The larger evidence section remains hidden until all ten have finished, then comes into view. Its totals include the first deck (11 trials).
6. Unlock larger 1,000- and 100,000-deck simulations and compare experimental outcomes with the theoretical probability of 1/52 for each target card. The chart shows a 0–20% scale for smaller samples (under 100 decks) and a 0–4% scale for larger samples, with caps marked in the explanatory text.
7. Explore why the Two of Clubs being earlier (20%) and the Ace of Spades being the first ace (25%) do not change that equality, then read the short insertion-gap proof.

## Running locally

Open `index.html` in a web browser to use the deck simulation offline. The shared prediction feature requires an internet connection and a working Google Apps Script deployment.

## Publishing with GitHub Pages

1. This repository already contains the standalone `index.html` at its root.
2. In this repository's **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save.
3. Once GitHub Pages publishes it, visit https://solisen14.github.io/First-Ace/.

This project is independent of Collatz Laboratory. Do not modify or deploy to the Collatz Laboratory repository.

## Shared prediction pilot

The prediction interface is connected to a private Google Sheet through the deployed Apps Script endpoint. Visitor totals are shown only after a prediction has been recorded. For teachers using shared devices, an "Another participant on this device" link allows the next student to participate, but it does not authenticate one vote per student.

## Mathematical note

For a specified target card (A♠ or 2♣), remove it from the deck and shuffle the remaining 51 cards uniformly. The removed card can be inserted into any of the 52 gaps with equal probability. Exactly one gap, the gap immediately after the first ace in the 51-card deck, makes the target card immediately follow the first ace in the final 52-card deck. Therefore each target has probability 1/52.

The Two of Clubs comes before all four aces with probability 1/5, and A♠ is itself the first ace with probability 1/4.

## Accessibility and privacy

Responsive desktop/mobile layout, accessible radio buttons, keyboard focus, a text readout alongside the visual deck, and reduced-motion support. Card simulation runs entirely in the browser. If a visitor chooses to save a prediction, the page sends their selected answer and a random submission token to an Apps Script web app, which writes them with a timestamp to a private Google Sheet. The browser may store that prediction and token locally to prevent accidental repeat submissions. No names, emails, or school identifiers are requested by the application; the Google platform may have its own service logs. The poll is a pilot, not an authenticated or tamper-proof survey. See [backend setup](backend/SETUP.md).