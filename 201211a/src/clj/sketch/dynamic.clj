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
  (or overlap false))

(defn polygon-contains-point [polygon-x-points polygon-y-points test-x test-y]
  (def num-verts (count polygon-x-points))
  (def c false)
  (def j (- num-verts 1))
  (doseq [i (range num-verts)]
    (def delta-x (- (nth polygon-x-points j) (nth polygon-x-points i)))
    (def y-spread (- test-y (nth polygon-y-points i)))
    (def delta-y (- (nth polygon-y-points j) (nth polygon-y-points i)))
    (def cond1 (> (nth polygon-y-points i) test-y))
    (def cond2 (> (nth polygon-y-points j) test-y))
    (def cond3 (not= cond1 cond2))
    (def cond4 (< test-x  (+ (/ (* delta-x y-spread) delta-y) (nth polygon-x-points i))))
    (def cond5 (and cond3 cond4))
    (when (and cond3 cond4) (def c (not c)))
    (def j i))
    (or c false))

(defn circle-in-polygon [circle x-polygon y-polygon]
  (def return-value true)
  (doseq [i (range 16)]
    (def theta (* PI (/ i 8)))
    (def point-x (+ (first circle) (floor (* (/ (nth circle 2) 2) (cos theta)))))
    (def point-y (+ (second circle) (floor (* (/ (nth circle 2) 2) (sin theta)))))
    (def polygon-has-point (polygon-contains-point x-polygon y-polygon point-x point-y))
    (when (= polygon-has-point false) (def return-value false)))
    (or return-value false))



  (defn setup [])
  (defn draw []
    (no-loop)
    (color-mode :hsb 360 100 100 1.0)
    (background 170 25 50)
    (fill 0)
    (def noise-scale 0.03)
    (def number-lines 200)
    (def max-line-length 200)
    ; Horizontal-ish lines
    (stroke 170 25 45)
    (stroke-weight 0.5)
    (doseq [i (range number-lines)]
      (push-matrix)
      (def line-x (random (width)))
      (translate line-x (random (height)))
      (def line-rotation (map-range line-x 0 (width) (* PI 0.4) (/ PI 2)))
      (def line-noise (map-range (noise (* i noise-scale)) 0 1 (* PI -0.02) (* PI 0.02)))
      (rotate (+ line-rotation line-noise))
      (line 0 0 0 (random max-line-length))
      (pop-matrix))
    ; Vertical-ish line groups
    (def number-lines 10)
    (stroke 170 25 40 1)
    (def number-clumps 100)
    (def line-offset-x (* (width) 0.05))
    (def line-offset-y (* (height) 0.005))
    (doseq [j (range number-clumps)]
      (def clump-x (random (width)))
      (def clump-y (random (height)))
      (doseq [i (range number-lines)]
        (push-matrix)
        (def line-x (+ clump-x (map-range (noise clump-x j i) 0 1 (* -1 line-offset-x) line-offset-x)))
        (def line-y (+ clump-y (map-range (noise clump-y j i) 0 1 (* -1 line-offset-y) line-offset-y)))
        (translate line-x line-y)
        (def ypos line-y)
        (push-matrix)

        (while  (< ypos (+ line-y max-line-length))


          (do (push-matrix)
              (rotate (map-range (noise ypos noise-scale) 0 1 (* PI -0.05) (* PI 0.05)))
              (when (< (random 10) 2) (line 0 0 0 1))
              (pop-matrix)
              (def ypos (+ ypos 1))
              (translate 0 1)))
        (pop-matrix)

        (pop-matrix)))
      ; Gray blob things
      (no-stroke)
      (fill 30 10 60)
      (def start-circle-x (* (width) 0.7))
      (def start-circle-y (* (height) 0.1))
      (def rectangle-width (random (* (width) 0.1)))
      (def rectangle-height (random (* (height) 0.1) (* (height) 0.30)))
      (def circle-rectangle-width (* (width) 0.1))
      (def circle-rectangle-height (* (height) 0.3))
      ; (rect start-circle-x start-circle-y rectangle-width rectangle-height)
      (def min-x start-circle-x)
      (def min-y start-circle-y)
      (def max-x (+ start-circle-x rectangle-width))
      (def max-y (+ start-circle-y rectangle-height))
      (def circle-count 50)
      (def centers (empty [1 2]))
      (doseq [i (range 10)])
        (doseq [j (range circle-count)]
          (def ellipse-x (random min-x max-x))
          (def ellipse-y (random min-y max-y))
          (def ellipse-width (random circle-rectangle-width))
          (def ellipse-height (random circle-rectangle-height))
          (when (< (- ellipse-x (/ ellipse-width 2)) min-x) (def min-x (- ellipse-x (/ ellipse-width 2))))
          (when (> (+ ellipse-x (/ ellipse-width 2)) max-x) (def max-x (+ ellipse-x (/ ellipse-width 2))))
          (when (< (- ellipse-y (/ ellipse-height 2)) min-y) (def min-y (- ellipse-y (/ ellipse-height 2))))
          (when (> (+ ellipse-y (/ ellipse-height 2)) max-y) (def max-y (+ ellipse-y (/ ellipse-height 2))))
        (def angle 0)
        (begin-shape)
        (while (< angle (* 2 PI)) (do
          (def radius (random (* ellipse-width 0.75) ellipse-width))
          (def vertex-x (+ ellipse-x (* radius (cos angle))))
          (def vertex-y (+ ellipse-y (* radius (sin angle))))
          (vertex vertex-x vertex-y)
          (def center-vector [vertex-x vertex-y radius])
          (def centers (conj centers center-vector))
          (def angle (+ angle (random (/ PI 5))))))
          ; (stroke 30 10 59)


        (end-shape))
        (fill 30 10 50)
        (println centers)
        ; Points in gray blobs
        (def centers-count (count centers))
        (doseq [pt (range 5000)]
          (def center-index (floor (random centers-count)))
          (def center (nth centers center-index))
          (def distance-from-center (random (nth center 2)))
          (def angle (random (* 2 PI)))
          (def ellipse-radius (random 0.1 3))
          (ellipse (+ (nth center 0) (* distance-from-center (cos angle))) (+ (nth center 1) (* distance-from-center (sin angle))) ellipse-radius ellipse-radius))

        ; (ellipse ellipse-x ellipse-y ellipse-width ellipse-height))
        (def circle-count (* circle-count 1.1))

        (def circle-rectangle-width (* circle-rectangle-width 0.95))
        (def circle-rectangle-height (* circle-rectangle-height 0.95))
        (save "sketch.tif")
      )

    ; (stroke 0)
    ; (fill 0)
    ; (def number-rectangles 10)
    ; (def number-circles 100)
    ; (doseq [i (range number-rectangles)]
    ;   (push-matrix)
    ;   (translate (random (width)) (random (height)))
    ;   (def rectangle-length (random (* (width) 0.05)))
    ;   (def rectangle-height (random (* (height) 0.3)))
    ;   (def top-left [0 0])
    ;   (def top-right [rectangle-length 0])
    ;   (def bottom-right [rectangle-length 0])
    ;   (def polygon-x-points [0 rectangle-length rectangle-length 0])
    ;   (def polygon-y-points [0 0 rectangle-height rectangle-height])
    ;   (def circles (empty [1 2]))
    ;   (def pack-data [10 50 5 75 2 100])
    ;   (def pack-index 0)
    ;   (def circle-counter 0)
    ;   (def max-fails 200)
    ;   (def circles (empty [1 2]))
    ;   (while (< circle-counter (- (count pack-data) 1))
    ;     (do
    ;       (def fails 0)
    ;       (def c 0)
    ;       (def stop false)
    ;       (while (= stop false)
    ;       (do
    ;         (def circle-diameter (nth pack-data circle-counter))
    ;         (def circle-count (nth pack-data (+ circle-counter 1)))
    ;         (def circle-x (random rectangle-length))
    ;         (def circle-y (random rectangle-height))
    ;         (def circle-object [circle-x circle-y circle-diameter])
    ;
    ;         (when (or (= fails max-fails) (> c circle-count)) (def stop true))
    ;         (if (= (check-overlap circle-object circles) true) (do (def fails (+ fails 1))) (do (conj circles circle-object)))))
    ;       (def circle-counter (+ circle-counter 2))))
    ;   (println circles)
    ;   (doseq [k (range (count circles))]
    ;     (def circle-object (nth circles k))
    ;     (ellipse (nth circle-object 0) (nth circle-object 1) (nth circle-object 2) (nth circle-object 2)))
    ;   (pop-matrix)))

  ; (save "sketch.tif"))