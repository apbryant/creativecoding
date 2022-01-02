(ns sketch.core
  (:require [quil.core :as q])
  (:require [sketch.dynamic :as dynamic]))

(defn -main
  [& args])

(q/defsketch example
  :title "Teotihuacan"
  :setup dynamic/setup
  :draw dynamic/draw
  :size [600 600])

(defn refresh []
  (use :reload 'sketch.dynamic)
  (.loop example))
