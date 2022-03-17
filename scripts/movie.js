
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

// getMovie()

// getTop10Poster()


const getMovieDetails = async (id) => {
    const config = {
        method: 'GET',
        headers: {
            'X-Host': 'mall.film-ticket.film.info',
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16447321645344640123273217","bc":"440300"}'

        }
    }
    const baseUrl = 'https://m.maizuo.com/gateway?k=7849534&';
    const movieId = `filmId=${id}`
    const res = await fetch(baseUrl + movieId, config);
    const movieDetailData = await res.json()
    const data = await movieDetailData.data.film
    return data
}


// details
// actors: (5) [{…}, {…}, {…}, {…}, {…}]
// category: "剧情|爱情"
// director: "张善南"
// filmId: 5900
// filmType: {name: '2D', value: 1}
// isPresale: false
// isSale: true
// item: {name: '2D', type: 1}
// language: ""
// name: "年少有你"
// nation: "中国大陆"
// photos: (5) ['https://pic.maizuo.com/usr/2022/3e9f8791cda0330e679db825cf61098e.jpg', 'https://pic.maizuo.com/usr/2022/5742f5413f771c4c846a080957453bb7.jpg', 'https://pic.maizuo.com/usr/2022/67e8fc859bf8aa8fa0c18d629b7cea11.jpg', 'https://pic.maizuo.com/usr/2022/9fdd67a790208dccd420c13268665795.jpg', 'https://pic.maizuo.com/usr/2022/f1c93a3f75d61314d6ba91bfcbd9880f.jpg']
// poster: "https://pic.maizuo.com/usr/movie/f384093d780553b993184f782526962c.jpg"
// premiereAt: 1647561600
// runtime: 96
// synopsis: "墨彩宁（张善南 饰）是一名普通的高中学生，因为班主任（王天宇 饰）就是自家小姨，所以自己的一举一动都逃不过小姨的法眼，平日只好伪装成乖乖学生，但本质上却是一个不折不扣的追星达人。转校生顾天琦（李明源 饰）的到来让她本来平静的生活发生了巨大转变，她发现这位引人注目的同桌竟是偶像顾云凡（区天瑞 饰）的亲弟弟，在顾天琦的嘱咐下，墨彩宁答应保守住这个秘密。可特殊身份的消息还是不胫而走，也因此与闺蜜张公主（郭素洁 饰）产生了误会，为了能让张公主不再难过、顾天琦不再转学，墨彩宁与同学袁迟（范云飞 饰）、同学童辉（李炎峰 饰）等人团结一心解决了困扰。在相处中，墨彩宁决心要成为像顾天琦一样优秀的人。转眼到了寒假，在盛大的烟花下大家树立了各自的人生目标，带着珍贵的友谊走向憧憬的未来……"
// timeType: 3
// videoId: ""