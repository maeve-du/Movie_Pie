
const nowShowingMovieList = document.querySelector('.movie-list__now-showing');
const tempBTN = document.querySelector('.tempBtn');
const body = document.querySelector('body')
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');
const noMore = document.querySelector('.no-more');
const movieTop10Row = document.querySelector('.movies-row');
// const movieTop10Ranking = document.querySelector('.movies.ranking')
const today = document.querySelector('span.boxoffic-date');
const movieCardList = document.querySelector('.movie-list__now-showing');
const mainPage = document.querySelector('#main-page')
const DetailsPage = document.querySelector('section.modal')

// const closeModal = document.querySelector('.close-modal img')

// test DOM
// console.log('DOM', closeModal);

const showDetail = () => {
    let { scrollTop } = document.documentElement;
    // console.log('scrollTop:', scrollTop, 'clientHeight: ', clientHeight, 'top+client: ', scrollTop + clientHeight, 'scrollHeight: ', scrollHeight,);
    window.scrollTo(0, 0);
    mainPage.classList.add('d-none');
    DetailsPage.classList.add('d-none');
    DetailsPage.classList.remove('d-none');
}

const hideDetail = () => {
    mainPage.classList.add('d-none');
    mainPage.classList.remove('d-none');
    DetailsPage.classList.add('d-none');
}


const showLoading = () => {
    loader.classList.remove('d-none');
}

const hideLoading = () => {
    loader.classList.add('d-none');
}

const showLoadMore = () => {
    loadMore.classList.remove('d-none');
}
const hideLoadMore = (noMore) => {
    loadMore.classList.add('d-none');
}

const showNoMore = () => {
    loadMore.classList.add('no-more');
    loadMore.textContent = '已经到底了哦...'
}

let movieLists = []


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
        // console.log('loading more while scrolling');
        let start = nowShowingMovieList.childElementCount;
        let end = start + 5;
        // console.log('scroll loaded');
        handelMovieListUI(start, end);
    }

}

loadMore.addEventListener('click', handleLoadMore)

window.addEventListener('scroll', isBottom)
// }



