(ns sketch.dynamic
  (:require [quil.core :refer :all])
  (:use [incanter.core :only [$=]])
  (:use [clojure.math.combinatorics :only [combinations cartesian-product]])
  (:use [clojure.pprint])
  (:use [clojure.set :only [union]])
  (:use [clojure.contrib.map-utils :only [deep-merge-with]])
  (:import [org.apache.commons.math3.distribution ParetoDistribution])
  (:import [processing.core PShape PGraphics]))

  (defmacro halve [number]
    (list / number 2)
    )
  ;; fib from vedang https://stackoverflow.com/questions/8939970/a-recursive-fibonacci-function-in-clojure (CC BY-SA 3.0)
  (defn fib
    ([n]
       (fib [0 1] n))
    ([x, n]
       (if (< (count x) n)
         (fib (conj x (+ (last x) (nth x (- (count x) 2)))) n)
         x)))

  (defn setup [])
  (defn draw []
    (no-loop)
    (color-mode :hsb 360 100 100 1.0)
    (background 100 0 100)
    (fill 100 0 0)
    (no-fill)
    (stroke 100 0 0)
    (def num-cols 15)
    (def fib-seq (fib num-cols))
    (def col-width (/ (width) num-cols))
    (translate (* col-width -1) 0)
    (doseq [i (range 1 num-cols)]
      (def x (* col-width i))
      (def num-rows (nth fib-seq i))
      (def rect-height (/ (height) num-rows))
      (def h (map-range i 1 num-cols 0 360))
      (doseq [j (range num-rows)]
        (def s (map-range j 0 (height) 50 70))
        (fill h s 50)
        (rect x (* rect-height j) col-width rect-height)))

    (save "sketch.tif"))
