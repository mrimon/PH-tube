console.log('index is connected');
function removeActiveClass() {
    const activeBtns = document.getElementsByClassName('active');
    // console.log(activeBtns);
    for (let btn of activeBtns) {
        btn.classList.remove('active');
        // btn.classList.add('bg-slate-50')
    }
}

// category section 
function loadCategories() {
    // 1-fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        // 2-convert promise to json 
        .then(res => res.json())
        // 3-send data to display categories
        .then(data => displayCategories(data.categories))
}

// videos section
function loadVideos(searchText = "") {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const btnAll = document.getElementById('btn-all');
            btnAll.classList.add('active')
            displayVideos(data.videos)
        })
}
// category wise videos
const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedBtn = document.getElementById(`btn-${id}`);
            clickedBtn.classList.add('active');
            // clickedBtn.classList.remove('bg-slate-50');
            displayVideos(data.category)
        })

}

// video details
const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))
}
const displayVideoDetails = (video) => {
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <h2 class="text-lg font-semibold flex gap-3 items-center"> <img class="w-10 rounded" src="${video.authors[0].profile_picture}" /> ${video.authors[0].profile_name}</h2>
  </div>
</div>
    `;
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }

function displayCategories(categories) {
    // get category container 
    const categoryContainer = document.getElementById('category-container');
    // loop operation on Array of Object
    for (const cat of categories) {
        //create element 
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm bg-slate-50 hover:bg-red-600 hover:text-white">${cat.category}</button>
        `
        // append child to container
        categoryContainer.appendChild(categoryDiv);
    }
};
// {
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    if (videos.length === 0) {
        videoContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center text-center  col-span-full py-[100px]">
                <img src="assets/Icon.png" alt="">
                <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h1>
            </div>
        `
        return;
    }
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
                <div class="card bg-base-100 ">
                    <figure class="relative">
                        <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                        <span class="text-sm bg-black p-2 absolute text-white rounded bottom-2 right-2">3hrs 56 min
                            ago</span>
                    </figure>
                    <div class="flex gap-3 py-5 px-0">
                        <div class="profile">
                            <div class="avatar">
                                <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                    <img src="${video.authors[0].profile_picture}" />
                                </div>
                            </div>
                        </div>
                        <div class="intro">
                            <h1 class="font-bold">${video.title}</h1>
                            <p class="text-sm text-gray-600 flex gap-2">${video.authors[0].profile_name}
                            ${video.authors[0].verified === true? `<img class="w-5"
                                    src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">`: ``}</p>
                            <p class="text-sm text-gray-600">${video.others.views} views</p>
                        </div>
                    </div>
                    <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
                </div>
        `;
        videoContainer.appendChild(videoCard)
    });
}
document.getElementById('searchId').addEventListener('keyup', (e) => {
    loadVideos(e.target.value);
})
loadCategories();

