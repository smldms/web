---
title: Minimal Indicator
categories:
  - runtime-art
description: A Generative and Dynamic Artwork
coverImage: /images/uploads/téléchargement-3-.jpg
featured: false
date: 2025-03-04T20:58:00.000Z
p5jsCode: >-
  const rand = Math.random();

          let cnv;
          let bg, main, maxI;

          ////////////////INFO & FEATURES
          let title = "Minimal Indicator";
          function clr(rand) {
              if (rand > 0.5) {
                  bg = 0;
                  main = 255
                  return ("Black")
              } else {
                  bg = 255;
                  main = 0
                  return ("White")
              }
          }

          function layers(rand) {
              if (rand < 0.33) {
                  return ('1');
              }
              else if (rand < 0.66) {
                  return ('2');
              } else {
                  return ('3')
              }
          }

          function rot(rand) {
              if (rand < 0.1) {
                  return (-1)
              }
              else if (rand < 0.2) {
                  return (1)
              }
              else if (rand < 0.3) {
                  return (-1.5)
              }
              else if (rand < 0.4) {
                  return (1.5)
              }
              else if (rand < 0.5) {
                  return (-0.75)
              }
              else if (rand < 0.6) {
                  return (0.75)
              }
              else if (rand < 0.7) {
                  return (-0.5)
              }
              else if (rand < 0.8) {
                  return (0.5)
              }
              else if (rand < 0.9) {
                  return (-0.25)
              } else {
                  return (0.25)
              }
          }

          let ratio = 1.414142
          let format = {
              n: Math.random(),
              ww: 1,
              hh: 1,
              name: ''
          }

          if (format.n < 0.33) {
              format.ww = ratio
              format.hh = 1
              format.name = "Landscape"

          } else if (format.n < 0.66) {
              format.ww = 1
              format.hh = ratio
              format.name = "Portrait"

          } else {
              format.ww = 1
              format.hh = 1
              format.name = "Square"
          }

          let cSize = chooseRandom([2.5, 5, 7.5, 10]);


          ////////////////////////////////////////
          let globalSize = 1920 * 2;
          let gen;

          let xoff = 0.5;
          let yoff = 0.5;
          let down;
          let pX, pY

          let globalData;
          let url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true';
          let priceClr;

          function setup() {
              randomSeed(seed);
              noiseSeed(seed);
              cnv = createCanvas(globalSize * format.ww, globalSize * format.hh);
              cnv.parent('fullScreen');
              background(bg);
              setInterval(askData, 1000);
              angleMode(DEGREES)
              rectMode(CENTER)
          }

          function draw() {
              progress('--- PLEASE WAIT ---<br/><br/>LOADING DATA')
              if (globalData) {
              noLoop()
              progressClear()
              btcChange = globalData.bitcoin.usd_24h_change;

              gridPoint(10000)
              pX = mathRandBetween(width * 0.1, width * 0.9)
              pY = mathRandBetween(height * 0.1, height * 0.9)

              if (btcChange < 0) {
                  priceClr = color(250, 4, 4)
              }
              else {
                  priceClr = color(4, 250, 4)
              }
              push()
              theSquare(pX, pY, globalSize / 16.18)
              for (let i = 0; i < layers(rand); i++) {
                  theShape(width / 2, height / 2, 0, 0, globalSize / mathRandBetween(10,15), mathRandBetween(-360,360), pX, pY)
              }
              pop()
              push()
              blendMode(DIFFERENCE)
              rect(width / 2, height / 2, width / mathRandBetween(1.618, 3.14), height / mathRandBetween(1.618, 3.14))
              pop()

              theSquare(pX, pY, globalSize / 31.414)

              grainy(23)

              }
              else {
                  progressShow()
              }
          }

          function theShape(x, y, anchorX, anchorY, maxtheShape, s, x1, y1) {
              push()
              down = maxtheShape / (globalSize / 15)
              for (let j = 0; j < 5; j++) {
                  for (let i = 0; i < maxtheShape; i++) {
                      noFill()
                      stroke(map(i, 0, maxtheShape, main, bg))
                      strokeWeight(map(i, 0, maxtheShape, 4, 0))
                      let noisetheShape = map(noise(xoff * 0.25, yoff * 0.25), 0, 1, s * 1.25, s)
                      let factor = map(noise(xoff, yoff), 0, 1, -globalSize / 3, globalSize / 3)
                      push()
                      translate(x, y)
                      print(x1, y1)
                      let distance = dist(anchorX + j + factor, anchorY + j + factor + noisetheShape, 0, 0)
                      if (distance < globalSize * 0.75) {
                          beginShape();
                          vertex(anchorX + j + factor, anchorY + j - factor + noisetheShape);
                          if (Math.random() < 0.05) {
                              vertex(x1 - x, y1 - y)
                          }
                          vertex(anchorX - j + factor, anchorY - j + factor - noisetheShape);
                          endShape(CLOSE);
                      }
                      pop()
                      xoff += 0.0025;
                      yoff += 0.005;
                      s -= down;
                  }
              }
              pop()
          }

          function askData() {
              loadJSON(url, gotData);
          }

          function gotData(data) {
              globalData = data;
              setTimeout(askData, 120000);
          }

          function gridPoint(nbrPoint) {
              for (let pt = 0; pt < nbrPoint; pt++) {
                  push()
                  strokeWeight(Math.random() * 1.5)
                  stroke(main)
                  point(Math.random() * width, Math.random() * height)
                  pop()
              }

              let scl = mathRandBetween(10, 25);
              for (let x = width * 0.15; x < width * 0.85; x += scl) {
                  for (let y = height * 0.1; y < height * 0.9; y += scl) {
                      push()
                      noStroke()
                      fill(main, mathRandBetween(2, 150))
                      ellipse(x, y, Math.random() * cSize)
                      pop()
                      stroke(main, mathRandBetween(0, 5))
                      if (Math.random() < 0.25) {
                          line(x, y, x, height * 0.9)
                      }
                      else if (Math.random() < 0.5) {
                          line(x, y, width * 0.15, y)
                      }
                      else {
                          // line(x, y, x, height * 0.1)
                      }
                  }
              }
          }

          function theSquare(posX, posY, s) {
              push()
              noStroke()
              fill(priceClr)
              rect(posX, posY, s)
              pop()
          }

          function grainy(force) {
              loadPixels();
              let d = pixelDensity();
              let halfImage = 4 * (width * d) * (height * d);
              for (let i = 0; i < halfImage; i += 4) {
                  grainAmount = random(-force, force);
                  pixels[i] = pixels[i] + grainAmount;
                  pixels[i + 1] = pixels[i + 1] + grainAmount;
                  pixels[i + 2] = pixels[i + 2] + grainAmount;
                  pixels[i + 3] = pixels[i + 3] + grainAmount
              }
              updatePixels();
          }

          function chooseRandom(arr) {
              const randomIndex = Math.floor(Math.random() * arr.length);
              return arr[randomIndex];
          }


          function keyTyped() {
              if (keyCode === 83) { // if "s" is pressed
                  save(title + '.png');
              }
          }

          function mathRandBetween(a, b) {
              if (!b) {
                  return Math.random() * a
              }
              return Math.random() * (b - a) + a
          }
---
*"Minimal Indicator"* is a generative and dynamic artwork created from the **change of Bitcoin in 24 hours**.  

### **A Minimalist and Abstract Vision of Market Movements**  
The composition of *Minimal Indicator* is **deliberately minimalist and abstract**, designed to convey the **complexity of the cryptocurrency market** in a **visually intuitive** way.  

Your composition will **remain frozen in time**. The only **variable indication** depends on the **24-hour Bitcoin exchange rate**:  
- **Red:** If the price is falling  
- **Green:** If the price is rising  

More than just an aesthetic piece, *Minimal Indicator* allows you to **keep an eye on the Bitcoin market** in a subtle, artistic manner.  
