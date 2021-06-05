---
layout: post
title:  "Catenary Plotter"
date:   2021-06-05
dependencies:
    - p5
---

A Chain simulation.
This program calculates parameters for a catenary of the form ![equation](https://latex.codecogs.com/gif.latex?y%20%3D%20a%5Ccosh%28%5Cfrac%7Bx-x_%7B0%7D%7D%7Ba%7D%29%20&plus;%20y_%7B0%7D). Given 2 points the curve passes through and the arc length between the 2 points.

The system of equations necessary to solve for these parameters is transcendental and as a result computing the parameters numerically is the easiest option.

<br><br>

<div id="sketch-holder">
    <script type="text/javascript" src="ball.js"></script>
    <script type="text/javascript" src="draggable.js"></script>
    <script type="text/javascript" src="sketch.js"></script>
</div>

