import { Socket } from "phoenix"

const socket = new Socket("/socket", {params: {token: window.__discuss__.token}})

socket.connect()

const createSocket = (topicId) => {
  const channel = socket.channel(`comments:${topicId}`, {})
  channel
    .join()
    .receive("ok", resp => renderComments(resp.comments))
    .receive("error", resp => { console.log("Unable to join", resp) })


  channel.on(`comments:${topicId}:new`, renderComment);

  document.querySelector('button').addEventListener('click', () => {
    const input = document.querySelector('textarea');
    const content = input.value;

    channel.push('comment:add', { content });

    input.value = "";
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

const commentTemplate = ({content, user}) => {
  const email = user ? user.email : 'Anonymous';
  return `
    <li class="collection-item">
      ${content}
      <div class="secondary-content">
        ${email}
      </div>
    </li>
  `;
};

window.__discuss__ = Object.assign({}, window.__discuss__, {
  createSocket
});