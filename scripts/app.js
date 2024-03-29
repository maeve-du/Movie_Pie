
const nowShowingMovieList = document.querySelector('.movie-list__now-showing');
const tempBTN = document.querySelector('.tempBtn');
const body = document.querySelector('body')
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');
const noMore = document.querySelector('.no-more');
const movieTop10Row = document.querySelector('.movies-row')
// const movieTop10Ranking = document.querySelector('.movies.ranking')
const today = document.querySelector('span.boxoffic-date')

const showLoading = () => {
    loader.classList.remove('d-none')
}

const hideLoading = () => {
    loader.classList.add('d-none')
}

const showLoadMore = () => {
    loadMore.classList.remove('d-none')
}
const hideLoadMore = (noMore) => {
    loadMore.classList.add('d-none')
}

const showNoMore = () => {
    loadMore.classList.add('no-more');
    loadMore.textContent = '已经到底了哦...'
}

let movieLists = []





// const handelScrolling = () => {


//     if (nowShowingMovieList.childElementCount) {
//         const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//         // console.log('scrollTop:', scrollTop, 'clientHeight: ', clientHeight, 'top+client: ', scrollTop + clientHeight, 'scrollHeight: ', scrollHeight,);
//         // scrollTop 滚动了的距离 = 已滚动内容超出顶部的距离，例如替停留在顶部初始位置，没有任何滚动，此时就是0）
//         // scrollHeight 滚动内容的全部高度
//         // clientHeight 当前的窗口高度
//         if (nowShowingMovieList.childElementCount < movieLists.length) {
//             isBottom = true;
//             if (clientHeight + scrollTop >= scrollHeight - 50) {
//                 console.log('loading more while scrolling');
//                 let start = nowShowingMovieList.childElementCount;
//                 let end = start + 5;
//                 console.log('scroll loaded');
//                 handelMovieListUI(start, end)
//             }
//         }
//     }


// }

const isBottom = () => {
    let { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // console.log(scrollTop + clientHeight, '', scrollHeight - 10);
    // console.log(scrollTop + clientHeight > scrollHeight - 200);
    // console.log(clientHeight, scrollTop, scrollHeight, nowShowingMovieList.childElementCount);
    (nowShowingMovieList.childElementCount < movieLists.length) ?
        showLoadMore() : showNoMore();

}

const handleLoadMore = () => {
    if (nowShowingMovieList.childElementCount < movieLists.length) {
        console.log('loading more while scrolling');
        let start = nowShowingMovieList.childElementCount;
        let end = start + 5;
        console.log('scroll loaded');
        handelMovieListUI(start, end)
    }

}

loadMore.addEventListener('click', handleLoadMore)

window.addEventListener('scroll', isBottom)
// }



// 2. UI template for now showing list cards
const updateMovieListUI = async (start, end) => {
    const moviedata = await updateMovieList();
    hideLoading()
    movieLists = moviedata;
    const getNextMovies = movieLists.slice(start, end)
    const rateNull = `<p style="font-family: 'Noto Sans SC', sans-serif; font-size: 1rem; font-weight:500; line-height: 1rem">暂无评分</p>`
    getNextMovies.forEach((movie) => {
        let categoryHtmls = ``;
        if (movie.category) {
            if (movie.category.includes('|')) {
                const catgs = movie.category.split("|");
                catgs.forEach(catg => {
                    const html = `<span class="movie-tag">${catg}</span>`
                    categoryHtmls += html

                });
            } else {
                categoryHtmls = `<span class="movie-tag">${movie.category}</span>`
            }
        }

        // single card UI
        const html = `
            <div class="now-showing_card">
                <div class="now-showing_poster">
                    <img src="${movie.poster}">
                </div>
                <div class="card__details">
                    <div class="card__top">
                        <h2>${movie.name.length > 14 ? movie.name.slice(0, 14) + '...' : movie.name}</h2>
                        <div class="card__details-rate">
                            <img src="./images/star.svg" alt="">
                            <p>${movie.grade ? movie.grade : rateNull}</p>
                        </div>
                        <span>上映时间: ${new Date(movie.premiereAt * 1000).toLocaleDateString("zh-cn")}</span>
                    </div>
                    <div class="card__details-bottom">
                        <span class="movie-tag tag-important">${movie.item.name}</span>
                        <div class="movie-tag-group">
                            ${categoryHtmls}
                        </div>
                       
                    </div>
                </div>
            </div>
    `
        nowShowingMovieList.innerHTML += html
        let { clientHeight } = document.documentElement;
        // console.log('scrollTop:', scrollTop, 'clientHeight: ', clientHeight, 'top+client: ', scrollTop + clientHeight, 'scrollHeight: ', scrollHeight,);
        if (nowShowingMovieList.childElementCount > 5) {
            document.documentElement.scrollBy(0, clientHeight / 3)
        }

    });
}

// 3. loading then show the list 
const handelMovieListUI = (start, end) => {
    showLoading();
    updateMovieListUI(start, end)
}


// 1. get api's data
const updateMovieList = async () => {
    data = await getMovie();
    return data
}


const updateTop10UI = async () => {
    const { top10Movies, poster } = await updateTop10();
    console.log(top10Movies, poster);
    html = ``;

    top10Movies.forEach((movie, index) => {
        html = `
            <div class="movies">
                <span class="ranking">${index + 1}</span>
                <span class="box-office-total">${movie.salesInWanDesc + "万"}</span>
                <div class="movie-col">
                    <div class="movie-col-img">
                        <img src="${poster[index]}" alt="">
                    </div>
                    <span class="col_title">${movie.name && movie.name.slice(0, 5) + '...'}</span>
                </div>
            </div>
    `
        movieTop10Row.innerHTML += html
    });
    const date = new Date().toLocaleDateString('en-CA', { timeZone: "Asia/Shanghai" });
    today.textContent = date
}


const updateTop10 = async () => {
    top10Movies = await getTop10();
    poster = await getTop10Poster();

    return { top10Movies, poster }
}


const whenLoaded = () => {
    handelMovieListUI(0, 5);
    updateTop10UI()
}

// 4. load the data when 
if (!nowShowingMovieList.childElementCount) {
    console.log('loaded')
    body.addEventListener('load', whenLoaded())
}

// get top 10





