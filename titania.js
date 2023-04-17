/*
	Titania.JS - The multi-faceted & nimble JavaScript library
	Version 2.0.0. - Written by Harvey Coombs
	2016-2023
*/
class Titania {
	constructor (em) {
		if (em instanceof Titania) return em;
		
		this.select = (target=null) => {
			switch (true) {
				case (typeof target === "string"):
					let qsa = em.querySelectorAll(target);
					
					if (qsa && qsa.length) {
						if (qsa.length) return new Titania(qsa[0]);
						
						var list = [];

						qsa.forEach(elem => {
							let selection = new Titania(elem);
							list.push(selection);
						});

						return list;
					} else return null;
				case (target instanceof Node):
					return new Titania(target);
				case (target instanceof Titania):
					return target;
				default:
					return null;
			}
		};
		this.pure = em;
		this.id = em.id;
		this.exists = (em);
		this.tag = em.nodeName.toLowerCase();
		this.height = em.clientHeight;
		this.width = em.clientWidth;
		this.listen = (event, callback) => {
		    em.addEventListener(event, callback);
		};
		this.ignore = (event=null, callback=null) => {
		    if (!event) {
		        let all = getEventListeners(em);
		        
		        all.forEach(ev => {
		            em.removeEventListener(ev);
		        });
		    } else {
				em.removeEventListener(event, callback);
			}
		};
        this.event = (event) => {

        };
		this.focused = em.focusState;
		if (t_isValid(em.getAttribute) && t_isValid(em.setAttribute)) {
			this.drag = em.getAttribute("draggable");
			this.css = em.getAttribute("style");
			this.set = (prop, val) => {
				try {
					em.setAttribute(prop, val);
				} catch {
					throw new TitaniaException(0, "Invalid argument provision", this);
				}
			};
			this.disabled = em.getAttribute("disabled");
			this.attribute = (key, val=null) => {
				if (val && isFunc(em.getAttribute)) {
					em.setAttribute(key, val);
				}
				
				return em.getAttribute(key);
			};
		}
		if (t_isValid(em.classList)) {
			this.classes = Array.from(em.classList);
			this.apply = (classlist) => {
				if (classlist instanceof String) {
					em.classList = classlist;
					return;
				}
	
				classlist.forEach((cl) => {
					if (!em.classList.contains(cl)) {
						em.classList.add(cl);
					}
				});
			};
			this.shift = (classlist) => {
				if (classlist instanceof String) {
					em.classList.remove(classlist);
					return;
				}
	
				classlist.forEach((cl) => {
					if (em.classList.contains(cl)) {
						em.classList.remove(cl);
					}
				});
			};
			this.has = (classes) => {
				if (classes instanceof Array) {
					var out = [];
	
					classes.forEach(cl => {
						let res = em.classList.contains(cl);
						out.push({ class: cl, found: res });
					});
	
					return out;
				} else {
					return (em.classList.contains(classes.toString()));
				}
			};
		}
		this.after = (elem) => {
            (this.pure).insertAfter(elem);
		};
		this.before = (elem) => {
            (this.pure).insertBefore(elem);
		};
        this.prepend = (elem) => {
            let p = (this.pure);

            switch (true) {
                case (elem instanceof Titania):
                    p.prepend(elem.pure);
                    break;
                case (elem instanceof Node):
                    p.prepend(elem);
                    break;
                case (typeof elem == "string"):
                    p.innerHTML = elem + p.innerHTML;
                    break;
            }
        };
        this.append = (elem) => {
            let p = (this.pure);

            switch (true) {
                case (elem instanceof Titania):
                    p.append(elem.pure);
                    break;
                case (elem instanceof Node):
                    p.append(elem);
                    break;
                case (typeof elem == "string"):
                    p.innerHTML += elem;
                    break;
            }
        };
		this.dupe = () => {
			let copy = document.createElement(this.tag);
			copy.outerHTML = node.outerHTML;
			return copy;
		};
		this.around = (html) => {
			(this.pure).outerHTML = html.replace(/{}/g, (this.pure).outerHTML);
		}
		this.search = (subject) => {
			let ca = Array.from(this.children);

			switch (true) {
				case (subject instanceof Titania):
					return ca.includes(subject);
				case (subject instanceof Node):
					return ca.includes(new Titania());
				default:
					var res = false;
					for (var h = 0; !res; h++) {
						res = (ca[h].value.includes(subject.toString()) || ca[h].textContent.includes(subject.toString()));
					}
					return res;
			}
		};
		this.delete = () => {
		    (this.pure).remove();
		};

		this.empty = (excludes=[]) => {
		    excludes = excludes.map((e) => { return new Titania(e); });

		    (this.children).forEach((ch) => {
				if (excludes.indexOf(ch) == -1) {
					ch.delete();
				}
		    });
		};		
	}

