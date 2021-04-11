(ns foxypls.events
  (:require
   [re-frame.core :as re-frame]
   [foxypls.db :as db]
   [foxypls.func :as func]))

(re-frame/reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))

(re-frame/reg-event-fx
 ::import-save-data
 []
 (fn [cofx [_ save-data]]
   {::local-storage {:action :set :key :save-data :val (func/decode-melvor-idle-save save-data)}
    :db (update (:db cofx) :inputs assoc :save-data (func/decode-melvor-idle-save save-data))}))

(re-frame/reg-fx
 ::local-storage
 (fn [req]
   (case (:action req)
     :get (.getItem (.-localStorage js/window) (:key req))
     :set (.setItem (.-localStorage js/window) (:key req) (:val req))
     :remove (.removeItem (.-localStorage js/window) (:key req)))))
