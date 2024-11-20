export const renderPopupComments = (photo) => {
  const commentsList = document.querySelector('.social__comments');
  const commentCount = document.querySelector('.social__comment-count');
  const loadMoreButton = document.querySelector('.comments-loader');

  commentsList.textContent = '';
  let displayedComments = 0;

  const renderCommentsBatch = () => {
    const nextCommentsBatch = photo.comments.slice(displayedComments, displayedComments + 5);
    displayedComments += nextCommentsBatch.length;

    nextCommentsBatch.forEach(({ avatar, name, message }) => {
      const commentItem = document.createElement('li');
      commentItem.classList.add('social__comment');

      const commentAvatar = document.createElement('img');
      commentAvatar.classList.add('social__picture');
      commentAvatar.src = avatar;
      commentAvatar.alt = name;
      commentAvatar.width = 35;
      commentAvatar.height = 35;

      const commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = message;

      commentItem.append(commentAvatar, commentText);
      commentsList.append(commentItem);

      if (displayedComments >= photo.comments.length) {
        loadMoreButton.classList.add('hidden');
      } else {
        loadMoreButton.classList.remove('hidden');
      }
    });

    const currentCount = Math.min(displayedComments, photo.comments.length);
    commentCount.firstChild.textContent = `${currentCount} из `;
  };

  loadMoreButton.addEventListener('click', renderCommentsBatch);
  renderCommentsBatch();
};
