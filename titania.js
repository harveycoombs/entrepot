/*
	Titania.JS		The multi-faceted & nimble JavaScript library
	Version 2.0.0.	Written by Harvey Coombs
	2016-2022		http://titania-js.org/
*/
class DOM {
	static select(selector=null) {
	    let qsa = document.querySelectorAll(selector);
	    
	    if (qsa != null && qsa != undefined && qsa.length > 0) {
    	    if (qsa.length == 1) {
        		let qs = document.querySelector(selector);
    			let selection = new Titania(qs);

    			return selection;
    	    } else {
    	        var list = [];
    	        
    	        qsa.forEach(elem => {
        			let selection = new Titania(elem);
        			list.push(selection);
    	        });
    	        
    	        return list;
    	    }
	    } else {
	        return null;
	    }
	}

	static pure = document;
	static html = document.querySelector("html").innerHTML;
	static listen = function (event, callback) {
		document.addEventListener(event, callback);
	}

	static ignore(event, callback) {
		if (event == null) {
			var all = getEventListeners(document);
			
			all.forEach(ev => {
				document.removeEventListener(ev);
			});
		} else {
			document.removeEventListener(event, callback);
		}
	}

	static draggable(allow) {
		document.querySelectorAll("img").forEach((im) => {
			im.setAttribute("draggable", allow);
		});
	}

	static create(type="element", content) {
		switch (type.toLowerCase()) {
			case "style":
				var css = content.toString();

				var inline = document.createElement("style");
				inline.innerText = css;

				(document.body).append(inline);
				return inline;
				
			case "element":
				try {
					if (typeof content === "object") {
						var creation = document.createElement(content.tag);
							creation.classList = content.classes;
							creation.id = content.id;

						return creation;
					} else {
						return document.createElement(content.toString());
					}
				} catch {
					throw new TitaniaException(0, "Unable to create element; Please check your arguments are formatted correctly\n(i.e. '{ tag: \"Tag name\", classes: \"Class list\", id: \"The ID\" })'", this);
				}
		}
	}
	
	static print(items) {
		document.write(items.toString());
	}
};

class Nav {
	static copy(text="") {
		navigator.clipboard.writeText(text);
		return (text.length > 0);
	}

	static paste(target) {
		navigator.clipboard.readText().then((rt) => {
			(target.pure).innerText += rt;
		}).catch((er) => {
			throw new TitaniaException(0, "Unable to paste from clipboard'", this);
		});
	}

	static clipboard = navigator.clipboard;
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
		var all = Object.keys(this);

		if (all.find(key) != undefined) {
			sessionStorage.removeItem(key);
			//delete key;
		}

		return (all.find(key) != undefined);
	}
}

class Calc {
	static ulate(expr) {
		var regex = new RegExp('^[^a-z$#£@&_~;]*$');
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

class Titania {
	constructor (em) {
		this.pure = em;
		this.id = em.id;
		this.tag = em.nodeName.toLowerCase();
		this.height = em.clientHeight;
		this.width = em.clientWidth;
		this.classes = em.classList;
		this.listen = function (event, callback) {
		    em.addEventListener(event, callback);
		};
		this.ignore = function (event=null, callback=null) {
		    if (event == null) {
		        var all = getEventListeners(em);
		        
		        all.forEach(ev => {
		            em.removeEventListener(ev);
		        });
		    } else {
				em.removeEventListener(event, callback);
			}
		};
		this.focused = em.focusState;
		this.drag = em.getAttribute("draggable");
		this.css = em.getAttribute("style");
		this.set = function (prop, val) {
			try {
				em.setAttribute(prop, val);
			} catch {
				throw new TitaniaException(0, "Invalid argument provision", this);
			}
		};
		this.apply = function (classlist) {
			var list = (classlist instanceof Array) ? classlist : ((classlist.indexOf(",") != -1) ? classlist.split(",") : [classlist]);

			list.forEach((cl) => {
				if (!em.classList.contains(cl)) {
					em.classList.add(cl);
				}
			});
		};
		this.shift = function (classlist) {
			var list = (classlist instanceof Array) ? classlist : ((classlist.indexOf(",") != -1) ? classlist.split(",") : [classlist]);

			list.forEach((cl) => {
				if (em.classList.contains(cl)) {
					em.classList.remove(cl);
				}
			});
		};
		this.has = em.classList.contains;
		this.disabled = em.getAttribute("disabled");
		this.after = function (content) {
			em.innerHTML += content;
		};
		this.before = function (content) {
			em.innerHTML = (content + em.innerHTML);
		};
		this.delete = (this.pure).remove
		this.attribute = function (key, val=null) {
			if (val != null) {
			    em.setAttribute(key, val);
			}
			
			return em.getAttribute(key);
		};
		this.has = function (classes) {
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
		this.dupe = function () {
			var copy = document.createElement(this.tag);
			copy.outerHTML = node.outerHTML;
			return copy;
		};
		this.search = function (subject) {
			var ca = Array.from(this.children);

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
	}

	get origin() {
		var target = (this.pure).parentNode;
		var all = [];

		while (target.parentNode != null || target.parentNode != undefined) {
			all.push(target);
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
		return em.innerHTML;
	} set html(content) {
		em.innerHTML = content;
	}

	get value() {
		return em.innerHTML;
	} set value(content) {
		em.value = content;
	}

	get text() {
		return em.innerHTML;
	} set text(content) {
		em.textContent = content;
	}
}

class Series {
	constructor (items=null) {
		this[0] = (items ?? []);
		this.add = {
			list: this[0],
			first: function (subject) {
				let pair = (subject instanceof Pair) ? subject : (typeof subject === "object" && !(subject instanceof Pair)) ? new Pair(subject[0], subject[1]) : null; 

				if (pair != null) {
					this[0].push(this[0][this[0].length]);
						
					for (var j = 0; j < this[0].length; j++) {
						let item = (j == 0) ? subject : this[0][j + 1];
						this[0][j] = item;
					}					
				}

				return pair;
			},
			next: function (a, b=null) {
				switch (true) {
					case (a instanceof Pair):
						(this.list).push(a);
						return a;

					case ((typeof a != "object") && (b != null)):
						var pr = new Pair(a, b);
						(this.list).push(pr);
						return a;

					default:
						throw new TitaniaException(); //to-do
				}
			}
		};
		this.find = function (pair) {
			for (var x = 0; x < this[0].length; x++) {
				let p = this[0][x];

				if (p.key === pair.key && p.val === pair.val) {
					return true;
				} else if (x == this[0].length) {
					return false;
				}
			}
		};
		this.drop = function (pair) {
			for (var x = 0; x < this[0].length; x++) {
				let p = this[0][x];

				if (p.key === pair.key && p.val === pair.val) {
					this[0].splice(p, 1);
					return true;
				} else if (x == this[0].length) {
					return false;
				}
			}
		}
	}
}

class Pair /*extends Series*/ {
	constructor (key, val) {
		this.key = key;
		this.val = val;
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
	value: function (source=[]) {
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
	value: function (subject=[]) {
		let target = this;

		let total = 0;
		let matches  = [];

		target.forEach(val => {
			for (var x = 0; x < subject.length; x++) {
				if (val == subject[x]) {
					matches.push(subject[x]);
					total++;
				}
			}
		});

		return { total: total, common: matches };
	}
});

const _ = DOM.select;
