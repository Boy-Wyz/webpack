import _ from 'lodash';
// import './style/style.css';
import './style/a.scss';

function createDomElement() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  // dom.className = 'hello';
  dom.classList.add('box');
  return dom;
}
document.body.appendChild(createDomElement());
