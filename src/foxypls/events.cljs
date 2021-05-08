(ns foxypls.events
  (:require [re-frame.core :as re-frame]
            [foxypls.db :as db]
            [foxypls.func :as func]
            [ajax.core :as ajax]
            [day8.re-frame.http-fx]))

(re-frame/reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))

(re-frame/reg-event-db
 ::update-db
 (fn [db [_ k e]]
   (update db k merge e)))

(re-frame/reg-event-db
 ::overwrite-db
 (fn [db [_ k v]]
   (assoc db k v)))

(re-frame/reg-event-fx
 ::loaded-json
 []
 (fn [_ [_ file]]
   {:http-xhrio {:uri (str "/CONSTANTS/" file ".json")
                 :method :get
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success [::update-db (keyword file)]
                 :on-error [::notified-error]}}))

(re-frame/reg-event-fx
 ::import-save-data
 []
 (fn [cofx [_ save-data]]
   {::local-storage {:action :set :key :save-data :val (func/decode-melvor-idle-save save-data)}
    :db (update (:db cofx) :inputs assoc :save-data (func/decode-melvor-idle-save save-data))}))

(re-frame/reg-fx
 ::notified-error
 (fn [e]
   (js/console.log e)))

(re-frame/reg-fx
 ::local-storage
 (fn [req]
   (case (:action req)
     :get (.getItem (.-localStorage js/window) (:key req))
     :set (.setItem (.-localStorage js/window) (:key req) (:val req))
     :remove (.removeItem (.-localStorage js/window) (:key req)))))
