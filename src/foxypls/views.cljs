(ns foxypls.views
  (:require
   [re-frame.core :as re-frame]
   [foxypls.subs :as subs]
   [foxypls.events :as events]
   [foxypls.views.panels :refer [home panel-fn-by-string]]))

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
              (map (fn [li]
                     [:li {:key li}
                      [:a {:onClick
                           (fn [e]
                             (let [skill-title (.. ^string e -nativeEvent -target -innerHTML)]
                               (re-frame/dispatch [::events/overwrite-db :active-panel skill-title])))} li]]) (val sm))]]) @menu-map)]))

(defn skill-panel [active-skill]
  [:div [:p active-skill]
   ((panel-fn-by-string active-skill))])

(defn main-panel []
  (let [name (re-frame/subscribe [::subs/name])
        active-panel (re-frame/subscribe [::subs/active-panel])]
    [:div {:class "container pl-4 pr-6" :style {:min-width "100vw"}}
     ;;[nav-bar]
     [:div {:class "columns"}
      [:div {:class "column is-narrow"}
       [app-menu]]
      [:div {:class "column"}
       [:h1 {:class "title"}
        @name]
       (if (or (nil? @active-panel) (= @active-panel "Settings"))
         [home]
         [skill-panel @active-panel])]]]))


