# Ekaterinburg Map

3D map for Ekaterinburg urbanists. Buildings data, walking routes, cultural heritage sites and more.

**[map.ekaterinburg.city](https://map.ekaterinburg.city/)**

<img src="https://github.com/ekaterinburgdev/map/assets/22644149/bae75345-f76b-4598-b862-683a2eee545e" alt="" width="65%">

## About

> 🚧 This is a technical release for collecting feedback, not an analysis tool

The map contains layers of data about objects in the city so that urbanists can easily access them to work with them.

### Features

- Speed and performance with [Maplibre GL](https://github.com/maplibre/maplibre-gl-js) and [React-mapbox-gl](https://github.com/alex3165/react-mapbox-gl)
- Visualization for [Ekaterinburg opendata](https://github.com/ekaterinburgdev/map-api)
- Detailed object cards

## Map data

### GeoJSON

| Data layer                              | Download                 | Sources | Autoupdate | Status |
|-----------------------------------------|--------------------------|---------|--------|------------|
| Cultural heritage sites (objects)       | ⬇️ [okn‑objects](https://github.com/ekaterinburgdev/map/blob/main/public/ekb-okn-objects.json) | [okn.midural.ru](https://okn.midural.ru/karta-obektov-kulturnogo-naslediya-sverdlovskoy-oblasti.html) | — | 🚧 |
| Cultural heritage sites (protect zone)  | ⬇️ [okn‑protect](https://github.com/ekaterinburgdev/map/blob/main/public/ekb-okn-protect.json) | [okn.midural.ru](https://okn.midural.ru/karta-obektov-kulturnogo-naslediya-sverdlovskoy-oblasti.html) | — | 🚧 |
| Cultural heritage sites (security zone) | ⬇️ [okn‑security](https://github.com/ekaterinburgdev/map/blob/main/public/ekb-okn-security.json) | [okn.midural.ru](https://okn.midural.ru/karta-obektov-kulturnogo-naslediya-sverdlovskoy-oblasti.html) | — | 🚧 |
| Design code objects                     | ⬇️ [design‑code](https://github.com/ekaterinburgdev/map/blob/main/public/ekb-design-code.json) | [map.ekaterinburg.design](https://map.ekaterinburg.design) | 🔄 | ✅ |
| Traffic collision                       | ⬇️ [dtp](https://github.com/ekaterinburgdev/map/blob/main/public/ekb-dtp.json) | [dtp-stat.ru](https://dtp-stat.ru) | 🔄 | ✅ | 
| Touristic route (points)                | ⬇️ [color-points](https://github.com/ekaterinburgdev/map/blob/main/public/ekb-color-points.json)       | [tourism.ekburg.ru](http://tourism.ekburg.ru) | — | ✅ |
| Touristic route (lines)                 | ⬇️ [color-lines](https://github.com/ekaterinburgdev/map/blob/main/public/ekb-color-lines.json)     | [ekbredline.ru](http://ekbredline.ru) | — | ✅ |
| Houses data                             | _Not available for download now.<br />We use [these recommendations](https://github.com/kachkaev/tooling-for-how-old-is-this-house#tooling-for-how-old-is-thishouse)_ | [openstreetmap.org](https://www.openstreetmap.org/)<br />[how-old-is-this.house](https://how-old-is-this.house/)<br />[mingkh.ru](https://mingkh.ru/)<br />[domaekb.ru](https://domaekb.ru) | — | 🚧 |

- ✅ — Verified source
- 🚧 — Under construction. Contains inaccuracies, be careful!
- 🔄 — [Autoupdate from sources](https://github.com/ekaterinburgdev/map-updater) (**now disabled**)

### Objects data
> API is unstable. We **do not recommend** using it in your projects.

We use API **[map-api.ekaterinburg.io](https://github.com/ekaterinburgdev/map-api)** to display detailed information about map objects.


## Development

1. Install [Node.js](https://nodejs.org/en/download/) and [pnpm](https://www.npmjs.com/package/pnpm#user-content-usage)

2. Install dependencies

```
pnpm i
```

3. Run local server

```
pnpm dev
```
