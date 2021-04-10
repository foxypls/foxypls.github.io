(ns foxypls.subs
  (:require
   [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::name
 (fn [db]
   (:name db)))

(re-frame/reg-sub
 ::skillxpdb
 (fn [db]
   (:skillxpdb db)))

(re-frame/reg-sub
 ::skills
 (fn [db]
   (:skills db)))
