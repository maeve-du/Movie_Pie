
const nowShowingMovieList = document.querySelector('.movie-list__now-showing');
const tempBTN = document.querySelector('.tempBtn');
const body = document.querySelector('body')
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');
const noMore = document.querySelector('.no-more');

const showLoading = () => {
    loader.classList.remove('d-none')
}

const hideLoading = () => {
    loader.classList.add('d-none')
}

const showLoadMore = () => {
    loadMore.classList.remove('d-none')
}
const hideLoadMore = () => {
    loadMore.classList.add('d-none')
}

let movieLists = []



let { scrollTop, scrollHeight, clientHeight } = document.documentElement;

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

    (clientHeight + scrollTop >= scrollHeight - 50 && nowShowingMovieList.childElementCount < movieLists.length) ?
        showLoadMore() : noMore.classList.remove('d-none')
}

const handleLoadMore = () => {
    hideLoadMore()
    if (nowShowingMovieList.childElementCount < movieLists.length) {
        console.log('loading more while scrolling');
        let start = nowShowingMovieList.childElementCount;
        let end = start + 5;
        console.log('scroll loaded');
        handelMovieListUI(start, end)
    }

}

loadMore.addEventListener('click', handleLoadMore)


// const handleScrolling = () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     if (clientHeight + scrollTop >= scrollHeight - 50) {
//         isBottom = true;
//         console.log('to bottom')
//     }

window.addEventListener('scroll', isBottom)
// }


// let scroll = 0;
// const scrollingAndUpdata = () => {
//     handleScrolling()
//     if (nowShowingMovieList.childElementCount) {
//         // console.log('nowShowingMovieList.childElementCount');

//         const moviedata = updateMovieList().then((data) => {
//             if (data) {
//                 const dataLength = data.films.length;
//                 // console.log('moviedata', dataLength);


//                 console.log('next data');
//             }
//         })

//     }

// }





// 2. UI template for now showing list cards
const updateMovieListUI = async (start, end) => {
    const moviedata = await updateMovieList();
    hideLoading()
    movieLists = moviedata.films;
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
        // console.log('scrollTop:', scrollTop, 'clientHeight: ', clientHeight, 'top+client: ', scrollTop + clientHeight, 'scrollHeight: ', scrollHeight,);
        if (nowShowingMovieList.childElementCount > 5) {
            document.documentElement.scrollBy(0, clientHeight / 3)
            hideLoadMore()
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

// 4. load the data when 
if (!nowShowingMovieList.childElementCount) {
    console.log('loaded')
    body.addEventListener('load', handelMovieListUI(0, 5))
}



