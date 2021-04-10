(ns foxypls.events
  (:require
   [re-frame.core :as re-frame]
   [foxypls.db :as db]
   ))

(re-frame/reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))