	get origin() {
		let target = (this.pure).parentNode;
		var all = [];

		while (target.parentNode) {
			all.push(new Titania(target));
			target = target.parentNode;
		}

		return all;
	}

	get parent() {
		return new Titania((this.pure).parentNode);
	}

	get children() {
		var allc = [];
		((this.pure).children).forEach((ch) => {
			allc.push(new Titania(ch));
		});

		return allc;
	}

	get html() {
		return (this.pure).innerHTML;
	} set html(content) {
		(this.pure).innerHTML = content;
	}

	get value() {
		return (this.pure).value;
	} set value(content) {
		(this.pure).value = content;
	}

	get text() {
		return (this.pure).innerText;
	} set text(content) {
		(this.pure).innerText = content;
	}
}

class Session {
	static define(key, val) {
		sessionStorage.setItem(key, val);
		Object.defineProperty(session, key, {
			value: val,
			write: true
		});
	}

	static remove(key="") {
		let all = Object.keys(this);

		if (all.find(key)) {
			sessionStorage.removeItem(key);
			//delete key;
		}

		return all.find(key);
	}

    static get keys() {
        return Object.keys(sessionStorage);
    }

    static get length() {
        return sessionStorage.length;
    }
}

class Calc {
	static ulate(expr) {
		let regex = new RegExp('^[^a-z$#£@&_~;]*$');
		let safe = regex.test(expr.toLowerCase());

		return (safe ? eval(expr) : null);
	}

	static power(subject, index) {
		let final = 1;

		for (var e = 0; e < index; e++) {
			final = (final * subject);
		}

		return final;
	}
};

class To {
	static JSON = JSON.parse;

	static string(subject) {
        switch (typeof subject) {
            case "object":
                return JSON.stringify(subject);

            case "string":
                return subject;

            default:
                return subject.toString();
        }
	}

	static int = parseInt;
	static float = parseFloat;
}

class HTTP {
	static post(target) {
		let postr = new XMLHttpRequest();
		
		postr.open("POST", target, false);
		postr.setRequestHeader("Access-Control-Allow-Origin", "*");
		postr.send();
		
		return {
			body: postr.responseText,
			status: postr.status
		};		
	}

	static get(target) {
		let getr = new XMLHttpRequest();
		
		getr.open("GET", target, false);
		getr.setRequestHeader("Access-Control-Allow-Origin", "*");
		getr.send();

		return {
			body: getr.responseText,
			status: getr.status
		};
	}
}

class TitaniaException {
	constructor (code, body, culprit) {
		this.code = code;
		this.body = body;
		this.culprit = culprit;
	}
}

Object.defineProperty(Array.prototype, 'fuse', {
	value: (source=[]) => {
		let target = this;

		if (source instanceof Array) {
			source.forEach(s => {
				target.push(s);
			});
		} else {
			source = source.toString();
			target.push(source);
		}

		return target;
	}
}); 

Object.defineProperty(Array.prototype, 'compare', {
	value: (subject=[]) => {
		let target = this;

		var total = 0;
		let matches  = [];

		target.forEach(val => {
			for (var x = 0; x < subject.length; x++) {
				if (val == subject[x]) {
					matches.push(subject[x]);
					total++;
				}
			}
		});

		return matches;
	}
});

const DOM = new Titania(document);
const _ = DOM.select;

function t_isValid(fn) {
	return (fn != undefined);
}
