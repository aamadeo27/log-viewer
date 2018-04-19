
const base = process.env.NODE_ENV === 'development' ? 'http://10.150.55.146:8087' : ''
const url = {
    log: name => `${base}/log/${name}`,
    list: `${base}/logs`
}

const get = (url, text = false) => fetch(url).then ( r => text ? r.text() : r.json() )

export const loadLog = logName => get(url.log(logName), true)
export const list = () => get(url.list)