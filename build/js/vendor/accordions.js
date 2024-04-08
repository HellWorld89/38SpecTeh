export class Accordions{constructor(){this._openHeight=0,this._windowWidth=window.innerWidth,this._documentClickHandler=this._documentClickHandler.bind(this),this._windowResizeHandler=this._windowResizeHandler.bind(this),this._init()}_init(){this.fullUpdate(),document.addEventListener("click",this._documentClickHandler),window.addEventListener("resize",this._windowResizeHandler)}_documentClickHandler(t){const e=t.target;if(!e.closest('[data-accordion="button"]'))return;t.preventDefault();const o=e.closest('[data-accordion="parent"]');if(o.dataset.destroy&&!window.matchMedia(o.dataset.destroy).matches)return;const i=e.closest('[data-accordion="element"]');i.classList.contains("is-active")?this.closeAccordion(i):this.openAccordion(i)}_windowResizeHandler(){this._windowWidth!==window.innerWidth&&(this._windowWidth=window.innerWidth,this.updateAccordionsHeight())}closeAllAccordion(t){t.querySelectorAll('[data-accordion="element"]').forEach((e=>{e.closest('[data-accordion="parent"]')===t&&this.closeAccordion(e)}))}updateAccordionsHeight(t=null){if(t){const e=t.querySelector('[data-accordion="content"]');return e.style.transition="none",e.style.maxHeight=`${e.scrollHeight}px`,void setTimeout((()=>{e.style.transition=null}))}document.querySelectorAll('[data-accordion="element"]:not(.is-active)').forEach((t=>{const e=t.closest('[data-accordion="parent"]'),o=t.querySelector('[data-accordion="content"]');!e.dataset.destroy||window.matchMedia(e.dataset.destroy).matches?o.style.maxHeight=null:o.style.maxHeight="100%"}));document.querySelectorAll('[data-accordion="element"].is-active').forEach((t=>{const e=t.querySelector('[data-accordion="content"]'),o=t.closest('[data-accordion="parent"]');!o.dataset.destroy||window.matchMedia(o.dataset.destroy).matches?(e.style.transition="none",e.style.maxHeight=`${e.scrollHeight}px`,setTimeout((()=>{e.style.transition=null}))):e.style.maxHeight="100%"}))}fullUpdate(t=null,e=!1){let o;o=t?t.querySelectorAll('[data-accordion="element"].is-active'):document.querySelectorAll('[data-accordion="element"].is-active'),o.forEach((t=>{t.querySelector('[data-accordion="parent"]')||this.openAccordion(t,e)})),this.updateAccordionsHeight()}openAccordion(t,e=!0){const o=t.closest('[data-accordion="parent"]'),i=t.querySelector('[data-accordion="content"]');this._openHeight+=i.scrollHeight,o.hasAttribute("data-single")&&this.closeAllAccordion(o),t.classList.add("is-active"),e?i.style.maxHeight=`${this._openHeight}px`:(i.style.transition="none",i.style.maxHeight=`${this._openHeight}px`,setTimeout((()=>{i.style.transition=null}))),o.closest('[data-accordion="element"]')?this.openAccordion(o.closest('[data-accordion="element"]'),e):this._openHeight=0}closeAccordion(t,e=!0){const o=t.querySelector('[data-accordion="content"]');o&&(t.classList.remove("is-active"),e?o.style.maxHeight="0":(o.style.transition="none",o.style.maxHeight="0",setTimeout((()=>{o.style.transition=null}))))}}