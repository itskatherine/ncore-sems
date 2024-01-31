This repo has some stuff that is worth a refactor and the tasks demonstrate anti-patterns that we see during fe project week.

## 0. UI demo

- start by showing them the UI and then give a brief overview of the code.

- `Header` and `Home` are not of interest to us so you can glance at them and then close them.

## 1. Refactor PlanetList and PlanetListByType:

**Objective**: Combine similar components.

- compare what these do in the browser and look at the code. There are 3 differences:

  - `PlanetList` renders all planets and a link to the type (rock or gas) on each item.
  - `PlanetListByType` filters by `type` using the URL param and does't have the link.
  - they use different api functions.

- apart from these differences, the components are identical.

- get them to highlight what we will need to do to make them into one component ie:

  - refactor the 2 api functions into one.
  - make the rendering of the link conditional on there being a `type` in the URL.
  - make the list conditional on the type (else show all).
  - update `app.jsx`

- refactor this into a single component and delete the unused file.

- once done you may wish to extract the PlanetCard into it's own component to tidy up the code. (Or at least talk about the possibility.)

## 2. Making reusable error and loading components

**Objective**: Reduce repetition in UI elements using error and loading as examples.

- highlight the repeated need to handle error and loading logic.
- there is some styled error and loading UI in PlanetDetail - ask how we could avoid rewriting this logic throughout the app.
- extract each of these into their own components and reuse them elsewhere in the app.
- discuss what other sorts of UI might fit this pattern and be reused (not necessarily in this repo but in a general sense) eg, buttons, inputs, modals, progress bars etc

## 3. Derivable State in PlanetDetail

**Objective**: Simplify state management.

- take a look at `PlanetDetail` and ask if there is anything interesting about the state.
- it looks quite logical, we have some state to check if there is an error (with a Boolean value) and another state to store the error if there is one.
- since we're already using an error state to store error messages, we can derive the error status from whether error is null or not.
- refactor this to reduce the amount of state.
