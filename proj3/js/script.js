const postForm = document.getElementById('post-form');
const postContainer = document.getElementById('post-container');

let posts = [];

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const category = document.getElementById('post-category').value;

    const newPost = { title, content, category, comments: [] };
    posts.push(newPost);
    renderPosts();
    postForm.reset();
});

function renderPosts(filterCategory = '') {
    postContainer.innerHTML = '';
    posts
        .filter(post => !filterCategory || post.category === filterCategory)
        .forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <span class="post-category">Category: ${post.category}</span>
                <div class="post-comments">
                    <h4>Comments</h4>
                    <div>${post.comments.map(comment => `<p class="comment">${comment}</p>`).join('')}</div>
                    <input type="text" placeholder="Add a comment" onkeypress="addComment(event, ${index})">
                </div>
            `;

            postContainer.appendChild(postElement);
        });
}

function filterPosts(category) {
    renderPosts(category);
}

function addComment(event, postIndex) {
    if (event.key === 'Enter') {
        const comment = event.target.value;
        posts[postIndex].comments.push(comment);
        renderPosts();
    }
}
