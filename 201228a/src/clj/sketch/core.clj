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
               :size [2000 2000])

  (defn refresh []
    (use :reload 'sketch.dynamic)
    (.loop example))
