function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: id, name: "Alice" });
        }, 1000);
    });
}

function getPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Post 1", "Post 2", "Post 3"]);
        }, 1000);
    });
}

function getComments(postTitle) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                `Nice post: "${postTitle}"`,
                `Great read: "${postTitle}"`,
            ]);
        }, 1000);
    });
}

getUser(1)
    .then((user) => getPosts(user.id)) // return the promise, don't nest .then() inside
    .then((posts) => getComments(posts[0])) // grab first post here
    .then((comments) => console.log(comments))
    .catch((err) => console.error(err));
