class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }
  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outherHTML.trim();
  }
  text(text) {
    if (typeof text !== "undefined") {
      this.$el.textContent = text;
      return this;
    } else {
      if (this.$el.tagName.toLowerCase() === "input") {
        return this.$el.value.trim();
      }
      return this.$el.textContent.trim();
    }
  }
  clear() {
    this.html("");
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCords() {
    return this.$el.getBoundingClientRect();
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => (this.$el.style[key] = styles[key]));
  }
  getStyles (style = []){ 
    return style.reduce((res,s)=> {
      res[s] =this.$el.style[s]
      return res
    },{})
  }
  focus() {
    this.$el.focus();
    return this;
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className);
    return this
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(":");
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }
  attr(name,value){ 
    if(value !== "undefined"){ 
      this.$el.setAttribute (name,value)
      return this
    }
    return this.$el.getAttribute(name)
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagname, classes = "") => {
  const el = document.createElement(tagname);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
