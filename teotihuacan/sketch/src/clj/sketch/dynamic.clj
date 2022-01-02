(ns sketch.dynamic
  (:require [quil.core :refer :all]))

(defn square [x y side-length]
  (rect x y side-length side-length))
(defn width-perc [perc] (* (width) perc))
(defn height-perc [perc] (* (height) perc))

(defn square-grid [tx ty w h cd md]
  (let [n (int (random 1 4))
        n-rows n
        n-cols n
        row-height (/ h n-rows)
        col-width (/ w n-cols)]
    (doseq [y (range n-rows)]
      (doseq [x (range n-cols)]
        (cond
           (and (< (noise x y) 0.9) (< cd md))
           (square-grid (+ tx (* x col-width))
                        (+ ty (* y row-height))
                        col-width
                        col-width
                        (inc cd) md)
           (> cd 2)
           (let [c (if (< (random 1) 0.4)
                     (color 100 0 75)
                     (color 100 0 0))]
             (fill c)
             (stroke c)
             (square (+ tx (* x col-width))
                     (+ ty (* y row-height))
                     col-width))
           :else       
           (square-grid (+ tx (* x col-width))
                        (+ ty (* y row-height))
                        col-width
                        col-width
                        (inc cd) md))))))

(defn setup [])
(defn draw []
  (frame-rate 1)
  (color-mode :hsb 360 100 100 1.0)
  (background 100 0 100)
  (stroke 100 0 0)
  (no-stroke)
  (no-fill)
  (square-grid 0 0 (width) (height) 0 (int (random 5 8))))
