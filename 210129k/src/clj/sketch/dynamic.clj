(ns sketch.dynamic
  (:require [quil.core :refer :all])
  (:use [incanter.core :only [$=]])
  (:use [clojure.math.combinatorics :only [combinations cartesian-product]])
  (:use [clojure.pprint])
  (:use [clojure.set :only [union]])
  (:use [clojure.contrib.map-utils :only [deep-merge-with]])
  (:import [org.apache.commons.math3.distribution ParetoDistribution])
  (:import [processing.core PShape PGraphics]))

(def TAU (* 2 PI))

(defn halve [number]
  (/ number 2))

(defn square
  ([x y side-length] (rect x y side-length side-length))
  ([x y side-length round] (rect x y side-length side-length round)))

(defn circle [x y d]
  (ellipse x y d d))

(defn right-triangle [corners]
  (let [shuffled (shuffle corners)]
    (triangle (first (nth shuffled 0))
              (last (nth shuffled 0)) (first (nth shuffled 1))
              (last (nth shuffled 1)) (first (nth shuffled 2))
              (last (nth shuffled 2)))))

(defn generate-wave [symb val trig s rad-mult]
  (->> (noise s)
       (* rad-mult)
       radians
       *
       trig
       (symb val)))

(defn width-perc [perc] (* (width) perc))
(defn height-perc [perc] (* (height) perc))

(defn setup [])
(defn draw []
  (no-loop)
  (color-mode :hsb 360 100 100 1.0)
  (background 195 53 79)
  (no-stroke)

  ; Brown rectangle
  (push-matrix)
  (fill 25 30 50)
  (translate 0 (height-perc 0.5))
  (rect 0 0 (width) (height-perc 0.5))
  (pop-matrix)

  ; Red circle
  (push-matrix)
  (fill 0 90 70)
  (translate (width-perc 0.5) (height-perc 0.5))
  (circle 0 0 (width-perc 0.3))
  (pop-matrix)

  ; White rectangle
  (push-matrix)
  (fill 0 0 100)
  (translate (width-perc 0.2) (height-perc 0.3))
  (rect 0 0 (width-perc 0.3) (height-perc 0.4) (width-perc 0.01))
  (pop-matrix)

  ; Copy pixels
  (let [noise-scale 0.03
        t (atom 0)
        t-inc 0.01
        n-cols 50
        col-width (/ (width) n-cols)
        n-rows 5
        row-width (/ (height) n-rows)]

    (doseq [y (range n-rows)]
      (doseq [x (range n-cols)]
        (let [sx (* x col-width)
              sy (* y row-width)
              dx (+ sx (generate-wave pow 500 cos sx 30))
              dy (+ sy (generate-wave * 70 sin sy 50))]

          (copy [sx sy col-width row-width] [dx dy col-width row-width])
          (swap! t (fn [n] (+ n t-inc)))))))

  ; Save sketch
  (save "sketch.png"))
