(ns rotation.core
  (:require [quil.core :as q :refer :all]))

(defn -main
  [& args])

(defn width-perc [perc] (* (width) perc))
(defn height-perc [perc] (* (height) perc))

(def img (ref nil))

(defn setup [])
(defn draw []
  (no-loop)
  (color-mode :hsb 360 100 100 1.0)
  (background 100 0 100)
  (fill 100 0 0)
  (no-stroke)
  (dosync (ref-set img (load-image "photo.jpg")))
  (image @img 0 0 (width) (height))

  (let [n-cols 10
        col-width (/ (width) n-cols)
        n-rows 500
        row-width (/ (height) n-rows)]
    (doseq [y (range n-rows)]
      (doseq [x (range n-cols)]
        (let [sx (* x col-width)
              sy (* y row-width)
              dx (+ sx (map-range (noise sy) 0 1 (width-perc -0.1) (width-perc 0.1)))
              dy (+ sy (map-range (noise sx) 0 1 (height-perc -0.1) (height-perc 0.1)))]
          (push-matrix)
          (rotate (sin (/ (radians x) 100)))
          (copy [sx sy col-width row-width] [dx dy col-width row-width])
          (pop-matrix))))) (save "sketch.jpg"))

(q/defsketch rotation
             :title "Sketch"
             :setup rotation.core/setup
             :draw rotation.core/draw
             :size [1000 543])
