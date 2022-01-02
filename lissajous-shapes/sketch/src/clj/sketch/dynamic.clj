(ns sketch.dynamic
  (:require [quil.core :refer :all]))

(defmacro with-matrix
  [& body]
  `(do
     (push-matrix)
     (try
       ~@body
       (finally
         (pop-matrix)))))

(defmacro with-shape
  [& body]
  `(do
     (begin-shape)
     (try
       ~@body
       (finally
         (end-shape :close)))))

(defn neg [x] (* -1 x))

(defn create-vecs [n x y]
  (loop [i 0 vecs []]
    (if (< i n)
      (do
        (let [mag (width)
              _x (map-range (sin (radians (* i x))) -1 1 (neg mag) mag)
              _y (map-range (sin (radians (* i y))) -1 1 (neg mag) mag)]
          (recur (inc i) (conj vecs {:x _x :y _y})))) vecs)))

(defn setup [])
(defn draw []
  (frame-rate 1)
  (color-mode :hsb 360 100 100 1.0)
  (background 100 0 100)
  (fill 100 0 0)
  (no-stroke)
  (with-matrix
   (translate (width-perc 0.5) (height-perc 0.5))
   (let [rand-x (rand 10) rand-y (rand 10) n 100000
     vecs (create-vecs n rand-x rand-y)]
     (with-shape
        (doseq [i (range (count vecs))]
          (curve-vertex ((nth vecs i) :x) ((nth vecs i) :y)))))))
