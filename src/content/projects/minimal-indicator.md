---
title: Minimal Indicator
categories:
  - runtime-art
description: A Generative and Dynamic Artwork
coverImage: /images/uploads/téléchargement-3-.jpg
featured: false
date: 2025-03-04T20:58:00.000Z
p5jsCode: >-
  function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    background(200);

    // Create p5.Color objects to interpolate between.
    let from = color(218, 165, 32);
    let to = color(72, 61, 139);

    // Create intermediate colors.
    let interA = lerpColor(from, to, 0.33);
    let interB = lerpColor(from, to, 0.66);

    // Draw the left rectangle.
    noStroke();
    fill(from);
    rect(10, 20, 20, 60);

    // Draw the left-center rectangle.
    fill(interA);
    rect(30, 20, 20, 60);

    // Draw the right-center rectangle.
    fill(interB);
    rect(50, 20, 20, 60);

    // Draw the right rectangle.
    fill(to);
    rect(70, 20, 20, 60);

    describe(
      'Four rectangles. From left to right, the rectangles are tan, brown, brownish purple, and purple.'
    );
  }
---
*"Minimal Indicator"* is a generative and dynamic artwork created from the **change of Bitcoin in 24 hours**.  

### **A Minimalist and Abstract Vision of Market Movements**  
The composition of *Minimal Indicator* is **deliberately minimalist and abstract**, designed to convey the **complexity of the cryptocurrency market** in a **visually intuitive** way.  

Your composition will **remain frozen in time**. The only **variable indication** depends on the **24-hour Bitcoin exchange rate**:  
- **Red:** If the price is falling  
- **Green:** If the price is rising  

More than just an aesthetic piece, *Minimal Indicator* allows you to **keep an eye on the Bitcoin market** in a subtle, artistic manner.  
