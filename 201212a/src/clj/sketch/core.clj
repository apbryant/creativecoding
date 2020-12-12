(ns sketch.core
  (:require [quil.core :as q])
  (:require [sketch.dynamic :as dynamic])
  (:gen-class))

(defn -main
;;
  [& args])
  ; (println "Hello, World!"))



  (q/defsketch example
               :title "Sketch"
               :setup dynamic/setup
               :draw dynamic/draw
               :size [1200 1000])

  (defn refresh []
    (use :reload 'sketch.dynamic)
    (.loop example))
