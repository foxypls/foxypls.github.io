(ns foxypls.views.panels
  (:require
   [re-frame.core :as re-frame]
   [foxypls.subs :as subs]
   [foxypls.events :as events]))

(defn home []
  (let [pasted-data (atom "")
        my-sub (re-frame/subscribe [::subs/shop-skill-modifiers])]
    [:div {:class "columns"}
     [:div {:class "columns column is-4"}
      [:div {:class "column"}
       [:input
        {:class "input is-primary" :type "text" :placeholder "Paste save data"
         :onChange (fn [e]
                     (.preventDefault e)
                     (reset! pasted-data (.-value (.-target e))))}]]
      [:div {:class "column"}
       [:button
        {:class "button is-primary"
         :onClick (fn [e]
                    (.preventDefault e)
                    (re-frame/dispatch [::events/import-save-data @pasted-data]))}
        "Import"]]]
     [:div {:class "column"}
      (map (fn [p] [:p p]) @my-sub)]]))

(defn woodcutting
  []
  [:p "Woodcutting panel"])

(def string-panel-walk
  {"Settings"    home
   "Woodcutting" woodcutting})

(defn panel-fn-by-string
  [panel-string]
  (get string-panel-walk panel-string home))