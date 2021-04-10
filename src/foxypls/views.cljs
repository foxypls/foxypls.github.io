(ns foxypls.views
  (:require
   [re-frame.core :as re-frame]
   [foxypls.subs :as subs]))

(defn main-panel []
  (let [name (re-frame/subscribe [::subs/name])]
    [:div
     [:h1
      "Fuck you from " @name]]))

(defn skill-xp-span [kv]
  (let [k (first (keys kv)) v (last (vals kv))] [:span {:style {:min-width "1rem"}} (str "Level " k ": " v)]))

(defn skill-level-panel []
  (let [xpmap (re-frame/subscribe [::subs/skillxpdb])]
    [:div
     ;;[:p @xpmap]
     ;;[:p (reduce (fn [string kv] (let [k (first (keys kv)) v (last (vals kv))] (str string "\nLevel " k ": " v))) "" @xpmap)]
     [:p (map skill-xp-span @xpmap)]
     ;;[:p (reduce (fn [string kv] (str string kv)) "" @xpmap)]
     ;;[:p (reduce (fn [string kv] (str string kv)) "" @xpmap)]
     ]))
