(ns sketch.dynamic
  (:require [quil.core :refer :all])
  (:use [incanter.core :only [$=]])
  (:use [clojure.math.combinatorics :only [combinations cartesian-product]])
  (:use [clojure.pprint])
  (:use [clojure.set :only [union]])
  (:use [clojure.contrib.map-utils :only [deep-merge-with]])
  (:import [org.apache.commons.math3.distribution ParetoDistribution])
  (:import [processing.core PShape PGraphics]))

(defn square
  ([x y side-length] (rect x y side-length side-length))
  ([x y side-length round] (rect x y side-length side-length round)))

(defn rule [a b c]
  (let [s (str a b c)
        ruleset {"111" 0 "110" 0
                 "101" 0 "100" 1
                 "011" 1 "010" 1
                 "001" 1 "000" 0}]
    (get ruleset s)))

(defn make-rule [array index length]
  (let [a (atom 0)
        b (atom 0)
        c (atom 0)]
    (cond
      (= index (- length 1)) (do (reset! a  (nth array (- index 1)))
                                 (reset! b  (nth array index))
                                 (reset! c  (nth array 0)))

      (and (> index 0) (< index (- length 1))) (do
                                                 (reset! a  (nth array (- index 1)))
                                                 (reset! b (nth array index))
                                                 (reset! c (nth array (+ index 1))))

      (= index 0) (do (reset! a (nth array (- length 1)))
                      (reset! b  (nth array index))
                      (reset! c  (nth array (+ index 1)))))

    (rule @a @b @c)))

(defn make-start-array [n]
  (loop [i 0 out []]
    (if (< i n)
      (let [rnd (random 1)]
        (if (< rnd 0.1)
          (do (recur (inc i) (conj out 1)))
          (do (recur (inc i) (conj out 0))))) out)))

(defn setup [])
(defn draw []
  (no-loop)
  (color-mode :hsb 360 100 100 1.0)
  (background 100 0 100)
  (no-stroke)
  (no-fill)

  (def size 200)
  (def num-rows size)
  (def num-cols size)
  (def row-width (/ (width) num-rows))
  (def col-width (/ (height) num-cols))
  (def binary-start-full (atom (make-start-array size)))

  (let [arr (atom [binary-start-full])]
    (doseq [y (range num-rows)]
      (let [new-arr (atom [])]
        (doseq [x (range num-cols)]
          (let [sqx (* col-width x)
                sqy (* row-width y)
                last-arr (last @arr)
                r (make-rule @last-arr x size)]
            (if (= r 1)
              (do (fill 100 0 0)) (do (fill 100 0 100)))
            (square sqx sqy col-width)
            (swap! new-arr conj r)))
        (swap! arr conj new-arr))))

  (save "sketch.png"))
