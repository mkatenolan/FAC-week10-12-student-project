

const cookieHandler = (id) => {

    document.cookie.includes(`recipe${id}=true`) ? document.cookie = `${id}=false` : document.cookie = `${id}=true`

}
