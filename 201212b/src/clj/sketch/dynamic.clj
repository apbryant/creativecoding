(ns sketch.dynamic
  (:require [quil.core :refer :all])
  (:use [incanter.core :only [$=]])
  (:use [clojure.math.combinatorics :only [combinations cartesian-product]])
  (:use [clojure.pprint])
  (:use [clojure.set :only [union]])
  (:use [clojure.contrib.map-utils :only [deep-merge-with]])
  (:import [org.apache.commons.math3.distribution ParetoDistribution])
  (:import [processing.core PShape PGraphics]))

  (defn check-overlap [circle-1 circles]
    (def radius-1 (/ (nth circle-1 2) 2))
    (def overlap nil)
    (doseq [i (range (count circles))]
      (def circle-2 (nth circles i))
      (def radius-2 (/ (nth circle-2 2) 2))
      (def center-distance
        (dist (first circle-1) (second circle-1)
              (first circle-2) (second circle-2)))
      (def radius-sum (+ radius-1 radius-2))
      (when (<= center-distance radius-sum) (def overlap true)))
    (println overlap)
    (or overlap false))

  (defn setup [])
  (defn draw []
    (no-loop)
    (color-mode :hsb 360 100 100 1.0)
    (background 100 0 100)
    (fill 100 0 100)
    (stroke 100 0 0)
    (def left-buffer (* (width) 0.1))
    (def right-buffer (* (width) 0.2))
    (def top-buffer (* (height) 0.2))
    (def bottom-buffer (* (height) 0.8))
    (def y-inc 4)
    (def line-width (+ left-buffer (- (width) right-buffer)))
    (def y-position top-buffer)
    (while (< y-position (* (height) 0.9))
    (do (line left-buffer y-position line-width y-position)
        (def y-inc (map-range y-position top-buffer bottom-buffer 4 1))
        (def y-position (+ y-position y-inc))))
    (no-stroke)
    ; (doseq  [i (range 10)]
    ;   (def diameter (random 50 100))
    ;   (ellipse (random left-buffer right-buffer)
    ;             (random top-buffer bottom-buffer) diameter diameter))
    (def circle-info [200 50 100 30 20 50 10 200 5 400])
    (def circle-info-index  0)
    (def circles (empty [1 2]))
    (def max-fails 2000)

    (while (< circle-info-index (count circle-info))
      (do (def fails 0)
          (def counter 0)
          (def stop false)
          (while (= stop false)
            (do (def x (random left-buffer (width)))
            (def y (random top-buffer bottom-buffer))
            (def diameter (nth circle-info circle-info-index))
            (def circle-count (nth circle-info (+ circle-info-index 1)))
            (def cobj (sequence [x y diameter]))
            (when (or (= fails max-fails) (> counter circle-count)) (def stop true))
            (if (= (check-overlap cobj circles) true )
              (do (def fails (+ fails 1)))
              (do (def circles (conj circles cobj))
                  (def counter (+ 1 counter))))))
          (def circle-info-index (+ circle-info-index 2))))

    (doseq [i (range (count circles))]
      (def cobj (nth circles i))
      (ellipse (nth cobj 0) (nth cobj 1) (nth cobj 2) (nth cobj 2)))

    (save "sketch.tif"))
