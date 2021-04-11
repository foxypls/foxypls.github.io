(ns foxypls.views
  (:require
   [re-frame.core :as re-frame]
   [foxypls.subs :as subs]
   [foxypls.events :as events]))

(defn skill-xp-span [kv]
  (let [k (first (keys kv)) v (last (vals kv))] [:span {:style {:min-width "1rem"} :key k} (str "Level " k ": " v)]))

(defn skill-level-panel []
  (let [xpmap (re-frame/subscribe [::subs/skillxpdb])]
    [:div
     ;;[:p @xpmap]
     ;;[:p (reduce (fn [string kv] (let [k (first (keys kv)) v (last (vals kv))] (str string "\nLevel " k ": " v))) "" @xpmap)]
     [:p (map skill-xp-span @xpmap)]
     ;;[:p (reduce (fn [string kv] (str string kv)) "" @xpmap)]
     ;;[:p (reduce (fn [string kv] (str string kv)) "" @xpmap)]
     ]))

(defn nav-bar []
  [:nav {:class "navbar mb-3" :role "navigation" :style {:border "bottom"}}
   [:div {:class "navbar-brand"}
    [:a {:class "navbar-item" :href "/"}
     [:img {:src "logo.png"}]]

    [:a {:role "button" :class "navbar-burger" :data-target "navbarBasicExample"}
     [:span {:aria-hidden "true"}]
     [:span {:aria-hidden "true"}]
     [:span {:aria-hidden "true"}]]]

   [:div {:id "navbarBasicExample" :class "navbar-menu"}
    [:div {:class "navbar-start"}
     [:a {:class "navbar-item"}
      "Home"]
     [:a {:class "navbar-item"}
      "Settings"]]

    [:div {:class "navbar-end"}
     [:div {:class "navbar-item"}
      [:a {:href "https://github.com/foxypls/foxypls.github.io"}
       [:i {:class "fab fa-github"}]]]]]])

(defn app-menu []
  (let [menu-map (re-frame/subscribe [::subs/app-menu])]
    [:aside {:class "menu"}
     (map (fn [sm]
            [:div {:class "container mb-3"}
             [:p {:class "menu-label"}
              (name (key sm))]
             [:ul {:class "menu-list"}
              (map (fn [li] [:li {:key li} [:a li]]) (val sm))]]) @menu-map)]))

(defn home-panel []
  (let [saved-data (atom "")]
    [:div {:class "colums"}
     [:div {:class "columns column is-4"}
      [:div {:class "column"}
       [:input
        {:class "input is-primary" :type "text" :placeholder "Paste save data"
         :onChange (fn [e]
                     (.preventDefault e)
                     (reset! saved-data (.-value (.-target e))))}]]
      [:div {:class "column"}
       [:button
        {:class "button is-primary"
         :onClick (fn [e]
                    (.preventDefault e)
                    (re-frame/dispatch [::events/import-save-data @saved-data]))}
        "Import"]]]]))

(defn main-panel []
  (let [name (re-frame/subscribe [::subs/name])]
    [:div {:class "container pl-4 pr-4" :style {:min-width "100vw"}}
     [nav-bar]
     [:div {:class "columns"}
      [:div {:class "column is-narrow"}
       [app-menu]]
      [:div {:class "column"}
       [:h1 {:class "title"}
        @name]
       [home-panel]]]]))


