---
title: BetVictor Calculator
date: 2016-12-30
collection: portfolio
excerpt: A Vue.JS powered, SEO first, PWA bet calculator.
thumbnail: betvictor.jpg
video: false
---

BetVictor's task: an accurate, SEO friendly, customer retaining bet calculator.

The calculator's UI was written in Vue.JS, with the whole application prerendered to static files to keep SEO value high.

Having never gambled in my life, calculating the bets was a very interesting challenge, but with the help of the traders at BetVictor we were able to create a standalone betting engine, codenamed Arthur (after "One for Arthur", the winning horse on the Grand National in 2017).

Arthur was kept as a separate concern to the Vue.JS UI portion, accepting "slips" of betting information, used to calculate the different types of bets.

To fully cover the search listings, we went one step further and not only included the bets BetVictor offer to customers, but legacy and unusual types of bets also.

To maximise customer retention, the application was built as a PWA, compatible with Chrome - BetVictor being the first and only company to do so.

Saving bets is possible via Local Storage and bet slips can also be shared - again, to maximise client reach.

<a class="pure-button" href="https://www.betvictor.com/bet-calculator/" target="_blank">
    <i class="fa fa-globe fa-lg"></i>
    Live Site
</a>