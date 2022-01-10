(defproject sketch "1.0"
  :description "Tracking"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojure-contrib "1.2.0"]
                 [quil "2.2.4" :exclusions [org.clojure/clojure]]]
  :jvm-opts ["-Xms5000m" "-Xmx5000M" "-server"]
  :main ^:skip-aot sketch.core
  :source-paths ["src/clj"]
  :aot [sketch.dynamic])
