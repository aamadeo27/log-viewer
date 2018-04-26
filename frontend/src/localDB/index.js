if ( !window.indexedDB ) window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
if ( !window.IDBTransaction ) window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}
if ( !window.IDBKeyRange ) window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

const DEFAULT_CONFIG = "Default"
const DEFAULT_TAG_SPLIT = /.+](?=[^[].+?)/
const DEFAULT_TAG_REGEX = /(\[.+?\])+?/g
const DEFAULT_DATE_REGEX = /(\d\d\/\d\d\/\d\d\d\d)/
const DEFAULT_TIME_REGEX = /(\d\d:\d\d:\d\d)/
const DEFAULT_SPLIT_REGEX = /(\[\d\d\/\d\d\/\d\d\d\d\]\[\d\d:\d\d:\d\d\])/
const DEFAULT_INFO_REGEX = /info/i
const DEFAULT_DEBUG_REGEX = /debug/i
const DEFAULT_ERROR_REGEX = /error/i
const DEFAULT_WARNING_REGEX = /warn/i

const DEFAULT_DATE_TAG = { regex: DEFAULT_DATE_REGEX, style: "blue", name: "Date" }
const DEFAULT_TIME_TAG = { regex: DEFAULT_TIME_REGEX, style: "blue", name: "Time" }
const DEFAULT_INFO_TAG = { regex: DEFAULT_INFO_REGEX, style: "black", name: "Info" }
const DEFAULT_DEBUG_TAG = { regex: DEFAULT_DEBUG_REGEX, style: "green", name: "Debug" }
const DEFAULT_ERROR_TAG = { regex: DEFAULT_ERROR_REGEX, style: "red", name: "Error" }
const DEFAULT_WARNING_TAG = { regex: DEFAULT_WARNING_REGEX, style: "yellow", name: "Warning" }

const DEFAULT_TAGS = [DEFAULT_DATE_TAG, DEFAULT_TIME_TAG, DEFAULT_INFO_TAG, DEFAULT_DEBUG_TAG, DEFAULT_ERROR_TAG, DEFAULT_WARNING_TAG]


let db = null

const connect = () => {
    const openReq = window.indexedDB.open("LogViewer", 1)

    return new Promise ( (resolve, reject) => {
        openReq.onsuccess = e => {
            db = e.target.result
            resolve()
        }
    
        openReq.onupgradeneeded = function(event) { 
            const db = event.target.result
        
            db.createObjectStore("configs", { keyPath: "name" })
        }

        openReq.onerror = e => reject( e.target.errorCode )
    })
}

export const updateConfig = config => {
    const transaction = db.transaction(["configs"], "readwrite")

    transaction.objectStore("configs").put(config)

    return new Promise( (resolve, reject) => {
        transaction.oncomplete = event => {
            resolve({ status: 0 })
        }
          
        transaction.onerror = event =>  {
            reject({ error : event.target.errorCode })
        };
    })
}

export const getConfig = name => {
    const transaction = db.transaction(["configs"], "readonly")

    const request = transaction.objectStore("configs").get(name)

    return new Promise( (resolve, reject) => {
        request.onsuccess = event => {
            console.log("Completed")
            resolve(request.result)
        }
          
        request.onerror = event =>  {
            console.log("Error")
            reject({ error : event.target.errorCode })
        };
    })
}

export const init = async (configStore) => {
    await connect()

    console.log("Connected")

    const currentConfig = localStorage.currentConfig || DEFAULT_CONFIG
    try {
        console.log("Getting config:", currentConfig)

        const config = await getConfig(currentConfig) || {}

        console.log("Config", config)

        configStore.setTags(config.tags || DEFAULT_TAGS)
        configStore.setRegex(config.regex || DEFAULT_SPLIT_REGEX)
        configStore.setTagRegex(config.tagRegex || DEFAULT_TAG_REGEX)
        configStore.setTagSplit(config.tagSplit || DEFAULT_TAG_SPLIT)
        configStore.setName(config.name || DEFAULT_CONFIG)

        console.log("Init", configStore.tags)
        console.log("Init", configStore.regex)
        console.log("Init", configStore.tagRegex)
        console.log("Init", configStore.tagSplit)
        console.log("Init", configStore.name)
    } catch (err){
        console.error("Error al inicializar")
        console.error(err)
    }
    
}