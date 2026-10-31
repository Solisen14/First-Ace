# The First Ace

A one-page, self-contained interactive probability investigation.

## What students do

1. Make a prediction, either saving it anonymously to the community poll or continuing without saving.
2. The page reveals an explanation of **experimental probability** and scrolls to it automatically. The heading is **Let's test what you think** for a chosen probability and **Let's try to figure it out** for **Not sure yet**.
3. Select **Run the Experiment** to watch one shuffled deck reveal cards until the first ace and the following card.
4. Answer a Yes/No reflection question chosen from the *actual result* (2♣ before the first ace, A♠ first, a target card next, or 2♣ still face down). The page explains the answer.
5. Select **Run 10 Shuffles**. Ten new decks reveal their cards sequentially, with an accessible progress indicator and updated counts after each shuffle. The larger evidence section remains hidden until all ten have finished, then comes into view. Its totals include the first deck (11 trials).
6. In **What do the shuffles say?**, a prominent **Run 100 Shuffles** action appears **both above and below** the evidence panel, so students do not have to scroll back up to continue. Either button runs the same 100 additional decks, bringing the standard total to 111. Controls disable during a simulation and are replaced after each milestone to avoid repeating the same stage.
7. After the 100-shuffle stage, the two locations both offer **Run 1,000 Shuffles** instead. When those trials complete, the simulation controls are replaced by **Explore the data analysis ↓** navigation. A new scroll-driven data story appears *after* the results and statistics. The **Run 100,000 Shuffles** control stays at the end of that story so students can reflect before testing a much larger sample.
8. Walk through three data-driven prompts, each based on a frozen snapshot from the 1,000-shuffle milestone: **which ace was first most often** (a different prompt if the leading ace exceeds 30%), **the average number of cards before the first ace** (alongside the observed shortest and longest waits), and **how often the 2♣ appeared before every ace**. Visitors can choose an interpretation and receive constructive feedback. Scrolling updates a sticky data highlight on larger screens and a non-sticky highlight on narrow screens. The active panel is chosen from all story panels using a fixed viewport reference and a 64-pixel hysteresis buffer, preventing rapid back-and-forth switching near boundaries. The story remains usable without animation.
9. After the 1,000-shuffle stage completes, an accessible callout appears in the evidence section: **Scroll down to explore the data analysis**, with an **Explore the data analysis ↓** control that scrolls directly to the story.
10. At the bottom of the story, choose **Run 100,000 Shuffles**. A second copy of the same results panel appears *immediately below the story*, and the page scrolls to it. All 100,000 decks are actually simulated. The progress count, target bars, first-ace distribution, average wait, and other statistics update smoothly in 50 visible batches, without animating individual card flips. This second panel mirrors the original evidence, rather than calculating separate data. The story's numbers remain those from the earlier milestone for consistent discussion.
11. **Only after the 100,000-deck batch finishes**, show a prominent, full-width **See the Mathematical Explanation** callout beneath the live evidence panel. The entire explanation and its theoretical reference values stay **hidden until students select that button**. This is an intentional second reveal rather than automatically exposing the answer when the simulation ends.
12. The explanation begins with a student-friendly definition of *theoretical probability*, compares the **actual** Ace of Spades and Two of Clubs counts and percentages from the current experiment, and reports their difference in percentage points. It then uses a worked **random insertion gap** argument with a visual example: remove either target card, shuffle the remaining 51, and insert the target into one of 52 equally likely gaps. Only the gap immediately after the first remaining ace works, so both cards have exact probability 1/52. For the Ace of Spades, inserting it before the remaining aces would make it the first ace, not the next card. Mathematical reference markers and other theoretical comparisons unlock together when the button is selected. Resetting hides the explanation and callout again.

The observed percentages and counts are always based on actual shuffled decks, including during the accelerated 100,000-deck display. Before that final stage, the page deliberately withholds the theoretical comparisons so students can interpret experimental results first.

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