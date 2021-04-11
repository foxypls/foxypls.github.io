(ns foxypls.func
  (:require [goog.crypt.base64 :as b64]
            ["pako" :as pako]))

(defn decode-melvor-idle-save
  [save-data]
  (-> (get save-data 1)
      (b64/decodeString) ;; Decode base64 (convert ascii to binary)
      (#(. % split ""))
      (#(. % map (fn [x] (. x charCodeAt 0)))) ;; Convert binary string to character-number array
      (js/Uint8Array.) ;; into byte-array
      (#(pako/ungzip % {:to "string"})) ;; gunzip
      (#(apply str (map char %))) ;; Decode to string
      (js/JSON.parse) ;; Parse JSON string into object
      (#(js->clj % :keywordize-keys true))))