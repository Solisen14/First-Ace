# The First Ace

A one-page, self-contained interactive probability investigation.

## What students do

1. Predict whether the Ace of Spades or Two of Clubs is more likely immediately after the first ace.
2. Flip one simulated deck, or run 1,000 / 100,000 new shuffled decks.
3. Compare empirical outcomes with the theoretical 1/52 probability for each target card.
4. Explore why the Two of Clubs being earlier (20%) and the Ace of Spades being the first ace (25%) do not change that equality.
5. Read a short insertion-gap proof.

## Running locally

Open `index.html` in a web browser. No build tools, account, external libraries, internet connection, or server are required.

## Publishing with GitHub Pages

1. This repository already contains the standalone `index.html` at its root.
2. In this repository's **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save.
3. Once GitHub Pages publishes it, visit https://solisen14.github.io/First-Ace/.

This project is independent of Collatz Laboratory. Do not modify or deploy to the Collatz Laboratory repository.

## Mathematical note

For a specified target card (A♠ or 2♣), remove it from the deck and shuffle the remaining 51 cards uniformly. The removed card can be inserted into any of the 52 gaps with equal probability. Exactly one gap, the gap immediately after the first ace in the 51-card deck, makes the target card immediately follow the first ace in the final 52-card deck. Therefore each target has probability 1/52.

The Two of Clubs comes before all four aces with probability 1/5, and A♠ is itself the first ace with probability 1/4.

## Accessibility and privacy

Responsive desktop/mobile layout, real buttons with keyboard focus, a text readout alongside the visual card deck, and reduced-motion support. All simulation runs in the browser. No network calls, analytics, storage, or student data collection.