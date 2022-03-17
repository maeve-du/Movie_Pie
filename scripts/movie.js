
// const getMovie = async () => {
//     const baseUrl = 'http://localhost:3000/data';
//     const res = await fetch(baseUrl)
//     return data = res.json()

// }



// const url = 'https://prowechat.maoyan.com/api/movie/miniProgram/detail/movieBox.json?movieId=341955&openId=ozg8Y0eNZJOmt65C0-HpayiCt-mA'
const getTop10 = async () => {
    const date = new Date().toLocaleDateString('en-CA', { timeZone: "Asia/Shanghai" });
    // const url = 'https://movie.maipiaomao.com/getDayData?withSvcFee=true&dateType=0&date=2022-03-17'
    // const baseUrl = 'https://movie.maipiaomao.com/getDayData?withSvcFee=true&dateType=0&'
    const boxOfficDate = `date=${date}`
    console.log(baseUrl + date)
    const config = {
        method: 'GET',
    }
    const res = await fetch(baseUrl + boxOfficDate);
    const data = await res.json()
    if (data) {
        const top10MoviesData = data.list.slice(0, 10)
        // console.log(top10MoviesData, '111')
        return top10MoviesData
    }
}


// {
//     "code": "00100062022",
//     "name": "长津湖之水门桥",
//     "onlineSalesRateDesc": "--",
//     "releaseDays": 45,
//     "salesInWanDesc": "212.60", //今日票房
//     "salesRateDesc": "44.30%", //票房占比
//     "seatRateDesc": "8.05%", //上座率
//     "sessionRateDesc": "18.23%", //拍片占比
//     "splitOnlineSalesRateDesc": "--",
//     "splitSalesInWanDesc": "210.42",
//     "splitSalesRateDesc": "46.89%",
//     "sumSalesDesc": "40.11亿", //总票房
//     "sumSplitSalesDesc": "37.06亿" 
// },

// getTop10()

const getTop10Poster = async () => {

    const top10 = await getTop10();
    // console.log('@@@', top10);
    const movies = await getMovie()
    // console.log('@@@@', movies);
    const top10Posters = new Array;
    top10.forEach(m => {
        top10Posters.push('images/poster-default.png')
        movies.forEach(movie => {
            if (movie.name === m.name) {
                top10Posters.pop('Movie_Pie/images/poster-default.png')
                top10Posters.push(movie.poster)
            }
        });
    })
    // console.log(top10Posters)
    return top10Posters;
}



const getMovie = async (movieIds) => {
    const config = {
        method: 'GET',
        headers: {
            'X-Host': 'mall.film-ticket.film.list',
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16447321645344640123273217","bc":"440300"}'

        }
    }
    const res = await fetch('https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=30&type=1&k=9380130', config);
    const movieData = await res.json()
    const data = await movieData.data.films
    // console.log(data)
    return data
}

getMovie()

getTop10Poster()



// const getTop10 = async () => {
//     const baseUrl = 'http://localhost:3000/data';
//     const res = await fetch(baseUrl);
//     const top10data = res.json();
//     console.log(top10data);
//     return top10data;

// }
