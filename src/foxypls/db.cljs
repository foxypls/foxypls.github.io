(ns foxypls.db
  (:require [foxypls.CONSTANTS.app-menu :refer [app-menu]]
            [foxypls.CONSTANTS.obstacles :refer [obstacles]]))


(def skillxp-db
  (map (fn [level] {level (js/BigInt (Math/floor (/ (reduce (fn [sum term] (+ sum (Math/floor (+ term (* 300 (Math/pow 2 (/ term 7))))))) (range level)) 4)))}) (iterate inc 1)))

(def inputs-db
  (if-some [local-save (.getItem (.-localStorage js/window) :save-data)]
    {:save-data local-save}
    {}))

(def default-db
  {:name "Foxypls Mevlor Calcs"
   :skillxpdb (into [] (take 200 skillxp-db))
   :app-menu app-menu
   :obstacles obstacles
   :inputs inputs-db})
