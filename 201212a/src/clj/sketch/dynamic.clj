(ns sketch.dynamic
  (:require [quil.core :refer :all])
  (:use [incanter.core :only [$=]])
  (:use [clojure.math.combinatorics :only [combinations cartesian-product]])
  (:use [clojure.pprint])
  (:use [clojure.set :only [union]])
  (:use [clojure.contrib.map-utils :only [deep-merge-with]])
  (:import [org.apache.commons.math3.distribution ParetoDistribution])
  (:import [processing.core PShape PGraphics]))




  (defn setup [])
  (defn draw []
    (no-loop)
    (color-mode :hsb 360 100 100 1.0)
    (def h 45)
    (def s 90)
    (def b 60)
    (background h s b)
    (fill h s b)
    (stroke h s (* b 0.2))
    (def xpos 0)
    (def ypos (* (height) 0.2))
    (def noise-scale 1)
    (while (< xpos (width))
      (def weight (map-range (noise xpos noise-scale) 0 1 1 10))
      (do (stroke-weight weight)
        (def new-xpos (+ 1 xpos))
        (line xpos ypos new-xpos ypos)
        (def xpos new-xpos)))

    (fill h s b)
    (stroke h s (- b 2))
    (doseq [i (range 80000)]
      (def angle 0)

      (begin-shape)
      (def center-x (random (width)))
      (def center-y (random (height)))
      (def radius-start (random 0.005))
      (def radius-end (+ radius-start (random 0.001)))
      (while (< angle (* 2 PI)) (do
        ; (def stroke-weight-map (map-range  0 1 60 0))
        (stroke-weight (noise angle center-x center-y))
        (def stroke-map (map-range (noise angle center-x center-y) 0 1 60 0))
        (stroke h s stroke-map)
        (def radius (random (* (width) radius-start) (* (width) radius-end)))
        (def vertex-x (+ center-x (* radius (cos angle))))
        (def vertex-y (+ center-y  (* radius (sin angle))))
        (when (< (noise vertex-x vertex-y) 0.3) (vertex vertex-x vertex-y))
        (def angle-inc (random 5 50))
        (def angle (+ angle (random (/ PI angle-inc))))))
      (end-shape))

      ; (stroke 30 10 59)



    (save "sketch.tif"))
