
const base = process.env.NODE_ENV === 'development' ? 'http://falcondes-app1.sis.personal.net.py:8087' : ''
const url = {
    log: name => `${base}/log/${name}`,
    list: `${base}/logs`
}

const get = (url, text = false) => fetch(url).then ( r => text ? r.text() : r.json() )

export const loadLog = logName => get(url.log(logName), true)
export const list = () => get(url.list)