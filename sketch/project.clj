(defproject sketch "1.0"
  :description "My example sketch."
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojure-contrib "1.2.0"]
                 [quil "2.2.4" :exclusions [org.clojure/clojure]]
                 [org.apache.commons/commons-math3 "3.3"]
                 [incanter "1.5.5"]]
  :jvm-opts ["-Xms5000m" "-Xmx5000M" "-server"]
  :main ^:skip-aot sketch.core
  :source-paths ["src/clj"]
  :java-source-paths ["src/java"]
  :aot [sketch.dynamic])
