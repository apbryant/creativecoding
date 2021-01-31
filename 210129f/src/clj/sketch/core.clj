(ns sketch.core
  (:require [quil.core :as q])
  (:require [sketch.dynamic :as dynamic])
  (:gen-class))

(defn -main
  [& args])

(q/defsketch example
             :title "Sketch"
             :setup dynamic/setup
             :draw dynamic/draw
             :size [800 800])

(defn refresh []
  (use :reload 'sketch.dynamic)
  (.loop example))
