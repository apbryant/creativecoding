(ns sketch.dynamic
  (:require [quil.core :refer :all])
  (:use [incanter.core :only [$=]])
  (:use [clojure.math.combinatorics :only [combinations cartesian-product]])
  (:use [clojure.pprint])
  (:use [clojure.set :only [union]])
  (:use [clojure.contrib.map-utils :only [deep-merge-with]])
  (:import [org.apache.commons.math3.distribution ParetoDistribution])
  (:import [processing.core PShape PGraphics]))

  (defmacro inc-var [var inc]
    `(do (def ~var (+ ~inc ~var))))

  (def img (ref nil))
  (defn setup [])
  (defn draw []
    (no-loop)
    (color-mode :hsb 360 100 100 1.0)
    (background 100 0 100)
    (fill 100 0 0)
    (no-stroke)
    (dosync (ref-set img (load-image "la_serena.jpg")))
    (image @img 0 0 (width) (height))
    (def t 0)
    (def t-inc 0.01)
    (def n-cols 50)
    (def col-width (/ (width) n-cols))
    (def n-rows 50)
    (def row-width (/ (height) n-rows))
    (doseq [y (range n-rows)]
      (doseq [x (range n-cols)]
        (def sx (* x col-width))
        (def sy (* y row-width))
        (def dx (+ sx (* 35 (sin (* (radians (* (noise sx t) 10)))))))
        (def dy (+ sy (* 35 (sin (* (radians (* (noise sy t) 10)))))))
        (inc-var t t-inc)
        (copy [sx sy col-width row-width][dx dy col-width row-width])
        )
      )

    (save "sketch.png"))
