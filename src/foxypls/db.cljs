(ns foxypls.db
  (:require [foxypls.CONSTANTS.skills :refer [skills]]))


(def skillxp-db
  (map (fn [level] {level (js/BigInt (Math/floor (/ (reduce (fn [sum term] (+ sum (Math/floor (+ term (* 300 (Math/pow 2 (/ term 7))))))) (range level)) 4)))}) (iterate inc 1)))

(def inputs-db
  ;; TODO: Save inputs to local storage
  ;;       Load inputs from local storage instead of initing an empty map   
  {})

(def default-db
  {:name "Foxypls Mevlor Calcs"
   :skillxpdb (into [] (take 200 skillxp-db))
   :skills skills
   :inputs inputs-db})
