function prepareUrl(url, ...args) {
    let i = 0

    return (
        document.location.origin +
        '/' +
        url.replace(/%/g, () => encodeURIComponent(args[i++]))
    )
}

export default prepareUrl
