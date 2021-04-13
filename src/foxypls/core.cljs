(ns foxypls.core
  (:require
   [reagent.dom :as rdom]
   [re-frame.core :as re-frame]
   [foxypls.db :refer [json-files]]
   [foxypls.events :as events]
   [foxypls.views :as views]
   [foxypls.config :as config]))


(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  ;(dorun (map #(re-frame/dispatch-sync [::events/loaded-json %]) json-files))
  (js/console.log json-files)
  (loop [files json-files]
    (re-frame/dispatch-sync [::events/loaded-json (first files)])
    (when (> (count files) 1)
      (recur (rest files))))
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [views/main-panel] root-el)))

(defn init []
  (re-frame/dispatch-sync [::events/initialize-db])
  (dev-setup)
  (mount-root))
