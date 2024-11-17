export const renderPopupComments = (photo) => {
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';

  photo.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = '35';
    commentAvatar.height = '35';

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentItem.append(commentAvatar, commentText);
    commentsList.append(commentItem);
  });
};
