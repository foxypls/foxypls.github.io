(ns foxypls.views
  (:require
   [re-frame.core :as re-frame]
   [foxypls.subs :as subs]))

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
  [:nav {:class "navbar" :role "navigation"}
   [:div {:class "navbar-brand"}
    [:a {:class "navbar-item" :href= "/"}
     [:img {:src "logo.png"}]]

    [:a {:role= "button" :class "navbar-burger" :data-target "navbarBasicExample"}
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

(defn main-panel []
  (let [name (re-frame/subscribe [::subs/name])]
    [:div {:class "container"}
     [nav-bar]
     [:section {:class "section"}
      [:h1 {:class "title"}
       @name]
      [skill-level-panel]]]))


