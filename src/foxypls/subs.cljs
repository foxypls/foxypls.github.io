(ns foxypls.subs
  (:require
   [clojure.walk :refer [keywordize-keys]]
   [re-frame.core :as re-frame]
   [clojure.edn :as clojure.edn]))

;; Layer 1

(re-frame/reg-sub
 ::name
 (fn [db]
   (:name db)))

(re-frame/reg-sub
 ::skillxpdb
 (fn [db]
   (:skillxpdb db)))

(re-frame/reg-sub
 ::app-menu
 (fn [db]
   (:app-menu db)))

(re-frame/reg-sub
 ::obstacles
 (fn [db]
   (select-keys
    (keywordize-keys (:obstacles db))
    [:key :name :category :completionBonuses :interval :modifiers])))

(re-frame/reg-sub
 ::shop-skill-modifiers
 (fn [db]
   (map (fn [su]
          {:name (get su :name)
           :modifiers (get-in su [:contains :modifiers])})
        (:SkillUpgrades (keywordize-keys (:shop db))))))

(re-frame/reg-sub
 ::save-data
 (fn [db]
   (get-in db [:inputs :save-data])))

;; Layer 2

(re-frame/reg-sub
 ::save-data-keys
 (fn [_ _]
   (re-frame/subscribe [::save-data]))
 (fn [save-data _]
   (keys (clojure.edn/read-string save-data))))
