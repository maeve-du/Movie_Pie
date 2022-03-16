
const getMovie = async () => {
    const baseUrl = 'http://localhost:3000/data';
    const res = await fetch(baseUrl)
    return data = res.json()

}

