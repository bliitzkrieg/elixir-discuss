import { Socket } from "phoenix"

const socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

const createSocket = (topicId) => {
  const channel = socket.channel(`comments:${topicId}`, {})
  channel
    .join()
    .receive("ok", resp => renderComments(resp.comments))
    .receive("error", resp => { console.log("Unable to join", resp) })


  channel.on(`comments:${topicId}:new`, renderComment);

  document.querySelector('button').addEventListener('click', () => {
    const content = document.querySelector('textarea').value;

    channel.push('comment:add', { content });
  });
}

const renderComments = comments => {
  const renderedComments = comments
    .map(comment => commentTemplate(comment));
  document.querySelector('.collection').innerHTML = renderedComments.join('');
}

const renderComment = ({comment}) => {
  const renderedComment = commentTemplate(comment);
  document.querySelector('.collection').innerHTML += renderedComment;
};

const commentTemplate = comment => {
  return `
    <li class="collection-item">
      ${comment.content}
    </li>
  `;
};

window.__discuss__ = Object.assign({}, window.__discuss__, {
  createSocket
});