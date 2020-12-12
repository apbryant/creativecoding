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
    (background 100 0 100)
    (fill 100 0 100)
    (stroke 100 0 0)
    (save "sketch.tif"))
