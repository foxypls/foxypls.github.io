(ns foxypls.db)

(def json-files
  ["agility-pillars"
   "base-intervals"
   "item-list"
   "items"
   "logs"
   "monsters"
   "obstacles"
   "pets"
   "player-modifiers-template"
   "shop"
   "tool"
   "app-menu"])

(def skillxp-db
  (map (fn [level] {level (js/BigInt (Math/floor (/ (reduce (fn [sum term] (+ sum (Math/floor (+ term (* 300 (Math/pow 2 (/ term 7))))))) (range level)) 4)))}) (iterate inc 1)))

(def inputs-db
  (if-some [local-save (.getItem (.-localStorage js/window) :save-data)]
    {:save-data local-save}
    {}))

(def default-db
  {:name "Foxypls Mevlor Calcs"
   :skillxpdb (into [] (take 200 skillxp-db))
   :inputs inputs-db})