// 2. UI template for now showing list cards
const updateMovieListUI = async (start, end) => {
    const moviedata = await updateMovieList();
    hideLoading();
    movieLists = moviedata;
    const getNextMovies = movieLists.slice(start, end)
    const rateNull = `<p style="font-family: 'Noto Sans SC', sans-serif; font-size: 1rem; font-weight:500; line-height: 1rem">暂无评分</p>`
    getNextMovies.forEach((movie) => {
        let categoryHtmls = ``;
        if (movie.category) {
            if (movie.category.includes('|')) {
                const catgs = movie.category.split("|");
                catgs.forEach(catg => {
                    const html = `<span class="movie-tag">${catg}</span>`;
                    categoryHtmls += html;
                });
            } else {
                categoryHtmls = `<span class="movie-tag">${movie.category}</span>`
            }
        }
        const actorsArray = [];
        if (movie.actors) {
            const actors = [...movie.actors]
            actors.forEach(actor => {
                if (actor.role !== "导演") {
                    actorsArray.push(actor.name)
                }
            });
        }
        const actorLists = actorsArray.join('/')
        // console.log(actorLists)

        // single card UI
        const html = `
            <div class="now-showing_card" movieId=${movie.filmId}>
                <div class="now-showing_poster">
                    <img src="${movie.poster && movie.poster}">
                </div>
                <div class="card__details">
                    <div class="card__top">
                        <h2>${movie.name.length && (movie.name.length > 14 ? movie.name.slice(0, 14) + '...' : movie.name)}</h2>
                        <div class="card__details-rate">
                            <img src="./images/star.svg" alt="">
                            <p>${movie.grade ? movie.grade : rateNull}</p>
                        </div>
                        <span>导演: ${movie.director && movie.director}</span>
                        <span>主演: ${actorLists.length > 14 ? actorLists.slice(0, 16) + '...' : actorLists}</span>
                        <span>上映时间: ${movie.premiereAt && (new Date(movie.premiereAt * 1000).toLocaleDateString("zh-cn"))}</span>
                    </div>
                    <div class="card__details-bottom">
                        <span class="movie-tag tag-important">${movie.item.name && movie.item.name}</span>
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
    updateMovieListUI(start, end);
}


// 1. get api's data
const updateMovieList = async () => {
    data = await getMovie();
    return data;
}


const updateTop10UI = async () => {
    const { top10Movies, poster } = await updateTop10();
    // console.log(top10Movies, poster);
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
        movieTop10Row.innerHTML += html;
    });
    const date = new Date().toLocaleDateString('en-CA', { timeZone: "Asia/Shanghai" });
    today.textContent = date;
}


const updateTop10 = async () => {
    top10Movies = await getTop10();
    poster = await getTop10Poster();

    return { top10Movies, poster }
}


const whenLoaded = () => {
    handelMovieListUI(0, 5);
    updateTop10UI();
}

// 4. load the data when 
if (!nowShowingMovieList.childElementCount) {
    console.log('loaded');
    body.addEventListener('load', whenLoaded());
}


const updateMovieDetailslUI = (data) => {
    showDetail()
    // const movie = await handleCardClick();
    // console.log(movie)
    const movie = data;
    let actorsHtml = ``;
    if (movie.actors) {
        movie.actors.forEach(actor => {
            const actorHtml = `
            <div class="movie__actor">
                <div class="movie__actors-img">
                    <img src="${actor.avatarAddress}" alt="">
                </div>
                <h6>${actor.name}</h6>
             </div>
            `
            actorsHtml += actorHtml
        });
    }


    const html = `
        <div class="movie__details_modal">
            <header class="modual-header">
                <nav>
                    <div class="logo">
                        <img src="./images/play.png" alt="" class="logo-img">
                    </div>
                    <div class="movie__details-page-titl">Movie Details</div>
                    <div id="close-modal">
                        <img src="./images/icons/icon-close.svg" alt="">
                    </div>
                </nav>
            </header>
            <section class="movie__details-header">
                <div class="movie__details-poster"><img src="${movie.poster && movie.poster}" alt=""></div>
                <div class="movie__details-info info-1">
                    <img src="./images/icons/icon-video-pink.svg" alt="">
                    <div class="movie__details-infor-text">
                        <span>Genre</span>
                        <p>${movie.category && movie.category}</p>
                    </div>
                </div>
                <div class="movie__details-info info-2">
                    <img src="./images/icons/icon-time-pink.svg" alt="">
                    <div class="movie__details-infor-text">
                        <span>Duration</span>
                        <p>${movie.runtime && movie.runtime}分钟</p>
                    </div>
                </div>
                <div class="movie__details-info info-3">
                    <img src="./images/icons/icon-star-pink.svg" alt="">
                    <div class="movie__details-infor-text">
                        <span>Rating</span>
                        <p>8.7 / 10</p>
                    </div>
                </div>

            </section>
            <section class="movie__details__content">
                <div class="movie__details__content-title">
                    <h1>${movie.name && movie.name}</h1>
                    <p>上映时间: <span>${movie.premiereAt && (new Date(movie.premiereAt * 1000).toLocaleDateString("zh-cn"))}</span></p>
                    <p>导演: <span>${movie.director && movie.director}</span></p>
                </div>
                <div class="divider"></div>
                <div class="movie__details__content-text">
                    <h2 class="title-before">Synopsis</h2>
                    <p>
                        ${movie.synopsis ? movie.synopsis : "暂无简介"}
                    </p>
                </div>
                <div class="movie__details__content-text">
                    <h2 class="title-before">Starring</h2>
                    <div class="movie__actors-group">
                       ${actorsHtml && actorsHtml}
                    </div>

                </div>
            </section>
        </div>
    `;
    showDetail()
    DetailsPage.innerHTML = html;
    const closeModal = document.querySelector('#close-modal');
    closeModal.addEventListener('click', (e) => {
        hideDetail()
    })

}

const handleCardClick = async (e) => {
    // console.log('cllick card');
    // console.log(e.target);
    const movieId = e.target.offsetParent.getAttribute('movieId');
    const data = await getMovieDetails(movieId)
    updateMovieDetailslUI(data)

}

movieCardList.addEventListener('click', handleCardClick)



