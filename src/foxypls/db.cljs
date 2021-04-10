(ns foxypls.db)

(def skillxp-db
  (map (fn [level] {level (js/BigInt (Math/floor (/ (reduce (fn [sum term] (+ sum (Math/floor (+ term (* 300 (Math/pow 2 (/ term 7))))))) (range level)) 4)))}) (iterate inc 1)))

(def default-db
  {:name "Foxypls Mevlor Calcs"
   :skillxpdb (into [] (take 200 skillxp-db))})
