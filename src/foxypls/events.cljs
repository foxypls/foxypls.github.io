(ns foxypls.events
  (:require
   [re-frame.core :as re-frame]
   [foxypls.db :as db]
   [foxypls.func :as func]))

(re-frame/reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))

(re-frame/reg-event-db
 ::import-save-data
 (fn [db save-data]
   (update db :inputs assoc :save-data (func/decode-melvor-idle-save save-data))))
