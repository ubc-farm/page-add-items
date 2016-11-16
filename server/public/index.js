(function (react,reactDom) {
    'use strict';

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function unwrapExports (x) {
    	return x && x.__esModule ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var documentPromises = createCommonjsModule(function (module, exports) {
    'use strict';

    exports.__esModule = true;
    var promisify = function promisify(type, readyState) {
    	return new Promise(function (resolve) {
    		var listener = function listener() {
    			if (readyState.test(document.readyState)) {
    				document.removeEventListener(type, listener);

    				resolve();
    			}
    		};

    		document.addEventListener(type, listener);

    		listener();
    	});
    };

    var interactive = exports.interactive = promisify('readystatechange', /^(?:interactive|complete)$/);
    var contentLoaded = exports.contentLoaded = promisify('DOMContentLoaded', /^(?:interactive|complete)$/);
    var loaded = exports.loaded = promisify('readystatechange', /^complete$/);
    });

    unwrapExports(documentPromises);
    var interactive = documentPromises.interactive;

    /* eslint-disable no-unused-vars */
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
    	if (val === null || val === undefined) {
    		throw new TypeError('Object.assign cannot be called with null or undefined');
    	}

    	return Object(val);
    }

    function shouldUseNative() {
    	try {
    		if (!Object.assign) {
    			return false;
    		}

    		// Detect buggy property enumeration order in older V8 versions.

    		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
    		var test1 = new String('abc');  // eslint-disable-line
    		test1[5] = 'de';
    		if (Object.getOwnPropertyNames(test1)[0] === '5') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test2 = {};
    		for (var i = 0; i < 10; i++) {
    			test2['_' + String.fromCharCode(i)] = i;
    		}
    		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
    			return test2[n];
    		});
    		if (order2.join('') !== '0123456789') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test3 = {};
    		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
    			test3[letter] = letter;
    		});
    		if (Object.keys(Object.assign({}, test3)).join('') !==
    				'abcdefghijklmnopqrst') {
    			return false;
    		}

    		return true;
    	} catch (e) {
    		// We don't expect any of the above to throw, but better to be safe.
    		return false;
    	}
    }

    var __moduleExports$3 = shouldUseNative() ? Object.assign : function (target, source) {
    	var from;
    	var to = toObject(target);
    	var symbols;

    	for (var s = 1; s < arguments.length; s++) {
    		from = Object(arguments[s]);

    		for (var key in from) {
    			if (hasOwnProperty.call(from, key)) {
    				to[key] = from[key];
    			}
    		}

    		if (Object.getOwnPropertySymbols) {
    			symbols = Object.getOwnPropertySymbols(from);
    			for (var i = 0; i < symbols.length; i++) {
    				if (propIsEnumerable.call(from, symbols[i])) {
    					to[symbols[i]] = from[symbols[i]];
    				}
    			}
    		}
    	}

    	return to;
    };

    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    function reactProdInvariant(code) {
      var argCount = arguments.length - 1;

      var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

      for (var argIdx = 0; argIdx < argCount; argIdx++) {
        message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
      }

      message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

      var error = new Error(message);
      error.name = 'Invariant Violation';
      error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

      throw error;
    }

    var __moduleExports$6 = reactProdInvariant;

    /**
     * Use invariant() to assert state which your program assumes to be true.
     *
     * Provide sprintf-style format (only %s is supported) and arguments
     * to provide information about what broke and what you were
     * expecting.
     *
     * The invariant message will be stripped in production, but the invariant
     * will remain to ensure logic does not differ in production.
     */

    function invariant$1(condition, format, a, b, c, d, e, f) {
      if ("production" !== 'production') {}

      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function () {
            return args[argIndex++];
          }));
          error.name = 'Invariant Violation';
        }

        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
      }
    }

    var __moduleExports$7 = invariant$1;

    var _prodInvariant = __moduleExports$6;

    var invariant = __moduleExports$7;

    /**
     * Static poolers. Several custom versions for each potential number of
     * arguments. A completely generic pooler is easy to implement, but would
     * require accessing the `arguments` object. In each of these, `this` refers to
     * the Class itself, not an instance. If any others are needed, simply add them
     * here, or in their own files.
     */
    var oneArgumentPooler = function (copyFieldsFrom) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance;
      } else {
        return new Klass(copyFieldsFrom);
      }
    };

    var twoArgumentPooler$1 = function (a1, a2) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2);
        return instance;
      } else {
        return new Klass(a1, a2);
      }
    };

    var threeArgumentPooler = function (a1, a2, a3) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3);
        return instance;
      } else {
        return new Klass(a1, a2, a3);
      }
    };

    var fourArgumentPooler$1 = function (a1, a2, a3, a4) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4);
        return instance;
      } else {
        return new Klass(a1, a2, a3, a4);
      }
    };

    var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4, a5);
        return instance;
      } else {
        return new Klass(a1, a2, a3, a4, a5);
      }
    };

    var standardReleaser = function (instance) {
      var Klass = this;
      !(instance instanceof Klass) ? _prodInvariant('25') : void 0;
      instance.destructor();
      if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance);
      }
    };

    var DEFAULT_POOL_SIZE = 10;
    var DEFAULT_POOLER = oneArgumentPooler;

    /**
     * Augments `CopyConstructor` to be a poolable class, augmenting only the class
     * itself (statically) not adding any prototypical fields. Any CopyConstructor
     * you give this may have a `poolSize` property, and will look for a
     * prototypical `destructor` on instances.
     *
     * @param {Function} CopyConstructor Constructor that can be used to reset.
     * @param {Function} pooler Customizable pooler.
     */
    var addPoolingTo = function (CopyConstructor, pooler) {
      var NewKlass = CopyConstructor;
      NewKlass.instancePool = [];
      NewKlass.getPooled = pooler || DEFAULT_POOLER;
      if (!NewKlass.poolSize) {
        NewKlass.poolSize = DEFAULT_POOL_SIZE;
      }
      NewKlass.release = standardReleaser;
      return NewKlass;
    };

    var PooledClass$1 = {
      addPoolingTo: addPoolingTo,
      oneArgumentPooler: oneArgumentPooler,
      twoArgumentPooler: twoArgumentPooler$1,
      threeArgumentPooler: threeArgumentPooler,
      fourArgumentPooler: fourArgumentPooler$1,
      fiveArgumentPooler: fiveArgumentPooler
    };

    var __moduleExports$5 = PooledClass$1;

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */

    var ReactCurrentOwner$1 = {

      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null

    };

    var __moduleExports$9 = ReactCurrentOwner$1;

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * 
     */

    function makeEmptyFunction(arg) {
      return function () {
        return arg;
      };
    }

    /**
     * This function accepts and discards inputs; it has no side effects. This is
     * primarily useful idiomatically for overridable function endpoints which
     * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
     */
    var emptyFunction$2 = function emptyFunction() {};

    emptyFunction$2.thatReturns = makeEmptyFunction;
    emptyFunction$2.thatReturnsFalse = makeEmptyFunction(false);
    emptyFunction$2.thatReturnsTrue = makeEmptyFunction(true);
    emptyFunction$2.thatReturnsNull = makeEmptyFunction(null);
    emptyFunction$2.thatReturnsThis = function () {
      return this;
    };
    emptyFunction$2.thatReturnsArgument = function (arg) {
      return arg;
    };

    var __moduleExports$11 = emptyFunction$2;

    var emptyFunction$1 = __moduleExports$11;

    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var warning$2 = emptyFunction$1;

    var __moduleExports$10 = warning$2;

    var _assign$1 = __moduleExports$3;

    var ReactCurrentOwner = __moduleExports$9;

    var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

    // The Symbol used to tag the ReactElement type. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };

    function hasValidRef(config) {
      if ("production" !== 'production') {}
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      if ("production" !== 'production') {}
      return config.key !== undefined;
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement$2 = function (type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
      };

      if ("production" !== 'production') {}

      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
     */
    ReactElement$2.createElement = function (type, config, children) {
      var propName;

      // Reserved names are extracted
      var props = {};

      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if ("production" !== 'production') {}

        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      if ("production" !== 'production') {}
      return ReactElement$2(type, key, ref, self, source, ReactCurrentOwner.current, props);
    };

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
     */
    ReactElement$2.createFactory = function (type) {
      var factory = ReactElement$2.createElement.bind(null, type);
      // Expose the type on the factory and the prototype so that it can be
      // easily accessed on elements. E.g. `<Foo />.type === Foo`.
      // This should not be named `constructor` since this may not be the function
      // that created the element, and it may not even be a constructor.
      // Legacy hook TODO: Warn if this is accessed
      factory.type = type;
      return factory;
    };

    ReactElement$2.cloneAndReplaceKey = function (oldElement, newKey) {
      var newElement = ReactElement$2(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

      return newElement;
    };

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
     */
    ReactElement$2.cloneElement = function (element, config, children) {
      var propName;

      // Original props are copied
      var props = _assign$1({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config != null) {
        if ("production" !== 'production') {}

        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      return ReactElement$2(element.type, key, ref, self, source, owner, props);
    };

    /**
     * Verifies the object is a ReactElement.
     * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    ReactElement$2.isValidElement = function (object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };

    ReactElement$2.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;

    var __moduleExports$8 = ReactElement$2;

    /* global Symbol */

    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn$1(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    var __moduleExports$14 = getIteratorFn$1;

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */

    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });

      return '$' + escapedString;
    }

    /**
     * Unescape and unwrap key for human-readable display
     *
     * @param {string} key to unescape.
     * @return {string} the unescaped key.
     */
    function unescape(key) {
      var unescapeRegex = /(=0|=2)/g;
      var unescaperLookup = {
        '=0': '=',
        '=2': ':'
      };
      var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

      return ('' + keySubstring).replace(unescapeRegex, function (match) {
        return unescaperLookup[match];
      });
    }

    var KeyEscapeUtils$1 = {
      escape: escape,
      unescape: unescape
    };

    var __moduleExports$15 = KeyEscapeUtils$1;

    var _prodInvariant$1 = __moduleExports$6;

    var ReactCurrentOwner$2 = __moduleExports$9;
    var ReactElement$3 = __moduleExports$8;

    var getIteratorFn = __moduleExports$14;
    var invariant$2 = __moduleExports$7;
    var KeyEscapeUtils = __moduleExports$15;
    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (component && typeof component === 'object' && component.key != null) {
        // Explicit key
        return KeyEscapeUtils.escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children;

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      if (children === null || type === 'string' || type === 'number' || ReactElement$3.isValidElement(children)) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (iteratorFn) {
          var iterator = iteratorFn.call(children);
          var step;
          if (iteratorFn !== children.entries) {
            var ii = 0;
            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getComponentKey(child, ii++);
              subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
            }
          } else {
            if ("production" !== 'production') {}
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                child = entry[1];
                nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
                subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
              }
            }
          }
        } else if (type === 'object') {
          var addendum = '';
          if ("production" !== 'production') {}
          var childrenString = String(children);
          _prodInvariant$1('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren$1(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    var __moduleExports$13 = traverseAllChildren$1;

    var PooledClass = __moduleExports$5;
    var ReactElement$1 = __moduleExports$8;

    var emptyFunction = __moduleExports$11;
    var traverseAllChildren = __moduleExports$13;

    var twoArgumentPooler = PooledClass.twoArgumentPooler;
    var fourArgumentPooler = PooledClass.fourArgumentPooler;

    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    /**
     * PooledClass representing the bookkeeping associated with performing a child
     * traversal. Allows avoiding binding callbacks.
     *
     * @constructor ForEachBookKeeping
     * @param {!function} forEachFunction Function to perform traversal with.
     * @param {?*} forEachContext Context to perform context with.
     */
    function ForEachBookKeeping(forEachFunction, forEachContext) {
      this.func = forEachFunction;
      this.context = forEachContext;
      this.count = 0;
    }
    ForEachBookKeeping.prototype.destructor = function () {
      this.func = null;
      this.context = null;
      this.count = 0;
    };
    PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func;
      var context = bookKeeping.context;

      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      ForEachBookKeeping.release(traverseContext);
    }

    /**
     * PooledClass representing the bookkeeping associated with performing a child
     * mapping. Allows avoiding binding callbacks.
     *
     * @constructor MapBookKeeping
     * @param {!*} mapResult Object containing the ordered map of results.
     * @param {!function} mapFunction Function to perform mapping with.
     * @param {?*} mapContext Context to perform mapping with.
     */
    function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
      this.result = mapResult;
      this.keyPrefix = keyPrefix;
      this.func = mapFunction;
      this.context = mapContext;
      this.count = 0;
    }
    MapBookKeeping.prototype.destructor = function () {
      this.result = null;
      this.keyPrefix = null;
      this.func = null;
      this.context = null;
      this.count = 0;
    };
    PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result;
      var keyPrefix = bookKeeping.keyPrefix;
      var func = bookKeeping.func;
      var context = bookKeeping.context;


      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (ReactElement$1.isValidElement(mappedChild)) {
          mappedChild = ReactElement$1.cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      MapBookKeeping.release(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    function forEachSingleChildDummy(traverseContext, child, name) {
      return null;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children, context) {
      return traverseAllChildren(children, forEachSingleChildDummy, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    var ReactChildren$1 = {
      forEach: forEachChildren,
      map: mapChildren,
      mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
      count: countChildren,
      toArray: toArray
    };

    var __moduleExports$4 = ReactChildren$1;

    function warnNoop(publicInstance, callerName) {
      if ("production" !== 'production') {}
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue$1 = {

      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function (publicInstance) {
        return false;
      },

      /**
       * Enqueue a callback that will be executed after all the pending updates
       * have processed.
       *
       * @param {ReactClass} publicInstance The instance to use as `this` context.
       * @param {?function} callback Called after state is updated.
       * @internal
       */
      enqueueCallback: function (publicInstance, callback) {},

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @internal
       */
      enqueueForceUpdate: function (publicInstance) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @internal
       */
      enqueueReplaceState: function (publicInstance, completeState) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @internal
       */
      enqueueSetState: function (publicInstance, partialState) {
        warnNoop(publicInstance, 'setState');
      }
    };

    var __moduleExports$17 = ReactNoopUpdateQueue$1;

    var emptyObject$1 = {};

    var __moduleExports$18 = emptyObject$1;

    var _prodInvariant$2 = __moduleExports$6;

    var ReactNoopUpdateQueue = __moduleExports$17;

    var emptyObject = __moduleExports$18;
    var invariant$3 = __moduleExports$7;
    /**
     * Base class helpers for the updating state of a component.
     */
    function ReactComponent$1(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    ReactComponent$1.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    ReactComponent$1.prototype.setState = function (partialState, callback) {
      !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? _prodInvariant$2('85') : void 0;
      this.updater.enqueueSetState(this, partialState);
      if (callback) {
        this.updater.enqueueCallback(this, callback, 'setState');
      }
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    ReactComponent$1.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this);
      if (callback) {
        this.updater.enqueueCallback(this, callback, 'forceUpdate');
      }
    };

    var __moduleExports$16 = ReactComponent$1;

    var _assign$2 = __moduleExports$3;

    var ReactComponent$2 = __moduleExports$16;
    var ReactNoopUpdateQueue$2 = __moduleExports$17;

    var emptyObject$2 = __moduleExports$18;

    /**
     * Base class helpers for the updating state of a component.
     */
    function ReactPureComponent$1(props, context, updater) {
      // Duplicated from ReactComponent.
      this.props = props;
      this.context = context;
      this.refs = emptyObject$2;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue$2;
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = ReactComponent$2.prototype;
    ReactPureComponent$1.prototype = new ComponentDummy();
    ReactPureComponent$1.prototype.constructor = ReactPureComponent$1;
    // Avoid an extra prototype jump for these methods.
    _assign$2(ReactPureComponent$1.prototype, ReactComponent$2.prototype);
    ReactPureComponent$1.prototype.isPureReactComponent = true;

    var __moduleExports$19 = ReactPureComponent$1;

    var invariant$5 = __moduleExports$7;

    /**
     * Constructs an enumeration with keys equal to their value.
     *
     * For example:
     *
     *   var COLORS = keyMirror({blue: null, red: null});
     *   var myColor = COLORS.blue;
     *   var isColorValid = !!COLORS[myColor];
     *
     * The last line could not be performed if the values of the generated enum were
     * not equal to their keys.
     *
     *   Input:  {key1: val1, key2: val2}
     *   Output: {key1: key1, key2: key2}
     *
     * @param {object} obj
     * @return {object}
     */
    var keyMirror$2 = function keyMirror(obj) {
      var ret = {};
      var key;
      !(obj instanceof Object && !Array.isArray(obj)) ? invariant$5(false) : void 0;
      for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        ret[key] = key;
      }
      return ret;
    };

    var __moduleExports$22 = keyMirror$2;

    var keyMirror$1 = __moduleExports$22;

    var ReactPropTypeLocations$1 = keyMirror$1({
      prop: null,
      context: null,
      childContext: null
    });

    var __moduleExports$21 = ReactPropTypeLocations$1;

    var ReactPropTypeLocationNames$1 = {};

    var __moduleExports$23 = ReactPropTypeLocationNames$1;

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     */

    /**
     * Allows extraction of a minified key. Let's the build system minify keys
     * without losing the ability to dynamically use key strings as values
     * themselves. Pass in an object with a single key/val pair and it will return
     * you the string key of that single record. Suppose you want to grab the
     * value for a key 'className' inside of an object. Key/val minification may
     * have aliased that key to be 'xa12'. keyOf({className: null}) will return
     * 'xa12' in that case. Resolve keys you want to use once at startup time, then
     * reuse those resolutions.
     */
    var keyOf$1 = function keyOf(oneKeyObj) {
      var key;
      for (key in oneKeyObj) {
        if (!oneKeyObj.hasOwnProperty(key)) {
          continue;
        }
        return key;
      }
      return null;
    };

    var __moduleExports$24 = keyOf$1;

var     _prodInvariant$3 = __moduleExports$6;
var     _assign$3 = __moduleExports$3;
    var ReactComponent$3 = __moduleExports$16;
    var ReactElement$4 = __moduleExports$8;
    var ReactPropTypeLocationNames = __moduleExports$23;
    var ReactNoopUpdateQueue$3 = __moduleExports$17;

    var emptyObject$3 = __moduleExports$18;
    var invariant$4 = __moduleExports$7;
    var keyMirror = __moduleExports$22;
    var keyOf = __moduleExports$24;
    var MIXINS_KEY = keyOf({ mixins: null });

    /**
     * Policies that describe methods in `ReactClassInterface`.
     */
    var SpecPolicy = keyMirror({
      /**
       * These methods may be defined only once by the class specification or mixin.
       */
      DEFINE_ONCE: null,
      /**
       * These methods may be defined by both the class specification and mixins.
       * Subsequent definitions will be chained. These methods must return void.
       */
      DEFINE_MANY: null,
      /**
       * These methods are overriding the base class.
       */
      OVERRIDE_BASE: null,
      /**
       * These methods are similar to DEFINE_MANY, except we assume they return
       * objects. We try to merge the keys of the return values of all the mixed in
       * functions. If there is a key conflict we throw.
       */
      DEFINE_MANY_MERGED: null
    });

    var injectedMixins = [];

    /**
     * Composite components are higher-level components that compose other composite
     * or host components.
     *
     * To create a new type of `ReactClass`, pass a specification of
     * your new class to `React.createClass`. The only requirement of your class
     * specification is that you implement a `render` method.
     *
     *   var MyComponent = React.createClass({
     *     render: function() {
     *       return <div>Hello World</div>;
     *     }
     *   });
     *
     * The class specification supports a specific protocol of methods that have
     * special meaning (e.g. `render`). See `ReactClassInterface` for
     * more the comprehensive protocol. Any other properties and methods in the
     * class specification will be available on the prototype.
     *
     * @interface ReactClassInterface
     * @internal
     */
    var ReactClassInterface = {

      /**
       * An array of Mixin objects to include when defining your component.
       *
       * @type {array}
       * @optional
       */
      mixins: SpecPolicy.DEFINE_MANY,

      /**
       * An object containing properties and methods that should be defined on
       * the component's constructor instead of its prototype (static methods).
       *
       * @type {object}
       * @optional
       */
      statics: SpecPolicy.DEFINE_MANY,

      /**
       * Definition of prop types for this component.
       *
       * @type {object}
       * @optional
       */
      propTypes: SpecPolicy.DEFINE_MANY,

      /**
       * Definition of context types for this component.
       *
       * @type {object}
       * @optional
       */
      contextTypes: SpecPolicy.DEFINE_MANY,

      /**
       * Definition of context types this component sets for its children.
       *
       * @type {object}
       * @optional
       */
      childContextTypes: SpecPolicy.DEFINE_MANY,

      // ==== Definition methods ====

      /**
       * Invoked when the component is mounted. Values in the mapping will be set on
       * `this.props` if that prop is not specified (i.e. using an `in` check).
       *
       * This method is invoked before `getInitialState` and therefore cannot rely
       * on `this.state` or use `this.setState`.
       *
       * @return {object}
       * @optional
       */
      getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

      /**
       * Invoked once before the component is mounted. The return value will be used
       * as the initial value of `this.state`.
       *
       *   getInitialState: function() {
       *     return {
       *       isOn: false,
       *       fooBaz: new BazFoo()
       *     }
       *   }
       *
       * @return {object}
       * @optional
       */
      getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

      /**
       * @return {object}
       * @optional
       */
      getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

      /**
       * Uses props from `this.props` and state from `this.state` to render the
       * structure of the component.
       *
       * No guarantees are made about when or how often this method is invoked, so
       * it must not have side effects.
       *
       *   render: function() {
       *     var name = this.props.name;
       *     return <div>Hello, {name}!</div>;
       *   }
       *
       * @return {ReactComponent}
       * @nosideeffects
       * @required
       */
      render: SpecPolicy.DEFINE_ONCE,

      // ==== Delegate methods ====

      /**
       * Invoked when the component is initially created and about to be mounted.
       * This may have side effects, but any external subscriptions or data created
       * by this method must be cleaned up in `componentWillUnmount`.
       *
       * @optional
       */
      componentWillMount: SpecPolicy.DEFINE_MANY,

      /**
       * Invoked when the component has been mounted and has a DOM representation.
       * However, there is no guarantee that the DOM node is in the document.
       *
       * Use this as an opportunity to operate on the DOM when the component has
       * been mounted (initialized and rendered) for the first time.
       *
       * @param {DOMElement} rootNode DOM element representing the component.
       * @optional
       */
      componentDidMount: SpecPolicy.DEFINE_MANY,

      /**
       * Invoked before the component receives new props.
       *
       * Use this as an opportunity to react to a prop transition by updating the
       * state using `this.setState`. Current props are accessed via `this.props`.
       *
       *   componentWillReceiveProps: function(nextProps, nextContext) {
       *     this.setState({
       *       likesIncreasing: nextProps.likeCount > this.props.likeCount
       *     });
       *   }
       *
       * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
       * transition may cause a state change, but the opposite is not true. If you
       * need it, you are probably looking for `componentWillUpdate`.
       *
       * @param {object} nextProps
       * @optional
       */
      componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

      /**
       * Invoked while deciding if the component should be updated as a result of
       * receiving new props, state and/or context.
       *
       * Use this as an opportunity to `return false` when you're certain that the
       * transition to the new props/state/context will not require a component
       * update.
       *
       *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
       *     return !equal(nextProps, this.props) ||
       *       !equal(nextState, this.state) ||
       *       !equal(nextContext, this.context);
       *   }
       *
       * @param {object} nextProps
       * @param {?object} nextState
       * @param {?object} nextContext
       * @return {boolean} True if the component should update.
       * @optional
       */
      shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

      /**
       * Invoked when the component is about to update due to a transition from
       * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
       * and `nextContext`.
       *
       * Use this as an opportunity to perform preparation before an update occurs.
       *
       * NOTE: You **cannot** use `this.setState()` in this method.
       *
       * @param {object} nextProps
       * @param {?object} nextState
       * @param {?object} nextContext
       * @param {ReactReconcileTransaction} transaction
       * @optional
       */
      componentWillUpdate: SpecPolicy.DEFINE_MANY,

      /**
       * Invoked when the component's DOM representation has been updated.
       *
       * Use this as an opportunity to operate on the DOM when the component has
       * been updated.
       *
       * @param {object} prevProps
       * @param {?object} prevState
       * @param {?object} prevContext
       * @param {DOMElement} rootNode DOM element representing the component.
       * @optional
       */
      componentDidUpdate: SpecPolicy.DEFINE_MANY,

      /**
       * Invoked when the component is about to be removed from its parent and have
       * its DOM representation destroyed.
       *
       * Use this as an opportunity to deallocate any external resources.
       *
       * NOTE: There is no `componentDidUnmount` since your component will have been
       * destroyed by that point.
       *
       * @optional
       */
      componentWillUnmount: SpecPolicy.DEFINE_MANY,

      // ==== Advanced methods ====

      /**
       * Updates the component's currently mounted DOM representation.
       *
       * By default, this implements React's rendering and reconciliation algorithm.
       * Sophisticated clients may wish to override this.
       *
       * @param {ReactReconcileTransaction} transaction
       * @internal
       * @overridable
       */
      updateComponent: SpecPolicy.OVERRIDE_BASE

    };

    /**
     * Mapping from class specification keys to special processing functions.
     *
     * Although these are declared like instance properties in the specification
     * when defining classes using `React.createClass`, they are actually static
     * and are accessible on the constructor instead of the prototype. Despite
     * being static, they must be defined outside of the "statics" key under
     * which all other static methods are defined.
     */
    var RESERVED_SPEC_KEYS = {
      displayName: function (Constructor, displayName) {
        Constructor.displayName = displayName;
      },
      mixins: function (Constructor, mixins) {
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            mixSpecIntoComponent(Constructor, mixins[i]);
          }
        }
      },
      childContextTypes: function (Constructor, childContextTypes) {
        if ("production" !== 'production') {}
        Constructor.childContextTypes = _assign$3({}, Constructor.childContextTypes, childContextTypes);
      },
      contextTypes: function (Constructor, contextTypes) {
        if ("production" !== 'production') {}
        Constructor.contextTypes = _assign$3({}, Constructor.contextTypes, contextTypes);
      },
      /**
       * Special case getDefaultProps which should move into statics but requires
       * automatic merging.
       */
      getDefaultProps: function (Constructor, getDefaultProps) {
        if (Constructor.getDefaultProps) {
          Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
        } else {
          Constructor.getDefaultProps = getDefaultProps;
        }
      },
      propTypes: function (Constructor, propTypes) {
        if ("production" !== 'production') {}
        Constructor.propTypes = _assign$3({}, Constructor.propTypes, propTypes);
      },
      statics: function (Constructor, statics) {
        mixStaticSpecIntoComponent(Constructor, statics);
      },
      autobind: function () {} };

    function validateMethodOverride(isAlreadyDefined, name) {
      var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

      // Disallow overriding of base class methods unless explicitly allowed.
      if (ReactClassMixin.hasOwnProperty(name)) {
        !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? _prodInvariant$3('73', name) : void 0;
      }

      // Disallow defining methods more than once unless explicitly allowed.
      if (isAlreadyDefined) {
        !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? _prodInvariant$3('74', name) : void 0;
      }
    }

    /**
     * Mixin helper which handles policy validation and reserved
     * specification keys when building React classes.
     */
    function mixSpecIntoComponent(Constructor, spec) {
      if (!spec) {
        if ("production" !== 'production') {}

        return;
      }

      !(typeof spec !== 'function') ? _prodInvariant$3('75') : void 0;
      !!ReactElement$4.isValidElement(spec) ? _prodInvariant$3('76') : void 0;

      var proto = Constructor.prototype;
      var autoBindPairs = proto.__reactAutoBindPairs;

      // By handling mixins before any other properties, we ensure the same
      // chaining order is applied to methods with DEFINE_MANY policy, whether
      // mixins are listed before or after these methods in the spec.
      if (spec.hasOwnProperty(MIXINS_KEY)) {
        RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
      }

      for (var name in spec) {
        if (!spec.hasOwnProperty(name)) {
          continue;
        }

        if (name === MIXINS_KEY) {
          // We have already handled mixins in a special case above.
          continue;
        }

        var property = spec[name];
        var isAlreadyDefined = proto.hasOwnProperty(name);
        validateMethodOverride(isAlreadyDefined, name);

        if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
          RESERVED_SPEC_KEYS[name](Constructor, property);
        } else {
          // Setup methods on prototype:
          // The following member methods should not be automatically bound:
          // 1. Expected ReactClass methods (in the "interface").
          // 2. Overridden methods (that were mixed in).
          var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
          var isFunction = typeof property === 'function';
          var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

          if (shouldAutoBind) {
            autoBindPairs.push(name, property);
            proto[name] = property;
          } else {
            if (isAlreadyDefined) {
              var specPolicy = ReactClassInterface[name];

              // These cases should already be caught by validateMethodOverride.
              !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? _prodInvariant$3('77', specPolicy, name) : void 0;

              // For methods which are defined more than once, call the existing
              // methods before calling the new property, merging if appropriate.
              if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
                proto[name] = createMergedResultFunction(proto[name], property);
              } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
                proto[name] = createChainedFunction(proto[name], property);
              }
            } else {
              proto[name] = property;
              if ("production" !== 'production') {}
            }
          }
        }
      }
    }

    function mixStaticSpecIntoComponent(Constructor, statics) {
      if (!statics) {
        return;
      }
      for (var name in statics) {
        var property = statics[name];
        if (!statics.hasOwnProperty(name)) {
          continue;
        }

        var isReserved = name in RESERVED_SPEC_KEYS;
        !!isReserved ? _prodInvariant$3('78', name) : void 0;

        var isInherited = name in Constructor;
        !!isInherited ? _prodInvariant$3('79', name) : void 0;
        Constructor[name] = property;
      }
    }

    /**
     * Merge two objects, but throw if both contain the same key.
     *
     * @param {object} one The first object, which is mutated.
     * @param {object} two The second object
     * @return {object} one after it has been mutated to contain everything in two.
     */
    function mergeIntoWithNoDuplicateKeys(one, two) {
      !(one && two && typeof one === 'object' && typeof two === 'object') ? _prodInvariant$3('80') : void 0;

      for (var key in two) {
        if (two.hasOwnProperty(key)) {
          !(one[key] === undefined) ? _prodInvariant$3('81', key) : void 0;
          one[key] = two[key];
        }
      }
      return one;
    }

    /**
     * Creates a function that invokes two functions and merges their return values.
     *
     * @param {function} one Function to invoke first.
     * @param {function} two Function to invoke second.
     * @return {function} Function that invokes the two argument functions.
     * @private
     */
    function createMergedResultFunction(one, two) {
      return function mergedResult() {
        var a = one.apply(this, arguments);
        var b = two.apply(this, arguments);
        if (a == null) {
          return b;
        } else if (b == null) {
          return a;
        }
        var c = {};
        mergeIntoWithNoDuplicateKeys(c, a);
        mergeIntoWithNoDuplicateKeys(c, b);
        return c;
      };
    }

    /**
     * Creates a function that invokes two functions and ignores their return vales.
     *
     * @param {function} one Function to invoke first.
     * @param {function} two Function to invoke second.
     * @return {function} Function that invokes the two argument functions.
     * @private
     */
    function createChainedFunction(one, two) {
      return function chainedFunction() {
        one.apply(this, arguments);
        two.apply(this, arguments);
      };
    }

    /**
     * Binds a method to the component.
     *
     * @param {object} component Component whose method is going to be bound.
     * @param {function} method Method to be bound.
     * @return {function} The bound method.
     */
    function bindAutoBindMethod(component, method) {
      var boundMethod = method.bind(component);
      if ("production" !== 'production') {}
      return boundMethod;
    }

    /**
     * Binds all auto-bound methods in a component.
     *
     * @param {object} component Component whose method is going to be bound.
     */
    function bindAutoBindMethods(component) {
      var pairs = component.__reactAutoBindPairs;
      for (var i = 0; i < pairs.length; i += 2) {
        var autoBindKey = pairs[i];
        var method = pairs[i + 1];
        component[autoBindKey] = bindAutoBindMethod(component, method);
      }
    }

    /**
     * Add more to the ReactClass base class. These are all legacy features and
     * therefore not already part of the modern ReactComponent.
     */
    var ReactClassMixin = {

      /**
       * TODO: This will be deprecated because state should always keep a consistent
       * type signature and the only use case for this, is to avoid that.
       */
      replaceState: function (newState, callback) {
        this.updater.enqueueReplaceState(this, newState);
        if (callback) {
          this.updater.enqueueCallback(this, callback, 'replaceState');
        }
      },

      /**
       * Checks whether or not this composite component is mounted.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function () {
        return this.updater.isMounted(this);
      }
    };

    var ReactClassComponent = function () {};
    _assign$3(ReactClassComponent.prototype, ReactComponent$3.prototype, ReactClassMixin);

    /**
     * Module for creating composite components.
     *
     * @class ReactClass
     */
    var ReactClass$1 = {

      /**
       * Creates a composite component class given a class specification.
       * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
       *
       * @param {object} spec Class specification (which must define `render`).
       * @return {function} Component constructor function.
       * @public
       */
      createClass: function (spec) {
        var Constructor = function (props, context, updater) {
          // This constructor gets overridden by mocks. The argument is used
          // by mocks to assert on what gets mounted.

          if ("production" !== 'production') {}

          // Wire up auto-binding
          if (this.__reactAutoBindPairs.length) {
            bindAutoBindMethods(this);
          }

          this.props = props;
          this.context = context;
          this.refs = emptyObject$3;
          this.updater = updater || ReactNoopUpdateQueue$3;

          this.state = null;

          // ReactClasses doesn't have constructors. Instead, they use the
          // getInitialState and componentWillMount methods for initialization.

          var initialState = this.getInitialState ? this.getInitialState() : null;
          if ("production" !== 'production') {}
          !(typeof initialState === 'object' && !Array.isArray(initialState)) ? _prodInvariant$3('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

          this.state = initialState;
        };
        Constructor.prototype = new ReactClassComponent();
        Constructor.prototype.constructor = Constructor;
        Constructor.prototype.__reactAutoBindPairs = [];

        injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

        mixSpecIntoComponent(Constructor, spec);

        // Initialize the defaultProps property after all mixins have been merged.
        if (Constructor.getDefaultProps) {
          Constructor.defaultProps = Constructor.getDefaultProps();
        }

        if ("production" !== 'production') {}

        !Constructor.prototype.render ? _prodInvariant$3('83') : void 0;

        if ("production" !== 'production') {}

        // Reduce time spent doing lookups by setting these on the prototype.
        for (var methodName in ReactClassInterface) {
          if (!Constructor.prototype[methodName]) {
            Constructor.prototype[methodName] = null;
          }
        }

        return Constructor;
      },

      injection: {
        injectMixin: function (mixin) {
          injectedMixins.push(mixin);
        }
      }

    };

    var __moduleExports$20 = ReactClass$1;

    var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

    /**
     * Executes the provided `callback` once for each enumerable own property in the
     * object and constructs a new object from the results. The `callback` is
     * invoked with three arguments:
     *
     *  - the property value
     *  - the property name
     *  - the object being traversed
     *
     * Properties that are added after the call to `mapObject` will not be visited
     * by `callback`. If the values of existing properties are changed, the value
     * passed to `callback` will be the value at the time `mapObject` visits them.
     * Properties that are deleted before being visited are not visited.
     *
     * @grep function objectMap()
     * @grep function objMap()
     *
     * @param {?object} object
     * @param {function} callback
     * @param {*} context
     * @return {?object}
     */
    function mapObject$1(object, callback, context) {
      if (!object) {
        return null;
      }
      var result = {};
      for (var name in object) {
        if (hasOwnProperty$2.call(object, name)) {
          result[name] = callback.call(context, object[name], name, object);
        }
      }
      return result;
    }

    var __moduleExports$26 = mapObject$1;

    var ReactElement$5 = __moduleExports$8;

    var mapObject = __moduleExports$26;

    /**
     * Create a factory that creates HTML tag elements.
     *
     * @param {string} tag Tag name (e.g. `div`).
     * @private
     */
    function createDOMFactory(tag) {
      if ("production" !== 'production') {}
      return ReactElement$5.createFactory(tag);
    }

    /**
     * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
     * This is also accessible via `React.DOM`.
     *
     * @public
     */
    var ReactDOMFactories$1 = mapObject({
      a: 'a',
      abbr: 'abbr',
      address: 'address',
      area: 'area',
      article: 'article',
      aside: 'aside',
      audio: 'audio',
      b: 'b',
      base: 'base',
      bdi: 'bdi',
      bdo: 'bdo',
      big: 'big',
      blockquote: 'blockquote',
      body: 'body',
      br: 'br',
      button: 'button',
      canvas: 'canvas',
      caption: 'caption',
      cite: 'cite',
      code: 'code',
      col: 'col',
      colgroup: 'colgroup',
      data: 'data',
      datalist: 'datalist',
      dd: 'dd',
      del: 'del',
      details: 'details',
      dfn: 'dfn',
      dialog: 'dialog',
      div: 'div',
      dl: 'dl',
      dt: 'dt',
      em: 'em',
      embed: 'embed',
      fieldset: 'fieldset',
      figcaption: 'figcaption',
      figure: 'figure',
      footer: 'footer',
      form: 'form',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      head: 'head',
      header: 'header',
      hgroup: 'hgroup',
      hr: 'hr',
      html: 'html',
      i: 'i',
      iframe: 'iframe',
      img: 'img',
      input: 'input',
      ins: 'ins',
      kbd: 'kbd',
      keygen: 'keygen',
      label: 'label',
      legend: 'legend',
      li: 'li',
      link: 'link',
      main: 'main',
      map: 'map',
      mark: 'mark',
      menu: 'menu',
      menuitem: 'menuitem',
      meta: 'meta',
      meter: 'meter',
      nav: 'nav',
      noscript: 'noscript',
      object: 'object',
      ol: 'ol',
      optgroup: 'optgroup',
      option: 'option',
      output: 'output',
      p: 'p',
      param: 'param',
      picture: 'picture',
      pre: 'pre',
      progress: 'progress',
      q: 'q',
      rp: 'rp',
      rt: 'rt',
      ruby: 'ruby',
      s: 's',
      samp: 'samp',
      script: 'script',
      section: 'section',
      select: 'select',
      small: 'small',
      source: 'source',
      span: 'span',
      strong: 'strong',
      style: 'style',
      sub: 'sub',
      summary: 'summary',
      sup: 'sup',
      table: 'table',
      tbody: 'tbody',
      td: 'td',
      textarea: 'textarea',
      tfoot: 'tfoot',
      th: 'th',
      thead: 'thead',
      time: 'time',
      title: 'title',
      tr: 'tr',
      track: 'track',
      u: 'u',
      ul: 'ul',
      'var': 'var',
      video: 'video',
      wbr: 'wbr',

      // SVG
      circle: 'circle',
      clipPath: 'clipPath',
      defs: 'defs',
      ellipse: 'ellipse',
      g: 'g',
      image: 'image',
      line: 'line',
      linearGradient: 'linearGradient',
      mask: 'mask',
      path: 'path',
      pattern: 'pattern',
      polygon: 'polygon',
      polyline: 'polyline',
      radialGradient: 'radialGradient',
      rect: 'rect',
      stop: 'stop',
      svg: 'svg',
      text: 'text',
      tspan: 'tspan'

    }, createDOMFactory);

    var __moduleExports$25 = ReactDOMFactories$1;

    var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

    var __moduleExports$28 = ReactPropTypesSecret$1;

    var ReactElement$6 = __moduleExports$8;
    var ReactPropTypeLocationNames$2 = __moduleExports$23;
    var ReactPropTypesSecret = __moduleExports$28;

    var emptyFunction$3 = __moduleExports$11;
    var getIteratorFn$2 = __moduleExports$14;
    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    var ReactPropTypes$1 = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    function createChainableTypeChecker(validate) {
      if ("production" !== 'production') {}
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
        if ("production" !== 'production') {}
        if (props[propName] == null) {
          var locationName = ReactPropTypeLocationNames$2[location];
          if (isRequired) {
            return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          var locationName = ReactPropTypeLocationNames$2[location];
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunction$3.thatReturns(null));
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var locationName = ReactPropTypeLocationNames$2[location];
          var propType = getPropType(propValue);
          return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!ReactElement$6.isValidElement(propValue)) {
          var locationName = ReactPropTypeLocationNames$2[location];
          var propType = getPropType(propValue);
          return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var locationName = ReactPropTypeLocationNames$2[location];
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        void 0;
        return emptyFunction$3.thatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var locationName = ReactPropTypeLocationNames$2[location];
        var valuesString = JSON.stringify(expectedValues);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          var locationName = ReactPropTypeLocationNames$2[location];
          return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (propValue.hasOwnProperty(key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        void 0;
        return emptyFunction$3.thatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
            return null;
          }
        }

        var locationName = ReactPropTypeLocationNames$2[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          var locationName = ReactPropTypeLocationNames$2[location];
          return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          var locationName = ReactPropTypeLocationNames$2[location];
          return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || ReactElement$6.isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn$2(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    var __moduleExports$27 = ReactPropTypes$1;

    var __moduleExports$29 = '15.3.0';

    var _prodInvariant$4 = __moduleExports$6;

    var ReactElement$7 = __moduleExports$8;

    var invariant$6 = __moduleExports$7;

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild$1(children) {
      !ReactElement$7.isValidElement(children) ? _prodInvariant$4('23') : void 0;
      return children;
    }

    var __moduleExports$30 = onlyChild$1;

    var _assign = __moduleExports$3;

    var ReactChildren = __moduleExports$4;
    var ReactComponent = __moduleExports$16;
    var ReactPureComponent = __moduleExports$19;
    var ReactClass = __moduleExports$20;
    var ReactDOMFactories = __moduleExports$25;
    var ReactElement = __moduleExports$8;
    var ReactPropTypes = __moduleExports$27;
    var ReactVersion = __moduleExports$29;

    var onlyChild = __moduleExports$30;
    var createElement$1 = ReactElement.createElement;
    var createFactory = ReactElement.createFactory;
    var cloneElement = ReactElement.cloneElement;

    var __spread = _assign;

    var React = {

      // Modern

      Children: {
        map: ReactChildren.map,
        forEach: ReactChildren.forEach,
        count: ReactChildren.count,
        toArray: ReactChildren.toArray,
        only: onlyChild
      },

      Component: ReactComponent,
      PureComponent: ReactPureComponent,

      createElement: createElement$1,
      cloneElement: cloneElement,
      isValidElement: ReactElement.isValidElement,

      // Classic

      PropTypes: ReactPropTypes,
      createClass: ReactClass.createClass,
      createFactory: createFactory,
      createMixin: function (mixin) {
        // Currently a noop. Will be used to validate and trace mixins.
        return mixin;
      },

      // This looks DOM specific but these are actually isomorphic helpers
      // since they are just generating DOM strings.
      DOM: ReactDOMFactories,

      version: ReactVersion,

      // Deprecated hook for JSX spread, don't use this for anything.
      __spread: __spread
    };

    var __moduleExports$2 = React;

    var react$1 = __moduleExports$2;



    var react$2 = Object.freeze({
    	default: react$1,
    	__moduleExports: react$1
    });

    var require$$3 = ( react$2 && react$2['default'] ) || react$2;

    var __moduleExports$1 = createCommonjsModule(function (module, exports) {
    'use strict';

    exports.__esModule = true;

    var _react = require$$3;

    exports["default"] = _react.PropTypes.shape({
      subscribe: _react.PropTypes.func.isRequired,
      dispatch: _react.PropTypes.func.isRequired,
      getState: _react.PropTypes.func.isRequired
    });
    });

    unwrapExports(__moduleExports$1);

    var __moduleExports$31 = createCommonjsModule(function (module, exports) {
    'use strict';

    exports.__esModule = true;
    exports["default"] = warning;
    /**
     * Prints a warning in the console if it exists.
     *
     * @param {String} message The warning message.
     * @returns {void}
     */
    function warning(message) {
      /* eslint-disable no-console */
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(message);
      }
      /* eslint-enable no-console */
      try {
        // This error was thrown as a convenience so that if you enable
        // "break on all exceptions" in your console,
        // it would pause the execution at this line.
        throw new Error(message);
        /* eslint-disable no-empty */
      } catch (e) {}
      /* eslint-enable no-empty */
    }
    });

    unwrapExports(__moduleExports$31);

    var __moduleExports = createCommonjsModule(function (module, exports) {
    'use strict';

    exports.__esModule = true;
    exports["default"] = undefined;

    var _react = require$$3;

    var _storeShape = __moduleExports$1;

    var _storeShape2 = _interopRequireDefault(_storeShape);

    var _warning = __moduleExports$31;

    var _warning2 = _interopRequireDefault(_warning);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var didWarnAboutReceivingStore = false;
    function warnAboutReceivingStore() {
      if (didWarnAboutReceivingStore) {
        return;
      }
      didWarnAboutReceivingStore = true;

      (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
    }

    var Provider = function (_Component) {
      _inherits(Provider, _Component);

      Provider.prototype.getChildContext = function getChildContext() {
        return { store: this.store };
      };

      function Provider(props, context) {
        _classCallCheck(this, Provider);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.store = props.store;
        return _this;
      }

      Provider.prototype.render = function render() {
        return _react.Children.only(this.props.children);
      };

      return Provider;
    }(_react.Component);

    exports["default"] = Provider;


    if ("production" !== 'production') {}

    Provider.propTypes = {
      store: _storeShape2["default"].isRequired,
      children: _react.PropTypes.element.isRequired
    };
    Provider.childContextTypes = {
      store: _storeShape2["default"].isRequired
    };
    });

    unwrapExports(__moduleExports);

    var __moduleExports$33 = createCommonjsModule(function (module, exports) {
    "use strict";

    exports.__esModule = true;
    exports["default"] = shallowEqual;
    function shallowEqual(objA, objB) {
      if (objA === objB) {
        return true;
      }

      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);

      if (keysA.length !== keysB.length) {
        return false;
      }

      // Test for A's keys different from B.
      var hasOwn = Object.prototype.hasOwnProperty;
      for (var i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
          return false;
        }
      }

      return true;
    }
    });

    unwrapExports(__moduleExports$33);

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Built-in value references. */
    var Symbol$1 = root.Symbol;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$1.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto$1.toString;

    /** Built-in value references. */
    var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty$4.call(value, symToStringTag$1),
          tag = value[symToStringTag$1];

      try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$2.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString$1.call(value);
    }

    var nullTag = '[object Null]';
    var undefinedTag = '[object Undefined]';
    /** Built-in value references. */
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      value = Object(value);
      return (symToStringTag && symToStringTag in value)
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /** Built-in value references. */
    var getPrototype = overArg(Object.getPrototypeOf, Object);

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /** `Object#toString` result references. */
    var objectTag = '[object Object]';

    /** Used for built-in method references. */
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty$3.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    var __moduleExports$36 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
    	value: true
    });
    exports['default'] = symbolObservablePonyfill;
    function symbolObservablePonyfill(root) {
    	var result;
    	var _Symbol = root.Symbol;

    	if (typeof _Symbol === 'function') {
    		if (_Symbol.observable) {
    			result = _Symbol.observable;
    		} else {
    			result = _Symbol('observable');
    			_Symbol.observable = result;
    		}
    	} else {
    		result = '@@observable';
    	}

    	return result;
    };
    });

    unwrapExports(__moduleExports$36);

    var __moduleExports$35 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _ponyfill = __moduleExports$36;

    var _ponyfill2 = _interopRequireDefault(_ponyfill);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var root; /* global window */


    if (typeof self !== 'undefined') {
      root = self;
    } else if (typeof window !== 'undefined') {
      root = window;
    } else if (typeof commonjsGlobal !== 'undefined') {
      root = commonjsGlobal;
    } else if (typeof module !== 'undefined') {
      root = module;
    } else {
      root = Function('return this')();
    }

    var result = (0, _ponyfill2['default'])(root);
    exports['default'] = result;
    });

    unwrapExports(__moduleExports$35);

    var index$3 = __moduleExports$35;

    /**
     * These are private action types reserved by Redux.
     * For any unknown actions, you must return the current state.
     * If the current state is undefined, you must return the initial state.
     * Do not reference these action types directly in your code.
     */
    var ActionTypes = {
      INIT: '@@redux/INIT'
    };

    /**
     * Creates a Redux store that holds the state tree.
     * The only way to change the data in the store is to call `dispatch()` on it.
     *
     * There should only be a single store in your app. To specify how different
     * parts of the state tree respond to actions, you may combine several reducers
     * into a single reducer function by using `combineReducers`.
     *
     * @param {Function} reducer A function that returns the next state tree, given
     * the current state tree and the action to handle.
     *
     * @param {any} [preloadedState] The initial state. You may optionally specify it
     * to hydrate the state from the server in universal apps, or to restore a
     * previously serialized user session.
     * If you use `combineReducers` to produce the root reducer function, this must be
     * an object with the same shape as `combineReducers` keys.
     *
     * @param {Function} enhancer The store enhancer. You may optionally specify it
     * to enhance the store with third-party capabilities such as middleware,
     * time travel, persistence, etc. The only store enhancer that ships with Redux
     * is `applyMiddleware()`.
     *
     * @returns {Store} A Redux store that lets you read the state, dispatch actions
     * and subscribe to changes.
     */
    function createStore(reducer, preloadedState, enhancer) {
      var _ref2;

      if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState;
        preloadedState = undefined;
      }

      if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
          throw new Error('Expected the enhancer to be a function.');
        }

        return enhancer(createStore)(reducer, preloadedState);
      }

      if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.');
      }

      var currentReducer = reducer;
      var currentState = preloadedState;
      var currentListeners = [];
      var nextListeners = currentListeners;
      var isDispatching = false;

      function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
          nextListeners = currentListeners.slice();
        }
      }

      /**
       * Reads the state tree managed by the store.
       *
       * @returns {any} The current state tree of your application.
       */
      function getState() {
        return currentState;
      }

      /**
       * Adds a change listener. It will be called any time an action is dispatched,
       * and some part of the state tree may potentially have changed. You may then
       * call `getState()` to read the current state tree inside the callback.
       *
       * You may call `dispatch()` from a change listener, with the following
       * caveats:
       *
       * 1. The subscriptions are snapshotted just before every `dispatch()` call.
       * If you subscribe or unsubscribe while the listeners are being invoked, this
       * will not have any effect on the `dispatch()` that is currently in progress.
       * However, the next `dispatch()` call, whether nested or not, will use a more
       * recent snapshot of the subscription list.
       *
       * 2. The listener should not expect to see all state changes, as the state
       * might have been updated multiple times during a nested `dispatch()` before
       * the listener is called. It is, however, guaranteed that all subscribers
       * registered before the `dispatch()` started will be called with the latest
       * state by the time it exits.
       *
       * @param {Function} listener A callback to be invoked on every dispatch.
       * @returns {Function} A function to remove this change listener.
       */
      function subscribe(listener) {
        if (typeof listener !== 'function') {
          throw new Error('Expected listener to be a function.');
        }

        var isSubscribed = true;

        ensureCanMutateNextListeners();
        nextListeners.push(listener);

        return function unsubscribe() {
          if (!isSubscribed) {
            return;
          }

          isSubscribed = false;

          ensureCanMutateNextListeners();
          var index = nextListeners.indexOf(listener);
          nextListeners.splice(index, 1);
        };
      }

      /**
       * Dispatches an action. It is the only way to trigger a state change.
       *
       * The `reducer` function, used to create the store, will be called with the
       * current state tree and the given `action`. Its return value will
       * be considered the **next** state of the tree, and the change listeners
       * will be notified.
       *
       * The base implementation only supports plain object actions. If you want to
       * dispatch a Promise, an Observable, a thunk, or something else, you need to
       * wrap your store creating function into the corresponding middleware. For
       * example, see the documentation for the `redux-thunk` package. Even the
       * middleware will eventually dispatch plain object actions using this method.
       *
       * @param {Object} action A plain object representing “what changed”. It is
       * a good idea to keep actions serializable so you can record and replay user
       * sessions, or use the time travelling `redux-devtools`. An action must have
       * a `type` property which may not be `undefined`. It is a good idea to use
       * string constants for action types.
       *
       * @returns {Object} For convenience, the same action object you dispatched.
       *
       * Note that, if you use a custom middleware, it may wrap `dispatch()` to
       * return something else (for example, a Promise you can await).
       */
      function dispatch(action) {
        if (!isPlainObject(action)) {
          throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
        }

        if (typeof action.type === 'undefined') {
          throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
        }

        if (isDispatching) {
          throw new Error('Reducers may not dispatch actions.');
        }

        try {
          isDispatching = true;
          currentState = currentReducer(currentState, action);
        } finally {
          isDispatching = false;
        }

        var listeners = currentListeners = nextListeners;
        for (var i = 0; i < listeners.length; i++) {
          listeners[i]();
        }

        return action;
      }

      /**
       * Replaces the reducer currently used by the store to calculate the state.
       *
       * You might need this if your app implements code splitting and you want to
       * load some of the reducers dynamically. You might also need this if you
       * implement a hot reloading mechanism for Redux.
       *
       * @param {Function} nextReducer The reducer for the store to use instead.
       * @returns {void}
       */
      function replaceReducer(nextReducer) {
        if (typeof nextReducer !== 'function') {
          throw new Error('Expected the nextReducer to be a function.');
        }

        currentReducer = nextReducer;
        dispatch({ type: ActionTypes.INIT });
      }

      /**
       * Interoperability point for observable/reactive libraries.
       * @returns {observable} A minimal observable of state changes.
       * For more information, see the observable proposal:
       * https://github.com/zenparsing/es-observable
       */
      function observable() {
        var _ref;

        var outerSubscribe = subscribe;
        return _ref = {
          /**
           * The minimal observable subscription method.
           * @param {Object} observer Any object that can be used as an observer.
           * The observer object should have a `next` method.
           * @returns {subscription} An object with an `unsubscribe` method that can
           * be used to unsubscribe the observable from the store, and prevent further
           * emission of values from the observable.
           */
          subscribe: function subscribe(observer) {
            if (typeof observer !== 'object') {
              throw new TypeError('Expected the observer to be an object.');
            }

            function observeState() {
              if (observer.next) {
                observer.next(getState());
              }
            }

            observeState();
            var unsubscribe = outerSubscribe(observeState);
            return { unsubscribe: unsubscribe };
          }
        }, _ref[index$3] = function () {
          return this;
        }, _ref;
      }

      // When a store is created, an "INIT" action is dispatched so that every
      // reducer returns their initial state. This effectively populates
      // the initial state tree.
      dispatch({ type: ActionTypes.INIT });

      return _ref2 = {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
        replaceReducer: replaceReducer
      }, _ref2[index$3] = observable, _ref2;
    }

    function getUndefinedStateErrorMessage(key, action) {
      var actionType = action && action.type;
      var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

      return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
    }

    function assertReducerSanity(reducers) {
      Object.keys(reducers).forEach(function (key) {
        var reducer = reducers[key];
        var initialState = reducer(undefined, { type: ActionTypes.INIT });

        if (typeof initialState === 'undefined') {
          throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
        }

        var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
        if (typeof reducer(undefined, { type: type }) === 'undefined') {
          throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
        }
      });
    }

    /**
     * Turns an object whose values are different reducer functions, into a single
     * reducer function. It will call every child reducer, and gather their results
     * into a single state object, whose keys correspond to the keys of the passed
     * reducer functions.
     *
     * @param {Object} reducers An object whose values correspond to different
     * reducer functions that need to be combined into one. One handy way to obtain
     * it is to use ES6 `import * as reducers` syntax. The reducers may never return
     * undefined for any action. Instead, they should return their initial state
     * if the state passed to them was undefined, and the current state for any
     * unrecognized action.
     *
     * @returns {Function} A reducer function that invokes every reducer inside the
     * passed object, and builds a state object with the same shape.
     */
    function combineReducers(reducers) {
      var reducerKeys = Object.keys(reducers);
      var finalReducers = {};
      for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];

        if ("production" !== 'production') {}

        if (typeof reducers[key] === 'function') {
          finalReducers[key] = reducers[key];
        }
      }
      var finalReducerKeys = Object.keys(finalReducers);

      if ("production" !== 'production') {}

      var sanityError;
      try {
        assertReducerSanity(finalReducers);
      } catch (e) {
        sanityError = e;
      }

      return function combination() {
        var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var action = arguments[1];

        if (sanityError) {
          throw sanityError;
        }

        if ("production" !== 'production') {}

        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
          var key = finalReducerKeys[i];
          var reducer = finalReducers[key];
          var previousStateForKey = state[key];
          var nextStateForKey = reducer(previousStateForKey, action);
          if (typeof nextStateForKey === 'undefined') {
            var errorMessage = getUndefinedStateErrorMessage(key, action);
            throw new Error(errorMessage);
          }
          nextState[key] = nextStateForKey;
          hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
      };
    }

    function bindActionCreator(actionCreator, dispatch) {
      return function () {
        return dispatch(actionCreator.apply(undefined, arguments));
      };
    }

    /**
     * Turns an object whose values are action creators, into an object with the
     * same keys, but with every function wrapped into a `dispatch` call so they
     * may be invoked directly. This is just a convenience method, as you can call
     * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
     *
     * For convenience, you can also pass a single function as the first argument,
     * and get a function in return.
     *
     * @param {Function|Object} actionCreators An object whose values are action
     * creator functions. One handy way to obtain it is to use ES6 `import * as`
     * syntax. You may also pass a single function.
     *
     * @param {Function} dispatch The `dispatch` function available on your Redux
     * store.
     *
     * @returns {Function|Object} The object mimicking the original object, but with
     * every action creator wrapped into the `dispatch` call. If you passed a
     * function as `actionCreators`, the return value will also be a single
     * function.
     */
    function bindActionCreators(actionCreators, dispatch) {
      if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
      }

      if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
      }

      var keys = Object.keys(actionCreators);
      var boundActionCreators = {};
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
          boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
      }
      return boundActionCreators;
    }

    /**
     * Composes single-argument functions from right to left. The rightmost
     * function can take multiple arguments as it provides the signature for
     * the resulting composite function.
     *
     * @param {...Function} funcs The functions to compose.
     * @returns {Function} A function obtained by composing the argument functions
     * from right to left. For example, compose(f, g, h) is identical to doing
     * (...args) => f(g(h(...args))).
     */

    function compose() {
      for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
      }

      if (funcs.length === 0) {
        return function (arg) {
          return arg;
        };
      }

      if (funcs.length === 1) {
        return funcs[0];
      }

      var last = funcs[funcs.length - 1];
      var rest = funcs.slice(0, -1);
      return function () {
        return rest.reduceRight(function (composed, f) {
          return f(composed);
        }, last.apply(undefined, arguments));
      };
    }

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    /**
     * Creates a store enhancer that applies middleware to the dispatch method
     * of the Redux store. This is handy for a variety of tasks, such as expressing
     * asynchronous actions in a concise manner, or logging every action payload.
     *
     * See `redux-thunk` package as an example of the Redux middleware.
     *
     * Because middleware is potentially asynchronous, this should be the first
     * store enhancer in the composition chain.
     *
     * Note that each middleware will be given the `dispatch` and `getState` functions
     * as named arguments.
     *
     * @param {...Function} middlewares The middleware chain to be applied.
     * @returns {Function} A store enhancer applying the middleware.
     */
    function applyMiddleware() {
      for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
        middlewares[_key] = arguments[_key];
      }

      return function (createStore) {
        return function (reducer, preloadedState, enhancer) {
          var store = createStore(reducer, preloadedState, enhancer);
          var _dispatch = store.dispatch;
          var chain = [];

          var middlewareAPI = {
            getState: store.getState,
            dispatch: function dispatch(action) {
              return _dispatch(action);
            }
          };
          chain = middlewares.map(function (middleware) {
            return middleware(middlewareAPI);
          });
          _dispatch = compose.apply(undefined, chain)(store.dispatch);

          return _extends({}, store, {
            dispatch: _dispatch
          });
        };
      };
    }



    var index$2 = Object.freeze({
      createStore: createStore,
      combineReducers: combineReducers,
      bindActionCreators: bindActionCreators,
      applyMiddleware: applyMiddleware,
      compose: compose
    });

    var require$$0 = ( index$2 && index$2['default'] ) || index$2;

    var __moduleExports$34 = createCommonjsModule(function (module, exports) {
    'use strict';

    exports.__esModule = true;
    exports["default"] = wrapActionCreators;

    var _redux = require$$0;

    function wrapActionCreators(actionCreators) {
      return function (dispatch) {
        return (0, _redux.bindActionCreators)(actionCreators, dispatch);
      };
    }
    });

    unwrapExports(__moduleExports$34);

    /** Detect free variable `global` from Node.js. */
    var freeGlobal$2 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    var __moduleExports$41 = freeGlobal$2;

    var freeGlobal$1 = __moduleExports$41;

    /** Detect free variable `self`. */
    var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root$2 = freeGlobal$1 || freeSelf$1 || Function('return this')();

    var __moduleExports$40 = root$2;

    var root$1 = __moduleExports$40;

    /** Built-in value references. */
    var Symbol$3 = root$1.Symbol;

    var __moduleExports$39 = Symbol$3;

    var Symbol$4 = __moduleExports$39;

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$6 = objectProto$4.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$2 = objectProto$4.toString;

    /** Built-in value references. */
    var symToStringTag$3 = Symbol$4 ? Symbol$4.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag$2(value) {
      var isOwn = hasOwnProperty$6.call(value, symToStringTag$3),
          tag = value[symToStringTag$3];

      try {
        value[symToStringTag$3] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString$2.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$3] = tag;
        } else {
          delete value[symToStringTag$3];
        }
      }
      return result;
    }

    var __moduleExports$42 = getRawTag$2;

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$3 = objectProto$5.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString$2(value) {
      return nativeObjectToString$3.call(value);
    }

    var __moduleExports$43 = objectToString$2;

var     Symbol$2 = __moduleExports$39;
var     getRawTag$1 = __moduleExports$42;
var     objectToString$1 = __moduleExports$43;
var     nullTag$1 = '[object Null]';
var     undefinedTag$1 = '[object Undefined]';
    /** Built-in value references. */
    var symToStringTag$2 = Symbol$2 ? Symbol$2.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag$2(value) {
      if (value == null) {
        return value === undefined ? undefinedTag$1 : nullTag$1;
      }
      value = Object(value);
      return (symToStringTag$2 && symToStringTag$2 in value)
        ? getRawTag$1(value)
        : objectToString$1(value);
    }

    var __moduleExports$38 = baseGetTag$2;

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg$2(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    var __moduleExports$45 = overArg$2;

    var overArg$1 = __moduleExports$45;

    /** Built-in value references. */
    var getPrototype$2 = overArg$1(Object.getPrototypeOf, Object);

    var __moduleExports$44 = getPrototype$2;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike$2(value) {
      return value != null && typeof value == 'object';
    }

    var __moduleExports$46 = isObjectLike$2;

var     baseGetTag$1 = __moduleExports$38;
var     getPrototype$1 = __moduleExports$44;
var     isObjectLike$1 = __moduleExports$46;
    /** `Object#toString` result references. */
    var objectTag$1 = '[object Object]';

    /** Used for built-in method references. */
var     funcProto$1 = Function.prototype;
var     objectProto$3 = Object.prototype;
    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$3.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString$1 = funcToString$1.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject$1(value) {
      if (!isObjectLike$1(value) || baseGetTag$1(value) != objectTag$1) {
        return false;
      }
      var proto = getPrototype$1(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty$5.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString$1.call(Ctor) == objectCtorString$1;
    }

    var __moduleExports$37 = isPlainObject$1;

    var REACT_STATICS = {
        childContextTypes: true,
        contextTypes: true,
        defaultProps: true,
        displayName: true,
        getDefaultProps: true,
        mixins: true,
        propTypes: true,
        type: true
    };

    var KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        arguments: true,
        arity: true
    };

    var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

    var __moduleExports$47 = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
        if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
            var keys = Object.getOwnPropertyNames(sourceComponent);

            /* istanbul ignore else */
            if (isGetOwnPropertySymbolsAvailable) {
                keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
            }

            for (var i = 0; i < keys.length; ++i) {
                if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                    try {
                        targetComponent[keys[i]] = sourceComponent[keys[i]];
                    } catch (error) {

                    }
                }
            }
        }

        return targetComponent;
    };

    /**
     * Use invariant() to assert state which your program assumes to be true.
     *
     * Provide sprintf-style format (only %s is supported) and arguments
     * to provide information about what broke and what you were
     * expecting.
     *
     * The invariant message will be stripped in production, but the invariant
     * will remain to ensure logic does not differ in production.
     */

    var NODE_ENV = "production";

    var invariant$7 = function(condition, format, a, b, c, d, e, f) {
      if (NODE_ENV !== 'production') {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }

      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error(
            'Minified exception occurred; use the non-minified dev environment ' +
            'for the full error message and additional helpful warnings.'
          );
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            format.replace(/%s/g, function() { return args[argIndex++]; })
          );
          error.name = 'Invariant Violation';
        }

        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
      }
    };

    var __moduleExports$48 = invariant$7;

    var __moduleExports$32 = createCommonjsModule(function (module, exports) {
    'use strict';

    exports.__esModule = true;

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    exports["default"] = connect;

    var _react = require$$3;

    var _storeShape = __moduleExports$1;

    var _storeShape2 = _interopRequireDefault(_storeShape);

    var _shallowEqual = __moduleExports$33;

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    var _wrapActionCreators = __moduleExports$34;

    var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

    var _warning = __moduleExports$31;

    var _warning2 = _interopRequireDefault(_warning);

    var _isPlainObject = __moduleExports$37;

    var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

    var _hoistNonReactStatics = __moduleExports$47;

    var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

    var _invariant = __moduleExports$48;

    var _invariant2 = _interopRequireDefault(_invariant);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var defaultMapStateToProps = function defaultMapStateToProps(state) {
      return {};
    }; // eslint-disable-line no-unused-vars
    var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
      return { dispatch: dispatch };
    };
    var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
      return _extends({}, parentProps, stateProps, dispatchProps);
    };

    function getDisplayName(WrappedComponent) {
      return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    var errorObject = { value: null };
    function tryCatch(fn, ctx) {
      try {
        return fn.apply(ctx);
      } catch (e) {
        errorObject.value = e;
        return errorObject;
      }
    }

    // Helps track hot reloading.
    var nextVersion = 0;

    function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var shouldSubscribe = Boolean(mapStateToProps);
      var mapState = mapStateToProps || defaultMapStateToProps;

      var mapDispatch = void 0;
      if (typeof mapDispatchToProps === 'function') {
        mapDispatch = mapDispatchToProps;
      } else if (!mapDispatchToProps) {
        mapDispatch = defaultMapDispatchToProps;
      } else {
        mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
      }

      var finalMergeProps = mergeProps || defaultMergeProps;
      var _options$pure = options.pure,
          pure = _options$pure === undefined ? true : _options$pure,
          _options$withRef = options.withRef,
          withRef = _options$withRef === undefined ? false : _options$withRef;

      var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

      // Helps track hot reloading.
      var version = nextVersion++;

      return function wrapWithConnect(WrappedComponent) {
        var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

        function checkStateShape(props, methodName) {
          if (!(0, _isPlainObject2["default"])(props)) {
            (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
          }
        }

        function computeMergedProps(stateProps, dispatchProps, parentProps) {
          var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
          if ("production" !== 'production') {}
          return mergedProps;
        }

        var Connect = function (_Component) {
          _inherits(Connect, _Component);

          Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
            return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
          };

          function Connect(props, context) {
            _classCallCheck(this, Connect);

            var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

            _this.version = version;
            _this.store = props.store || context.store;

            (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

            var storeState = _this.store.getState();
            _this.state = { storeState: storeState };
            _this.clearCache();
            return _this;
          }

          Connect.prototype.computeStateProps = function computeStateProps(store, props) {
            if (!this.finalMapStateToProps) {
              return this.configureFinalMapState(store, props);
            }

            var state = store.getState();
            var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

            if ("production" !== 'production') {}
            return stateProps;
          };

          Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
            var mappedState = mapState(store.getState(), props);
            var isFactory = typeof mappedState === 'function';

            this.finalMapStateToProps = isFactory ? mappedState : mapState;
            this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

            if (isFactory) {
              return this.computeStateProps(store, props);
            }

            if ("production" !== 'production') {}
            return mappedState;
          };

          Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
            if (!this.finalMapDispatchToProps) {
              return this.configureFinalMapDispatch(store, props);
            }

            var dispatch = store.dispatch;

            var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

            if ("production" !== 'production') {}
            return dispatchProps;
          };

          Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
            var mappedDispatch = mapDispatch(store.dispatch, props);
            var isFactory = typeof mappedDispatch === 'function';

            this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
            this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

            if (isFactory) {
              return this.computeDispatchProps(store, props);
            }

            if ("production" !== 'production') {}
            return mappedDispatch;
          };

          Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
            var nextStateProps = this.computeStateProps(this.store, this.props);
            if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
              return false;
            }

            this.stateProps = nextStateProps;
            return true;
          };

          Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
            var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
            if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
              return false;
            }

            this.dispatchProps = nextDispatchProps;
            return true;
          };

          Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
            var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
            if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
              return false;
            }

            this.mergedProps = nextMergedProps;
            return true;
          };

          Connect.prototype.isSubscribed = function isSubscribed() {
            return typeof this.unsubscribe === 'function';
          };

          Connect.prototype.trySubscribe = function trySubscribe() {
            if (shouldSubscribe && !this.unsubscribe) {
              this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
              this.handleChange();
            }
          };

          Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
            if (this.unsubscribe) {
              this.unsubscribe();
              this.unsubscribe = null;
            }
          };

          Connect.prototype.componentDidMount = function componentDidMount() {
            this.trySubscribe();
          };

          Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
              this.haveOwnPropsChanged = true;
            }
          };

          Connect.prototype.componentWillUnmount = function componentWillUnmount() {
            this.tryUnsubscribe();
            this.clearCache();
          };

          Connect.prototype.clearCache = function clearCache() {
            this.dispatchProps = null;
            this.stateProps = null;
            this.mergedProps = null;
            this.haveOwnPropsChanged = true;
            this.hasStoreStateChanged = true;
            this.haveStatePropsBeenPrecalculated = false;
            this.statePropsPrecalculationError = null;
            this.renderedElement = null;
            this.finalMapDispatchToProps = null;
            this.finalMapStateToProps = null;
          };

          Connect.prototype.handleChange = function handleChange() {
            if (!this.unsubscribe) {
              return;
            }

            var storeState = this.store.getState();
            var prevStoreState = this.state.storeState;
            if (pure && prevStoreState === storeState) {
              return;
            }

            if (pure && !this.doStatePropsDependOnOwnProps) {
              var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
              if (!haveStatePropsChanged) {
                return;
              }
              if (haveStatePropsChanged === errorObject) {
                this.statePropsPrecalculationError = errorObject.value;
              }
              this.haveStatePropsBeenPrecalculated = true;
            }

            this.hasStoreStateChanged = true;
            this.setState({ storeState: storeState });
          };

          Connect.prototype.getWrappedInstance = function getWrappedInstance() {
            (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

            return this.refs.wrappedInstance;
          };

          Connect.prototype.render = function render() {
            var haveOwnPropsChanged = this.haveOwnPropsChanged,
                hasStoreStateChanged = this.hasStoreStateChanged,
                haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
                statePropsPrecalculationError = this.statePropsPrecalculationError,
                renderedElement = this.renderedElement;


            this.haveOwnPropsChanged = false;
            this.hasStoreStateChanged = false;
            this.haveStatePropsBeenPrecalculated = false;
            this.statePropsPrecalculationError = null;

            if (statePropsPrecalculationError) {
              throw statePropsPrecalculationError;
            }

            var shouldUpdateStateProps = true;
            var shouldUpdateDispatchProps = true;
            if (pure && renderedElement) {
              shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
              shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
            }

            var haveStatePropsChanged = false;
            var haveDispatchPropsChanged = false;
            if (haveStatePropsBeenPrecalculated) {
              haveStatePropsChanged = true;
            } else if (shouldUpdateStateProps) {
              haveStatePropsChanged = this.updateStatePropsIfNeeded();
            }
            if (shouldUpdateDispatchProps) {
              haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
            }

            var haveMergedPropsChanged = true;
            if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
              haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
            } else {
              haveMergedPropsChanged = false;
            }

            if (!haveMergedPropsChanged && renderedElement) {
              return renderedElement;
            }

            if (withRef) {
              this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
                ref: 'wrappedInstance'
              }));
            } else {
              this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
            }

            return this.renderedElement;
          };

          return Connect;
        }(_react.Component);

        Connect.displayName = connectDisplayName;
        Connect.WrappedComponent = WrappedComponent;
        Connect.contextTypes = {
          store: _storeShape2["default"]
        };
        Connect.propTypes = {
          store: _storeShape2["default"]
        };

        if ("production" !== 'production') {}

        return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
      };
    }
    });

    unwrapExports(__moduleExports$32);

    var index = createCommonjsModule(function (module, exports) {
    'use strict';

    exports.__esModule = true;
    exports.connect = exports.Provider = undefined;

    var _Provider = __moduleExports;

    var _Provider2 = _interopRequireDefault(_Provider);

    var _connect = __moduleExports$32;

    var _connect2 = _interopRequireDefault(_connect);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    exports.Provider = _Provider2["default"];
    exports.connect = _connect2["default"];
    });

    unwrapExports(index);
    var connect = index.connect;
    var Provider = index.Provider;

    var index$5 = createCommonjsModule(function (module, exports) {
    'use strict';

    exports.__esModule = true;
    function createThunkMiddleware(extraArgument) {
      return function (_ref) {
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;
        return function (next) {
          return function (action) {
            if (typeof action === 'function') {
              return action(dispatch, getState, extraArgument);
            }

            return next(action);
          };
        };
      };
    }

    var thunk = createThunkMiddleware();
    thunk.withExtraArgument = createThunkMiddleware;

    exports['default'] = thunk;
    });

    var thunk = unwrapExports(index$5);

    const TOGGLE = 'inventory/selected/TOGGLE';

    function selectedReducer(state = null, action = {}) {
    	switch (action.type) {
    		case TOGGLE:
    			return action.payload === state ? null : action.payload;

    		default:
    			return state;
    	}
    }

    /** @returns {Set} selected rpw IDs */
    const getSelected = store => store.selected;
    /** @returns {boolean} is any row selected */
    const anySelected = store => getSelected(store) !== null;

    const toggle = row => ({ type: TOGGLE, payload: row });

    const INIT = 'inventory/table/INIT';
    const ADD_ROW = 'inventory/table/ADD_ROW';
    const DELETE_ROW = 'inventory/table/DELETE_ROW';
    const EDIT_ROW = 'inventory/table/EDIT_ROW';

    function tableReducer(state = [], action = {}) {
    	switch (action.type) {
    		case INIT:
    			return action.payload;

    		case ADD_ROW:
    			return [...state, action.payload];

    		case DELETE_ROW:
    			{
    				const copy = state.slice(0);
    				copy.splice(action.index, 1);
    				return copy;
    			}

    		case EDIT_ROW:
    			{
    				const copy = state.slice(0);
    				copy[action.index] = action.payload;
    				return copy;
    			}

    		default:
    			return state;
    	}
    }

    /** @returns {Array<Object>} table data */
    const getTable = store => store.table;
    /** Adds a new row to the table */
    const addRow = newRow => ({ type: ADD_ROW, payload: newRow });
    /** Deletes a row from the table */
    const deleteRow = index => ({ type: DELETE_ROW, index });
    function deleteSelected() {
    	return (dispatch, getState) => {
    		const id = getSelected(getState());
    		const selectedIndex = getTable(getState()).findIndex(row => row.id === id);

    		dispatch(deleteRow(selectedIndex));
    		dispatch(toggle(id));
    	};
    }

    const OPEN = 'inventory/adding/OPEN';
    const CLOSE = 'inventory/adding/CLOSE';
    const TOGGLE$1 = 'inventory/adding/TOGGLE';

    function addingReducer(state = false, action = {}) {
    	console.log(state, action.type);
    	switch (action.type) {
    		case OPEN:
    			return true;
    		case CLOSE:
    			return false;
    		case TOGGLE$1:
    			return !state;
    		default:
    			return state;
    	}
    }

    const isAdding = store => store.adding;

    const startAdding = () => ({ type: OPEN });
    const stopAdding = () => ({ type: CLOSE });

    var store = createStore(combineReducers({
    	table: tableReducer,
    	selected: selectedReducer,
    	adding: addingReducer
    }), applyMiddleware(thunk));

    /**
     * An object containing a geometry and some other properties
     * @alias module:lib/geojson.Feature
     * @see http://geojson.org/geojson-spec.html#feature-objects
     */
    class Feature {
    	get type() { return 'Feature'; }

    	/**
    	 * @param {Geometry} geometry
    	 * @param {Object} properties
    	 * @param {any} [id]
    	 */
    	constructor(geometry, properties = null, id) {
    		Object.assign(this, { geometry, properties });
    		if (id) this.id = id;
    	}

    	/** @returns {Object} */
    	toJSON() {
    		const { type, geometry, properties, id } = this;
    		const json = { type, geometry, properties };
    		if (id) json.id = id;
    		return json;
    	}
    }

    /**
     * A collection of Features. Acts like it has a GeoJSON shape
     * but it's just some fluff over an array. Consequently you can use
     * any array methods directly on the FeatureCollection instead of
     * on FeatureCollection#features.
     * @extends Array
     * @alias module:lib/geojson.FeatureCollection
     * @see http://geojson.org/geojson-spec.html#feature-collection-objects
     */
    class FeatureCollection extends Array {
    	get type() { return 'FeatureCollection'; }

    	/** @param {Feature[]} features - an array or iterable of Features */
    	constructor(features) {
    		super();
    		this.push(...features);
    	}

    	/**
    	 * @type {Feature[]|Iterable<Feature>} returns the array.
    	 * Setting a value here will clear the array then push the values with
    	 * a spread operator, meaning an iterator can be used instead of an array.
    	 */
    	get features() { return this; }
    	set features(values) {
    		this.length = 0;
    		this.push(...values);
    	}

    	/**
    	 * Called by JSON.stringify. Returns an object that matches the
    	 * GeoJSON spec.
    	 * @example
    	 * featureCollection == [featureA, featureB]
    	 * featureCollection.toJSON() == {
    	 *   type: 'FeatureCollection',
    	 *   features: [featureA, featureB]
    	 * }
    	 * @returns {Object}
    	 */
    	toJSON() {
    		const { type } = this;
    		return { type, features: Array.from(this) };
    	}
    }

    /**
     * Position used for GeoJSON. A position can have many keys.
     * If given an object instead of an array, the first and second
     * keys are set from the x and y properties.
     * Position is an iterable object, and as a result can be turned into an array
     * by using Array.from
     * @alias module:lib/geojson.Position
     * @see http://geojson.org/geojson-spec.html#positions
     */
    class Position {
    	/**
    	 * @param {number[]|Object} values of the position.
    	 * @param {number} value.x - set as value[0]
    	 * @param {number} value.y - set as value[1]
    	 * @throws {TypeError} If value is not an array or an object with x and y
    	 */
    	constructor(value) {
    		if (typeof value[Symbol.iterator] === 'function') {
    			Object.assign(this, Array.from(value));
    		} else if ('x' in value && 'y' in value) {
    			const { x, y } = value;
    			Object.assign(this, { 0: x, 1: y });
    		} else {
    			throw new TypeError('Position must be called with ' +
    				'either an array or an object with properties x and y');
    		}
    	}

    	/** Similar to Promise.resolve(), converts value into a Position */
    	static from(value) {
    		if (value instanceof Position) return value;
    		return new Position(value);
    	}

    	/**
    	 * Converts Google Maps API LatLng to Position
    	 * @param {google.maps.LatLng} latlng
    	 * @returns {Position}
    	 */
    	static fromGoogle(latlng) {
    		return new Position([latlng.lng(), latlng.lat()]);
    	}

    	/**
    	 * For JSON.stringify serialization
    	 * @returns {Array}
    	 */
    	toJSON() {
    		return Array.from(this);
    	}

    	/**
    	 * Generator function to get values from this Position. Aligns with
    	 * interator protocol, and allows a position to be easily conveted into an
    	 * array.
    	 * @example
    	 * const position = new Position({x: 12, y: 34})
    	 * Array.from(position) //[12, 34]
    	 * [...position]        //[12, 34]
    	 * @returns {Generator}
    	 */
    	* [Symbol.iterator]() {
    		let i = 0;
    		while (true) {
    			if (i in this) yield this[i];
    			else break;
    			i++;
    		}
    	}

    	/**
    	 * @type {number} number of dimensions in this point. Let's you call push on
    	 * a position.
    	 * @example
    	 * let position = new Position([12, 34]);
    	 * [].push.call(position, 56);
    	 *
    	 * position.toJSON(); //[12, 34, 56]
    	 */
    	get length() {
    		return [...this].length;
    	}

    	// aliases
    	get lat() { return this[1]; }
    	get lng() { return this[0]; }
    	get x() { return this[0]; }
    	get y() { return this[1]; }
    }

    /**
     * Base class for Geometry objects such as Polygons
     */
    class Geometry {
    	toJSON() {
    		const { type, coordinates } = this;
    		return { type, coordinates };
    	}

    	static parse(geojson) {
    		return Object.assign(new this(), geojson);
    	}

    	/**
    	 * Similar to Promise.resolve(): converts the value into a Geometry if it
    	 * isn't one already.
    	 * @param {Geometry|*} value
    	 */
    	static from(value) {
    		if (value instanceof this) return value;
    		else if (value.type && String(value.type) === this.type) {
    			return new this(value.coordinates);
    		}

    		return new this(value);
    	}
    }

    /**
     * A string of positions that forms a line
     * @extends module:lib/geojson~Geometry
     * @alias module:lib/geojson.LineString
     * @see http://geojson.org/geojson-spec.html#linestring
     */
    class LineString extends Geometry {
    	get type() { return 'LineString'; }

    	/** @param {Position[]} positions */
    	constructor(positions) {
    		super();
    		/** @type {Position[]} */
    		this.coordinates = positions.map(Position.from);
    	}
    }

    /**
     * A string of positions that forms a line
     * @extends module:lib/geojson~Geometry
     * @alias module:lib/geojson.LineString
     * @see http://geojson.org/geojson-spec.html#linestring
     */
    class LineString$1 extends Geometry {
    	get type() { return 'LineString'; }

    	/** @param {Position[]} positions */
    	constructor(positions) {
    		super();
    		/** @type {Position[]} */
    		this.coordinates = positions.map(Position.from);
    	}
    }

    /**
     * Polygon coordinates contains LineStrings where the last point is equal to
     * the first point. If multiple lines are specified, the first will be the
     * exterior ring and the others will be holes in the polygon.
     * @extends module:lib/geojson~Geometry
     * @alias module:lib/geojson.Polygon
     * @see http://geojson.org/geojson-spec.html#polygon
     */
    class Polygon extends Geometry {
    	get type() { return 'Polygon'; }

    	/** @param {...LineString} lines */
    	constructor(...lines) {
    		super();
    		/** @type {Position[][]} */
    		this.coordinates = lines.map(line => new LineString$1(line).coordinates);
    	}

    	/**
    	 * Converts value into a Polygon
    	 * @param {Polygon|*} value
    	 */
    	static from(value) {
    		if (Array.isArray(value)) return new Polygon(value);
    		return super.from(value);
    	}

    	/**
    	 * Converts Google Maps API Polygon to GeoJSON Polygon
    	 * @param {google.maps.Polygon} polygon
    	 * @returns {Polygon}
    	 */
    	static fromGoogle(polygon) {
    		return new Polygon(
    			...polygon.getPaths().getArray().map(path => {
    				const p = path.getArray().map(Position.fromGoogle);
    				p.push(p[0]);
    				return p;
    			})
    		);
    	}
    }

    /**
     * Position used for GeoJSON. A position can have many keys.
     * If given an object instead of an array, the first and second
     * keys are set from the x and y properties.
     * Position is an iterable object, and as a result can be turned into an array
     * by using Array.from
     * @alias module:lib/geojson.Position
     * @see http://geojson.org/geojson-spec.html#positions
     */
    class Position$1 {
    	/**
    	 * @param {number[]|Object} values of the position.
    	 * @param {number} value.x - set as value[0]
    	 * @param {number} value.y - set as value[1]
    	 * @throws {TypeError} If value is not an array or an object with x and y
    	 */
    	constructor(value) {
    		if (typeof value[Symbol.iterator] === 'function') {
    			Object.assign(this, Array.from(value));
    		} else if ('x' in value && 'y' in value) {
    			const { x, y } = value;
    			Object.assign(this, { 0: x, 1: y });
    		} else {
    			throw new TypeError('Position must be called with ' +
    				'either an array or an object with properties x and y');
    		}
    	}

    	/** Similar to Promise.resolve(), converts value into a Position */
    	static from(value) {
    		if (value instanceof Position$1) return value;
    		return new Position$1(value);
    	}

    	/**
    	 * Converts Google Maps API LatLng to Position
    	 * @param {google.maps.LatLng} latlng
    	 * @returns {Position}
    	 */
    	static fromGoogle(latlng) {
    		return new Position$1([latlng.lng(), latlng.lat()]);
    	}

    	/**
    	 * For JSON.stringify serialization
    	 * @returns {Array}
    	 */
    	toJSON() {
    		return Array.from(this);
    	}

    	/**
    	 * Generator function to get values from this Position. Aligns with
    	 * interator protocol, and allows a position to be easily conveted into an
    	 * array.
    	 * @example
    	 * const position = new Position({x: 12, y: 34})
    	 * Array.from(position) //[12, 34]
    	 * [...position]        //[12, 34]
    	 * @returns {Generator}
    	 */
    	* [Symbol.iterator]() {
    		let i = 0;
    		while (true) {
    			if (i in this) yield this[i];
    			else break;
    			i++;
    		}
    	}

    	/**
    	 * @type {number} number of dimensions in this point. Let's you call push on
    	 * a position.
    	 * @example
    	 * let position = new Position([12, 34]);
    	 * [].push.call(position, 56);
    	 *
    	 * position.toJSON(); //[12, 34, 56]
    	 */
    	get length() {
    		return [...this].length;
    	}

    	// aliases
    	get lat() { return this[1]; }
    	get lng() { return this[0]; }
    	get x() { return this[0]; }
    	get y() { return this[1]; }
    }



    var GeoJSON = Object.freeze({
    	Feature: Feature,
    	FeatureCollection: FeatureCollection,
    	LineString: LineString,
    	Polygon: Polygon,
    	Position: Position$1
    });

    const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

    /**
     * A simple javascript utility for conditionally joining classNames together.
     * Slight ES6 adjustments from the fork.
     * @see https://github.com/JedWatson/classnames
     */
    function cx(...classes) {
    	const list = [];
    	for (const classname of classes) {
    		if (!classname) continue; // skip falsy values

    		const type = typeof classname;
    		if (type === 'string' || type === 'number') {
    			list.push(classname);
    		}	else if (Array.isArray(classname)) {
    			list.push(cx(...classname));
    		} else if (type === 'object') {
    			for (const key in classname) {
    				if (has(classname, key) && classname[key]) list.push(key);
    			}
    		}
    	}
    	return list.join(' ');
    }

    var asyncGenerator = function () {
      function AwaitValue(value) {
        this.value = value;
      }

      function AsyncGenerator(gen) {
        var front, back;

        function send(key, arg) {
          return new Promise(function (resolve, reject) {
            var request = {
              key: key,
              arg: arg,
              resolve: resolve,
              reject: reject,
              next: null
            };

            if (back) {
              back = back.next = request;
            } else {
              front = back = request;
              resume(key, arg);
            }
          });
        }

        function resume(key, arg) {
          try {
            var result = gen[key](arg);
            var value = result.value;

            if (value instanceof AwaitValue) {
              Promise.resolve(value.value).then(function (arg) {
                resume("next", arg);
              }, function (arg) {
                resume("throw", arg);
              });
            } else {
              settle(result.done ? "return" : "normal", result.value);
            }
          } catch (err) {
            settle("throw", err);
          }
        }

        function settle(type, value) {
          switch (type) {
            case "return":
              front.resolve({
                value: value,
                done: true
              });
              break;

            case "throw":
              front.reject(value);
              break;

            default:
              front.resolve({
                value: value,
                done: false
              });
              break;
          }

          front = front.next;

          if (front) {
            resume(front.key, front.arg);
          } else {
            back = null;
          }
        }

        this._invoke = send;

        if (typeof gen.return !== "function") {
          this.return = undefined;
        }
      }

      if (typeof Symbol === "function" && Symbol.asyncIterator) {
        AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
          return this;
        };
      }

      AsyncGenerator.prototype.next = function (arg) {
        return this._invoke("next", arg);
      };

      AsyncGenerator.prototype.throw = function (arg) {
        return this._invoke("throw", arg);
      };

      AsyncGenerator.prototype.return = function (arg) {
        return this._invoke("return", arg);
      };

      return {
        wrap: function (fn) {
          return function () {
            return new AsyncGenerator(fn.apply(this, arguments));
          };
        },
        await: function (value) {
          return new AwaitValue(value);
        }
      };
    }();

    var _extends$1 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /** @jsx createElement */

    /**
     * Presentational component for the main table. Mainly it distributes the props
     * among the child thead and tbody components
     */
    const Table$1 = props => react.createElement('table', _extends$1({}, props, {
    	className: cx('farmtable-Table', props.className)
    }));

    Table$1.propTypes = {
    	className: react.PropTypes.string
    };

    /** @jsx createElement */

    /** Presentational component for a thead */
    const Head = props => react.createElement(
    	'thead',
    	{
    		className: cx('farmtable-Head', props.headClassName)
    	},
    	react.createElement(
    		'tr',
    		{ className: cx('farmtable-Head-row', props.headRowClassName) },
    		props.children
    	)
    );

    Head.propTypes = {
    	children: react.PropTypes.node.isRequired,
    	headClassName: react.PropTypes.string,
    	headRowClassName: react.PropTypes.string
    };

    /** @jsx createElement */

    /** Presentational component for a tbody */
    const Body$1 = props => react.createElement('tbody', _extends$1({}, props, {
    	className: cx('farmtable-Body', props.className)
    }));

    Body$1.propTypes = {
    	className: react.PropTypes.string
    };

    /** @jsx createElement */

    /**
     * Presentational component for a table row
     */
    const Row$1 = props => react.createElement('tr', _extends$1({}, props, {
    	className: cx('farmtable-Row', props.className)
    }));

    Row$1.propTypes = {
    	className: react.PropTypes.string
    };

    /** @jsx createElement */

    /**
     * Presentational component for a table cell. If no children are set,
     * the cell will try to use the noDataText prop.
     */
    const Cell = props => react.createElement('td', _extends$1({}, props, {
    	className: cx('farmtable-Cell', props.className)
    }));

    Cell.propTypes = {
    	className: react.PropTypes.string
    };

    /** @jsx createElement */

    function simpleBind(func, ...args) {
    	if (!func) return null;
    	return (...eventArgs) => func(...args, ...eventArgs);
    }

    /**
     * Creates row with cell layout order matching that of the given columns
     */
    const Row = props => {
    	const { rowData: row, rowIndex: index } = props;

    	return react.createElement(
    		Row$1,
    		{
    			className: typeof props.rowClassName === 'function' ? props.rowClassName(row, props.rowIndex) : props.rowClassName,
    			onClick: simpleBind(props.onRowClick, row),
    			onMouseEnter: simpleBind(props.onRowMouseEnter, row),
    			onMouseLeave: simpleBind(props.onRowMouseLeave, row)
    		},
    		props.columns.map((column, colIndex) => {
    			const cell = row[column.field];

    			return react.createElement(
    				Cell,
    				{
    					key: column.field,
    					hidden: column.hidden,
    					className: typeof column.className === 'function' ? column.className(cell, row, index, colIndex) : column.className,
    					onClick: simpleBind(column.onCellClick, cell, row, index, colIndex)
    				},
    				column.format(cell, row)
    			);
    		})
    	);
    };

    Row.propTypes = {
    	rowData: react.PropTypes.object.isRequired,
    	columns: react.PropTypes.arrayOf(react.PropTypes.shape({
    		field: react.PropTypes.string.isRequired,
    		format: react.PropTypes.func, // (cell, row) => ReactNode
    		hidden: react.PropTypes.bool,
    		// (cell, row, rowIndex) => string
    		columnClassName: react.PropTypes.oneOfType([react.PropTypes.string, react.PropTypes.func]),
    		onCellClick: react.PropTypes.func })).isRequired,
    	rowIndex: react.PropTypes.number.isRequired,

    	// (row, rowIndex) => string
    	rowClassName: react.PropTypes.oneOfType([react.PropTypes.string, react.PropTypes.func]),

    	onRowClick: react.PropTypes.func, // (row) => void
    	onRowMouseEnter: react.PropTypes.func, // (row) => void
    	onRowMouseLeave: react.PropTypes.func };

    /** @jsx createElement */

    /** Presentational component for a tbody */
    const Body = props => {
    	let rows;
    	const table = props.tableData;

    	if (Array.isArray(table) || table instanceof Set) {
    		rows = Array.from(table).map((rowData, rowIndex) => react.createElement(Row, {
    			key: rowData[props.keyField],
    			rowData: rowData,
    			columns: props.columns,
    			rowIndex: rowIndex,
    			rowClassName: props.rowClassName,
    			onRowClick: props.onRowClick,
    			onRowMouseEnter: props.onRowMouseEnter,
    			onRowMouseLeave: props.onRowMouseLeave
    		}));
    	} else if (table instanceof Map) {
    		rows = Array.from(table).map(([key, rowData], rowIndex) => react.createElement(Row, {
    			key: key,
    			rowData: rowData,
    			columns: props.columns,
    			rowIndex: rowIndex,
    			rowClassName: props.rowClassName,
    			onRowClick: props.onRowClick,
    			onRowMouseEnter: props.onRowMouseEnter,
    			onRowMouseLeave: props.onRowMouseLeave
    		}));
    	} else {
    		rows = Object.keys(table).map((key, rowIndex) => react.createElement(Row, {
    			key: key,
    			rowData: table[key],
    			columns: props.columns,
    			rowIndex: rowIndex,
    			rowClassName: props.rowClassName,
    			onRowClick: props.onRowClick,
    			onRowMouseEnter: props.onRowMouseEnter,
    			onRowMouseLeave: props.onRowMouseLeave
    		}));
    	}

    	return react.createElement(
    		Body$1,
    		{ className: props.bodyClassName },
    		rows
    	);
    };

    Body.propTypes = {
    	tableData: react.PropTypes.oneOfType([react.PropTypes.arrayOf(react.PropTypes.object), react.PropTypes.instanceOf(Set), react.PropTypes.instanceOf(Map), react.PropTypes.object]).isRequired,
    	columns: react.PropTypes.arrayOf(react.PropTypes.object).isRequired,
    	keyField: react.PropTypes.string,

    	// (row, rowIndex) => string
    	rowClassName: react.PropTypes.oneOfType([react.PropTypes.string, react.PropTypes.func]),
    	bodyClassName: react.PropTypes.string,

    	onRowClick: react.PropTypes.func, // (row) => void
    	onRowMouseEnter: react.PropTypes.func,
    	onRowMouseLeave: react.PropTypes.func
    };

    /** @jsx createElement */

    function getKeyField(columns, keyFieldProp) {
    	if (keyFieldProp) return keyFieldProp;
    	for (const { isKey, field } of columns) {
    		if (isKey) return field;
    	}

    	throw new TypeError('No keyField detected');
    }

    const Table = props => {
    	const columns = react.Children.map(props.children, col => col.props);
    	let keyField;
    	if (Array.isArray(props.tableData) || props.tableData instanceof Set) {
    		keyField = getKeyField(columns, props.keyField);
    	}

    	return react.createElement(
    		Table$1,
    		{ className: props.tableClassName },
    		react.createElement(
    			Head,
    			{
    				headClassName: props.headClassName,
    				headRowClassName: props.headRowClassName
    			},
    			props.children
    		),
    		react.createElement(Body, {
    			keyField: keyField,
    			tableData: props.tableData,
    			columns: columns,
    			rowClassName: props.rowClassName,
    			bodyClassName: props.bodyClassName,
    			onRowClick: props.onRowClick,
    			onRowMouseEnter: props.onRowMouseEnter,
    			onRowMouseLeave: props.onRowMouseLeave
    		})
    	);
    };

    Table.propTypes = {
    	children: react.PropTypes.node.isRequired,
    	tableData: react.PropTypes.oneOfType([react.PropTypes.arrayOf(react.PropTypes.object), react.PropTypes.instanceOf(Set), react.PropTypes.instanceOf(Map), react.PropTypes.object]).isRequired,
    	keyField: react.PropTypes.string,

    	// (row, rowIndex) => string
    	rowClassName: react.PropTypes.oneOfType([react.PropTypes.string, react.PropTypes.func]),
    	tableClassName: react.PropTypes.string,
    	headClassName: react.PropTypes.string,
    	bodyClassName: react.PropTypes.string,
    	headRowClassName: react.PropTypes.string,

    	onRowClick: react.PropTypes.func, // (row) => void
    	onRowMouseEnter: react.PropTypes.func,
    	onRowMouseLeave: react.PropTypes.func,
    	onMouseEnter: react.PropTypes.func,
    	onMouseLeave: react.PropTypes.func
    };

    /** @jsx createElement */

    /** Presentational component for a th inside the thead */
    const HeadColumn$1 = props => react.createElement('th', _extends$1({
    	scope: 'col'
    }, props, {
    	className: cx('farmtable-HeadColumn', props.className)
    }));

    HeadColumn$1.propTypes = { className: react.PropTypes.string };

    /** @jsx createElement */

    const HeadColumn = props => react.createElement(
    	HeadColumn$1,
    	{
    		hidden: props.hidden,
    		onClick: props.onHeaderClick,
    		className: props.headerClassName
    	},
    	props.children
    );

    HeadColumn.propTypes = {
    	field: react.PropTypes.string.isRequired,
    	children: react.PropTypes.node,
    	isKey: react.PropTypes.bool,

    	format: react.PropTypes.func, // (cell, row) => ReactNode
    	hidden: react.PropTypes.bool,

    	// (cell, row, rowIndex) => string
    	columnClassName: react.PropTypes.oneOfType([react.PropTypes.string, react.PropTypes.func]),
    	headerClassName: react.PropTypes.string,

    	onHeaderClick: react.PropTypes.func,
    	onCellClick: react.PropTypes.func };

    HeadColumn.defaultProps = {
    	format: cell => cell,
    	hidden: false
    };

    /**
     * Returns a formatted currency string.
     * If value is NaN, an empty string is returned.
     * @param {number} cents
     * @param {string} [locale]
     * @param {Object} [options]
     * @param {boolean} [options.parentheses] - wrap negative numbers
     * in parentheses
     * @param {string} [options.currency=USD] - currency locale to return
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
     */
    function centsToString(cents, locale, options) {
    	if (typeof locale === 'object' && /undefined|string/.test(typeof options)) {
    		[locale, options] = [options, locale];
    	}

    	const float = cents / 100;
    	if (Number.isNaN(float)) return '';

    	const opts = Object.assign({ style: 'currency', currency: 'CAD' }, options);

    	if (opts.parentheses && float < 0) {
    		const positive = Math.abs(float);
    		const str = positive.toLocaleString(locale, opts);
    		return `(${str})`;
    	}

    	return float.toLocaleString(locale, opts);
    }

    /**
     * Converts a float representing dollars to a number representing cents
     * @param {number} float to convert into cents.
     * @param {boolean} [options.trunc] - truncate fractional cents.
     * If true, an integer will be returned.
     * @example
     * floatToCents(1.99) === 199
     * @example
     * floatToCents(8.959, { trunc: false }) === 895.9
     */
    function floatToCents(float, { trunc = false } = {}) {
    	if (typeof float !== 'number') {
    		throw new TypeError(`${float} must be a number`);
    	}

    	const centString = trunc ? float.toFixed(2) : float.toString(10);
    	const pointIndex = centString.indexOf('.');

    	if (pointIndex === -1) return float * 100;

    	const start = centString.slice(0, pointIndex);
    	const middle = centString.slice(pointIndex + 1, pointIndex + 3);
    	const end = centString.slice(pointIndex + 3);

    	if (end.length === 0) return parseInt(`${start}${middle}`, 10);

    	return parseFloat(`${start}${middle}.${end}`);
    }

    var moment = createCommonjsModule(function (module, exports) {
    //! moment.js
    //! version : 2.16.0
    //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
    //! license : MIT
    //! momentjs.com

    ;(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.moment = factory()
    }(commonjsGlobal, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        var k;
        for (k in obj) {
            // even if its not own property I'd still call it non-empty
            return false;
        }
        return true;
    }

    function isNumber(input) {
        return typeof value === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    var some$1 = some;

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var keys$1 = keys;

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    var indexOf$1 = indexOf;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return this._months;
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return this._monthsShort;
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        if (!m) {
            return this._weekdays;
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf$1.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // months
    // week
    // weekdays
    // meridiem
    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        ordinalParse: defaultOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                commonjsRequire('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    if (!localeFamilies[config.parentLocale]) {
                        localeFamilies[config.parentLocale] = [];
                    }
                    localeFamilies[config.parentLocale].push({
                        name: name,
                        config: config
                    });
                    return null;
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, parentConfig = baseConfig;
            // MERGE
            if (locales[name] != null) {
                parentConfig = locales[name]._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys$1(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 < this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$1 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIOROITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$1;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;

    // Year
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;

    // Week Year
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    proto.quarter = proto.quarters = getSetQuarter;

    // Month
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;

    // Week
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;

    // Hour
    proto.hour = proto.hours = getSetHour;

    // Minute
    proto.minute = proto.minutes = getSetMinute;

    // Second
    proto.second = proto.seconds = getSetSecond;

    // Millisecond
    proto.millisecond = proto.milliseconds = getSetMillisecond;

    // Offset
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;

    // Timezone
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;

    // Deprecations
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    // Month
    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;

    // Week
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function get$2 (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    // Deprecations
    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.16.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    return hooks;

    })));
    });

    var asyncGenerator$1 = function () {
      function AwaitValue(value) {
        this.value = value;
      }

      function AsyncGenerator(gen) {
        var front, back;

        function send(key, arg) {
          return new Promise(function (resolve, reject) {
            var request = {
              key: key,
              arg: arg,
              resolve: resolve,
              reject: reject,
              next: null
            };

            if (back) {
              back = back.next = request;
            } else {
              front = back = request;
              resume(key, arg);
            }
          });
        }

        function resume(key, arg) {
          try {
            var result = gen[key](arg);
            var value = result.value;

            if (value instanceof AwaitValue) {
              Promise.resolve(value.value).then(function (arg) {
                resume("next", arg);
              }, function (arg) {
                resume("throw", arg);
              });
            } else {
              settle(result.done ? "return" : "normal", result.value);
            }
          } catch (err) {
            settle("throw", err);
          }
        }

        function settle(type, value) {
          switch (type) {
            case "return":
              front.resolve({
                value: value,
                done: true
              });
              break;

            case "throw":
              front.reject(value);
              break;

            default:
              front.resolve({
                value: value,
                done: false
              });
              break;
          }

          front = front.next;

          if (front) {
            resume(front.key, front.arg);
          } else {
            back = null;
          }
        }

        this._invoke = send;

        if (typeof gen.return !== "function") {
          this.return = undefined;
        }
      }

      if (typeof Symbol === "function" && Symbol.asyncIterator) {
        AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
          return this;
        };
      }

      AsyncGenerator.prototype.next = function (arg) {
        return this._invoke("next", arg);
      };

      AsyncGenerator.prototype.throw = function (arg) {
        return this._invoke("throw", arg);
      };

      AsyncGenerator.prototype.return = function (arg) {
        return this._invoke("return", arg);
      };

      return {
        wrap: function (fn) {
          return function () {
            return new AsyncGenerator(fn.apply(this, arguments));
          };
        },
        await: function (value) {
          return new AwaitValue(value);
        }
      };
    }();

    var _extends$2 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /** @jsx createElement */

    function nullToNA(str) {
    	return str === null ? 'N/A' : str;
    }

    const InventoryTable = props => react.createElement(
    	Table,
    	_extends$2({}, props, {
    		rowClassName: row => props.selected === row.id ? 'row--selected' : null
    	}),
    	react.createElement(HeadColumn, {
    		field: 'id', isKey: true,
    		format: id => react.createElement('input', {
    			type: 'radio',
    			checked: props.selected === id,
    			onChange: () => props.onChange(id)
    		})
    	}),
    	react.createElement(
    		HeadColumn,
    		{ field: 'class' },
    		'Class'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'product' },
    		'Product'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'description' },
    		'Description'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'quantity', columnClassName: 'number-col' },
    		'Quantity'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'unit' },
    		'Unit'
    	),
    	react.createElement(
    		HeadColumn,
    		{
    			field: 'valuePerUnit',
    			columnClassName: 'number-col',
    			format: int => int ? centsToString(int) : null
    		},
    		'Value / unit'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'entryDate', columnClassName: 'number-col' },
    		'Entry date'
    	),
    	react.createElement(
    		HeadColumn,
    		{
    			field: 'lifeSpan',
    			format: iso => iso ? moment.duration(iso).humanize() : null
    		},
    		'Lifespan'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'location' },
    		'Location'
    	),
    	react.createElement(
    		HeadColumn,
    		{
    			field: 'salvageValue',
    			format: int => int ? centsToString(int) : nullToNA(int)
    		},
    		'Salvage Value'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'barcode' },
    		'Barcode'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'supplier', format: nullToNA },
    		'Supplier'
    	),
    	react.createElement(
    		HeadColumn,
    		{ field: 'sku', format: nullToNA },
    		'SKU'
    	)
    );

    InventoryTable.propTypes = {
    	selected: react.PropTypes.instanceOf(Set).isRequired,
    	onChange: react.PropTypes.func.isRequired
    };

    var InventoryTable$1 = connect(state => ({
    	tableData: getTable(state),
    	selected: getSelected(state)
    }), dispatch => ({
    	onChange: id => dispatch(toggle(id))
    }))(InventoryTable);

    function objectConverter(columns) {
      return new Function("d", "return {" + columns.map(function(name, i) {
        return JSON.stringify(name) + ": d[" + i + "]";
      }).join(",") + "}");
    }

    function customConverter(columns, f) {
      var object = objectConverter(columns);
      return function(row, i) {
        return f(object(row), i, columns);
      };
    }

    // Compute unique columns in order of discovery.
    function inferColumns(rows) {
      var columnSet = Object.create(null),
          columns = [];

      rows.forEach(function(row) {
        for (var column in row) {
          if (!(column in columnSet)) {
            columns.push(columnSet[column] = column);
          }
        }
      });

      return columns;
    }

    function dsv(delimiter) {
      var reFormat = new RegExp("[\"" + delimiter + "\n]"),
          delimiterCode = delimiter.charCodeAt(0);

      function parse(text, f) {
        var convert, columns, rows = parseRows(text, function(row, i) {
          if (convert) return convert(row, i - 1);
          columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
        });
        rows.columns = columns;
        return rows;
      }

      function parseRows(text, f) {
        var EOL = {}, // sentinel value for end-of-line
            EOF = {}, // sentinel value for end-of-file
            rows = [], // output rows
            N = text.length,
            I = 0, // current character index
            n = 0, // the current line number
            t, // the current token
            eol; // is the current token followed by EOL?

        function token() {
          if (I >= N) return EOF; // special case: end of file
          if (eol) return eol = false, EOL; // special case: end of line

          // special case: quotes
          var j = I, c;
          if (text.charCodeAt(j) === 34) {
            var i = j;
            while (i++ < N) {
              if (text.charCodeAt(i) === 34) {
                if (text.charCodeAt(i + 1) !== 34) break;
                ++i;
              }
            }
            I = i + 2;
            c = text.charCodeAt(i + 1);
            if (c === 13) {
              eol = true;
              if (text.charCodeAt(i + 2) === 10) ++I;
            } else if (c === 10) {
              eol = true;
            }
            return text.slice(j + 1, i).replace(/""/g, "\"");
          }

          // common case: find next delimiter or newline
          while (I < N) {
            var k = 1;
            c = text.charCodeAt(I++);
            if (c === 10) eol = true; // \n
            else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
            else if (c !== delimiterCode) continue;
            return text.slice(j, I - k);
          }

          // special case: last token before EOF
          return text.slice(j);
        }

        while ((t = token()) !== EOF) {
          var a = [];
          while (t !== EOL && t !== EOF) {
            a.push(t);
            t = token();
          }
          if (f && (a = f(a, n++)) == null) continue;
          rows.push(a);
        }

        return rows;
      }

      function format(rows, columns) {
        if (columns == null) columns = inferColumns(rows);
        return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
          return columns.map(function(column) {
            return formatValue(row[column]);
          }).join(delimiter);
        })).join("\n");
      }

      function formatRows(rows) {
        return rows.map(formatRow).join("\n");
      }

      function formatRow(row) {
        return row.map(formatValue).join(delimiter);
      }

      function formatValue(text) {
        return text == null ? ""
            : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\""
            : text;
      }

      return {
        parse: parse,
        parseRows: parseRows,
        format: format,
        formatRows: formatRows
      };
    }

    var csv = dsv(",");

    var csvFormat = csv.format;

    var tsv = dsv("\t");

    const fields = ['id', 'class', 'product', 'description', 'quantity', 'unit', 'valuePerUnit', 'entryDate', 'lifeSpan', 'location', 'salvageValue', 'barcode', 'supplier', 'sku'];

    function download(filename, text) {
    	const element = document.createElement('a');
    	element.setAttribute('href', `data:text/plain;charset=utf-8,${ encodeURIComponent(text) }`);
    	element.setAttribute('download', filename);
    	element.setAttribute('hidden', true);

    	document.body.appendChild(element);
    	element.click();
    	document.body.removeChild(element);
    }

    function createCSV(tableData) {
    	return csvFormat(tableData, fields);
    }

    function exportCSV(tableData) {
    	download('inventory.csv', createCSV(tableData));
    }

    const Toolbar = props => react.createElement(
    	'header',
    	{ className: 'inventory-Toolbar' },
    	react.createElement(
    		'button',
    		{
    			onClick: props.add
    		},
    		'Add Inventory Item'
    	),
    	react.createElement(
    		'button',
    		{
    			onClick: props.delete,
    			disabled: !props.anySelected
    		},
    		'Delete Item'
    	),
    	react.createElement(
    		'button',
    		{
    			onClick: props.export
    		},
    		'Export CSV'
    	)
    );

    function exportAction() {
    	return (dispatch, getState) => exportCSV(getTable(getState()));
    }

    var Toolbar$1 = connect(state => ({
    	anySelected: anySelected(state)
    }), dispatch => ({
    	delete: () => dispatch(deleteSelected()),
    	add: () => dispatch(startAdding()),
    	export: () => dispatch(exportAction())
    }))(Toolbar);

    var __moduleExports$49 = createCommonjsModule(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var getComponentName = function getComponentName(component) {
      return component.displayName || component.name;
    };

    exports.default = getComponentName;
    });

    unwrapExports(__moduleExports$49);

    var reformed = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _react = require$$3;

    var _react2 = _interopRequireDefault(_react);

    var _objectAssign = __moduleExports$3;

    var _objectAssign2 = _interopRequireDefault(_objectAssign);

    var _hoistNonReactStatics = __moduleExports$47;

    var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

    var _getComponentName = __moduleExports$49;

    var _getComponentName2 = _interopRequireDefault(_getComponentName);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var makeWrapper = function makeWrapper(middleware) {
      return function (WrappedComponent) {
        var FormWrapper = function (_React$Component) {
          _inherits(FormWrapper, _React$Component);

          function FormWrapper(props, ctx) {
            _classCallCheck(this, FormWrapper);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FormWrapper).call(this, props, ctx));

            _this.setModel = function (model) {
              _this.setState({ model: model });
              return model;
            };

            _this.setProperty = function (prop, value) {
              return _this.setModel((0, _objectAssign2.default)({}, _this.state.model, _defineProperty({}, prop, value)));
            };

            _this.bindToChangeEvent = function (e) {
              var _e$target = e.target;
              var name = _e$target.name;
              var type = _e$target.type;
              var value = _e$target.value;


              if (type === 'checkbox') {
                var oldCheckboxValue = _this.state.model[name] || [];
                var newCheckboxValue = e.target.checked ? oldCheckboxValue.concat(value) : oldCheckboxValue.filter(function (v) {
                  return v !== value;
                });

                _this.setProperty(name, newCheckboxValue);
              } else {
                _this.setProperty(name, value);
              }
            };

            _this.bindInput = function (name) {
              return {
                name: name,
                value: _this.state.model[name],
                onChange: _this.bindToChangeEvent
              };
            };

            _this.state = {
              model: props.initialModel || {}
            };
            return _this;
          }

          // This, of course, does not handle all possible inputs. In such cases,
          // you should just use `setProperty` or `setModel`. Or, better yet,
          // extend `reformed` to supply the bindings that match your needs.


          _createClass(FormWrapper, [{
            key: 'render',
            value: function render() {
              var nextProps = (0, _objectAssign2.default)({}, this.props, {
                bindInput: this.bindInput,
                bindToChangeEvent: this.bindToChangeEvent,
                model: this.state.model,
                setProperty: this.setProperty,
                setModel: this.setModel
              });
              // SIDE EFFECT-ABLE. Just for developer convenience and expirementation.
              var finalProps = typeof middleware === 'function' ? middleware(nextProps) : nextProps;

              return _react2.default.createElement(WrappedComponent, finalProps);
            }
          }]);

          return FormWrapper;
        }(_react2.default.Component);

        FormWrapper.propTypes = {
          initialModel: _react2.default.PropTypes.object
        };


        FormWrapper.displayName = 'Reformed(' + (0, _getComponentName2.default)(WrappedComponent) + ')';
        return (0, _hoistNonReactStatics2.default)(FormWrapper, WrappedComponent);
      };
    };

    exports.default = makeWrapper;
    });

    var reformed$1 = unwrapExports(reformed);

    /**
     * An object containing a geometry and some other properties
     * @alias module:lib/geojson.Feature
     * @see http://geojson.org/geojson-spec.html#feature-objects
     */
    class Feature$1 {
    	get type() { return 'Feature'; }

    	/**
    	 * @param {Geometry} geometry
    	 * @param {Object} properties
    	 * @param {any} [id]
    	 */
    	constructor(geometry, properties = null, id) {
    		Object.assign(this, { geometry, properties });
    		if (id) this.id = id;
    	}

    	/** @returns {Object} */
    	toJSON() {
    		const { type, geometry, properties, id } = this;
    		const json = { type, geometry, properties };
    		if (id) json.id = id;
    		return json;
    	}
    }

    /**
     * A collection of Features. Acts like it has a GeoJSON shape
     * but it's just some fluff over an array. Consequently you can use
     * any array methods directly on the FeatureCollection instead of
     * on FeatureCollection#features.
     * @extends Array
     * @alias module:lib/geojson.FeatureCollection
     * @see http://geojson.org/geojson-spec.html#feature-collection-objects
     */
    class FeatureCollection$1 extends Array {
    	get type() { return 'FeatureCollection'; }

    	/** @param {Feature[]} features - an array or iterable of Features */
    	constructor(features) {
    		super();
    		this.push(...features);
    	}

    	/**
    	 * @type {Feature[]|Iterable<Feature>} returns the array.
    	 * Setting a value here will clear the array then push the values with
    	 * a spread operator, meaning an iterator can be used instead of an array.
    	 */
    	get features() { return this; }
    	set features(values) {
    		this.length = 0;
    		this.push(...values);
    	}

    	/**
    	 * Called by JSON.stringify. Returns an object that matches the
    	 * GeoJSON spec.
    	 * @example
    	 * featureCollection == [featureA, featureB]
    	 * featureCollection.toJSON() == {
    	 *   type: 'FeatureCollection',
    	 *   features: [featureA, featureB]
    	 * }
    	 * @returns {Object}
    	 */
    	toJSON() {
    		const { type } = this;
    		return { type, features: Array.from(this) };
    	}
    }

    /**
     * Position used for GeoJSON. A position can have many keys.
     * If given an object instead of an array, the first and second
     * keys are set from the x and y properties.
     * Position is an iterable object, and as a result can be turned into an array
     * by using Array.from
     * @alias module:lib/geojson.Position
     * @see http://geojson.org/geojson-spec.html#positions
     */
    class Position$1$1 {
    	/**
    	 * @param {number[]|Object} values of the position.
    	 * @param {number} value.x - set as value[0]
    	 * @param {number} value.y - set as value[1]
    	 * @throws {TypeError} If value is not an array or an object with x and y
    	 */
    	constructor(value) {
    		if (typeof value[Symbol.iterator] === 'function') {
    			Object.assign(this, Array.from(value));
    		} else if ('x' in value && 'y' in value) {
    			const { x, y } = value;
    			Object.assign(this, { 0: x, 1: y });
    		} else {
    			throw new TypeError('Position must be called with ' +
    				'either an array or an object with properties x and y');
    		}
    	}

    	/** Similar to Promise.resolve(), converts value into a Position */
    	static from(value) {
    		if (value instanceof Position$1$1) return value;
    		return new Position$1$1(value);
    	}

    	/**
    	 * Converts Google Maps API LatLng to Position
    	 * @param {google.maps.LatLng} latlng
    	 * @returns {Position}
    	 */
    	static fromGoogle(latlng) {
    		return new Position$1$1([latlng.lng(), latlng.lat()]);
    	}

    	/**
    	 * For JSON.stringify serialization
    	 * @returns {Array}
    	 */
    	toJSON() {
    		return Array.from(this);
    	}

    	/**
    	 * Generator function to get values from this Position. Aligns with
    	 * interator protocol, and allows a position to be easily conveted into an
    	 * array.
    	 * @example
    	 * const position = new Position({x: 12, y: 34})
    	 * Array.from(position) //[12, 34]
    	 * [...position]        //[12, 34]
    	 * @returns {Generator}
    	 */
    	* [Symbol.iterator]() {
    		let i = 0;
    		while (true) {
    			if (i in this) yield this[i];
    			else break;
    			i++;
    		}
    	}

    	/**
    	 * @type {number} number of dimensions in this point. Let's you call push on
    	 * a position.
    	 * @example
    	 * let position = new Position([12, 34]);
    	 * [].push.call(position, 56);
    	 *
    	 * position.toJSON(); //[12, 34, 56]
    	 */
    	get length() {
    		return [...this].length;
    	}

    	// aliases
    	get lat() { return this[1]; }
    	get lng() { return this[0]; }
    	get x() { return this[0]; }
    	get y() { return this[1]; }
    }

    /**
     * Base class for Geometry objects such as Polygons
     */
    class Geometry$1 {
    	toJSON() {
    		const { type, coordinates } = this;
    		return { type, coordinates };
    	}

    	static parse(geojson) {
    		return Object.assign(new this(), geojson);
    	}

    	/**
    	 * Similar to Promise.resolve(): converts the value into a Geometry if it
    	 * isn't one already.
    	 * @param {Geometry|*} value
    	 */
    	static from(value) {
    		if (value instanceof this) return value;
    		else if (value.type && String(value.type) === this.type) {
    			return new this(value.coordinates);
    		}

    		return new this(value);
    	}
    }

    /**
     * A string of positions that forms a line
     * @extends module:lib/geojson~Geometry
     * @alias module:lib/geojson.LineString
     * @see http://geojson.org/geojson-spec.html#linestring
     */
    class LineString$1$1 extends Geometry$1 {
    	get type() { return 'LineString'; }

    	/** @param {Position[]} positions */
    	constructor(positions) {
    		super();
    		/** @type {Position[]} */
    		this.coordinates = positions.map(Position$1$1.from);
    	}
    }

    /**
     * A string of positions that forms a line
     * @extends module:lib/geojson~Geometry
     * @alias module:lib/geojson.LineString
     * @see http://geojson.org/geojson-spec.html#linestring
     */
    class LineString$1$2 extends Geometry$1 {
    	get type() { return 'LineString'; }

    	/** @param {Position[]} positions */
    	constructor(positions) {
    		super();
    		/** @type {Position[]} */
    		this.coordinates = positions.map(Position$1$1.from);
    	}
    }

    /**
     * Polygon coordinates contains LineStrings where the last point is equal to
     * the first point. If multiple lines are specified, the first will be the
     * exterior ring and the others will be holes in the polygon.
     * @extends module:lib/geojson~Geometry
     * @alias module:lib/geojson.Polygon
     * @see http://geojson.org/geojson-spec.html#polygon
     */
    class Polygon$1 extends Geometry$1 {
    	get type() { return 'Polygon'; }

    	/** @param {...LineString} lines */
    	constructor(...lines) {
    		super();
    		/** @type {Position[][]} */
    		this.coordinates = lines.map(line => new LineString$1$2(line).coordinates);
    	}

    	/**
    	 * Converts value into a Polygon
    	 * @param {Polygon|*} value
    	 */
    	static from(value) {
    		if (Array.isArray(value)) return new Polygon$1(value);
    		return super.from(value);
    	}

    	/**
    	 * Converts Google Maps API Polygon to GeoJSON Polygon
    	 * @param {google.maps.Polygon} polygon
    	 * @returns {Polygon}
    	 */
    	static fromGoogle(polygon) {
    		return new Polygon$1(
    			...polygon.getPaths().getArray().map(path => {
    				const p = path.getArray().map(Position$1$1.fromGoogle);
    				p.push(p[0]);
    				return p;
    			})
    		);
    	}
    }

    /**
     * Position used for GeoJSON. A position can have many keys.
     * If given an object instead of an array, the first and second
     * keys are set from the x and y properties.
     * Position is an iterable object, and as a result can be turned into an array
     * by using Array.from
     * @alias module:lib/geojson.Position
     * @see http://geojson.org/geojson-spec.html#positions
     */
    class Position$1$2 {
    	/**
    	 * @param {number[]|Object} values of the position.
    	 * @param {number} value.x - set as value[0]
    	 * @param {number} value.y - set as value[1]
    	 * @throws {TypeError} If value is not an array or an object with x and y
    	 */
    	constructor(value) {
    		if (typeof value[Symbol.iterator] === 'function') {
    			Object.assign(this, Array.from(value));
    		} else if ('x' in value && 'y' in value) {
    			const { x, y } = value;
    			Object.assign(this, { 0: x, 1: y });
    		} else {
    			throw new TypeError('Position must be called with ' +
    				'either an array or an object with properties x and y');
    		}
    	}

    	/** Similar to Promise.resolve(), converts value into a Position */
    	static from(value) {
    		if (value instanceof Position$1$2) return value;
    		return new Position$1$2(value);
    	}

    	/**
    	 * Converts Google Maps API LatLng to Position
    	 * @param {google.maps.LatLng} latlng
    	 * @returns {Position}
    	 */
    	static fromGoogle(latlng) {
    		return new Position$1$2([latlng.lng(), latlng.lat()]);
    	}

    	/**
    	 * For JSON.stringify serialization
    	 * @returns {Array}
    	 */
    	toJSON() {
    		return Array.from(this);
    	}

    	/**
    	 * Generator function to get values from this Position. Aligns with
    	 * interator protocol, and allows a position to be easily conveted into an
    	 * array.
    	 * @example
    	 * const position = new Position({x: 12, y: 34})
    	 * Array.from(position) //[12, 34]
    	 * [...position]        //[12, 34]
    	 * @returns {Generator}
    	 */
    	* [Symbol.iterator]() {
    		let i = 0;
    		while (true) {
    			if (i in this) yield this[i];
    			else break;
    			i++;
    		}
    	}

    	/**
    	 * @type {number} number of dimensions in this point. Let's you call push on
    	 * a position.
    	 * @example
    	 * let position = new Position([12, 34]);
    	 * [].push.call(position, 56);
    	 *
    	 * position.toJSON(); //[12, 34, 56]
    	 */
    	get length() {
    		return [...this].length;
    	}

    	// aliases
    	get lat() { return this[1]; }
    	get lng() { return this[0]; }
    	get x() { return this[0]; }
    	get y() { return this[1]; }
    }



    var GeoJSON$1 = Object.freeze({
    	Feature: Feature$1,
    	FeatureCollection: FeatureCollection$1,
    	LineString: LineString$1$1,
    	Polygon: Polygon$1,
    	Position: Position$1$2
    });

    const has$1 = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

    /**
     * A simple javascript utility for conditionally joining classNames together.
     * Slight ES6 adjustments from the fork.
     * @see https://github.com/JedWatson/classnames
     */
    function classList(...classes) {
    	const list = [];
    	for (const classname of classes) {
    		if (!classname) continue; // skip falsy values

    		const type = typeof classname;
    		if (type === 'string' || type === 'number') {
    			list.push(classname);
    		}	else if (Array.isArray(classname)) {
    			list.push(classList(...classname));
    		} else if (type === 'object') {
    			for (const key in classname) {
    				if (has$1(classname, key) && classname[key]) list.push(key);
    			}
    		}
    	}
    	return list.join(' ');
    }

    /**
     * Generate unique IDs. Guaranteed to be unique when compared to other strings
     * generated by this function. The strings are complex enough that they
     * shouldn't be accidentally duplicated by hand.
     *
     * Math.random should be unqiue because of its seeding algorithm.
     * Convert it to base 36 (numbers + letters), and grab the first 9 characters
     * after the decimal.
     *
     * @returns {string}
     * @see https://gist.github.com/gordonbrander/2230317
     */
    const id = () => `_${Math.random().toString(36).substr(2, 9)}`;

    /**
     * @param {Object} inputValues from a form
     * @returns {Array} row to be added to table
     */
    function inputToRow(inputValues) {
    	const {
    		valuePerUnit,
    		entryDate,
    		lifeSpan,
    		salvageValue
    	} = inputValues;

    	return {
    		id: id(),
    		class: inputValues.class || 'Variable',
    		product: inputValues.product,
    		description: inputValues.description,
    		quantity: inputValues.quantity,
    		unit: inputValues.unit,
    		valuePerUnit: valuePerUnit ? floatToCents(parseFloat(valuePerUnit)) : valuePerUnit,
    		entryDate: entryDate ? moment(entryDate).format('DD/M/YY') : entryDate,
    		lifeSpan: lifeSpan ? moment.duration(lifeSpan).toJSON() : lifeSpan,
    		location: inputValues.location,
    		salvageValue: salvageValue ? floatToCents(parseFloat(salvageValue)) : salvageValue,
    		barcode: inputValues.barcode,
    		supplier: inputValues.supplier,
    		sku: inputValues.sku
    	};
    }

    const AddItem = ({ bindInput, model, onSubmit, className }) => react.createElement(
    	'form',
    	{
    		onSubmit: e => {
    			e.preventDefault();onSubmit(model);
    		},
    		className: classList('inventory-AddItem', className)
    	},
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'class' },
    			'Class'
    		),
    		react.createElement(
    			'select',
    			bindInput('class'),
    			react.createElement(
    				'option',
    				{ value: 'Variable' },
    				'Variable'
    			),
    			react.createElement(
    				'option',
    				{ value: 'Fixed' },
    				'Fixed'
    			)
    		)
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'product' },
    			'Product'
    		),
    		react.createElement('input', _extends$2({ type: 'text' }, bindInput('product')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'description' },
    			'Description'
    		),
    		react.createElement('input', _extends$2({ type: 'text' }, bindInput('description')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'quantity' },
    			'Quantity'
    		),
    		react.createElement('input', _extends$2({ type: 'number' }, bindInput('quantity')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'unit' },
    			'Unit'
    		),
    		react.createElement(
    			'select',
    			bindInput('unit'),
    			react.createElement(
    				'option',
    				{ value: '' },
    				'N/A'
    			),
    			react.createElement(
    				'option',
    				{ value: 'kg' },
    				'kg'
    			),
    			react.createElement(
    				'option',
    				{ value: 'each' },
    				'each'
    			)
    		)
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'valuePerUnit' },
    			'Value / unit'
    		),
    		react.createElement('input', _extends$2({ type: 'number', step: '0.01' }, bindInput('valuePerUnit')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'entryDate' },
    			'Entry date'
    		),
    		react.createElement('input', _extends$2({ type: 'date' }, bindInput('entryDate')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'lifeSpan' },
    			'Lifespan'
    		),
    		react.createElement('input', _extends$2({ type: 'text' }, bindInput('lifeSpan')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'location' },
    			'Location'
    		),
    		react.createElement('input', _extends$2({ type: 'text' }, bindInput('location')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'salvageValue' },
    			'Salvage Value'
    		),
    		react.createElement('input', _extends$2({ type: 'number', step: '0.01' }, bindInput('salvageValue')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'barcode' },
    			'Barcode'
    		),
    		react.createElement('input', _extends$2({ type: 'text' }, bindInput('barcode')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'supplier' },
    			'Supplier'
    		),
    		react.createElement('input', _extends$2({ type: 'text' }, bindInput('supplier')))
    	),
    	react.createElement(
    		'div',
    		{ className: 'inventory-AddItem-row' },
    		react.createElement(
    			'label',
    			{ htmlFor: 'sku' },
    			'SKU'
    		),
    		react.createElement('input', _extends$2({ type: 'text' }, bindInput('sku')))
    	),
    	react.createElement(
    		'button',
    		{ type: 'submit' },
    		'Add'
    	)
    );

    AddItem.propTypes = {
    	onSubmit: react.PropTypes.func.isRequired,
    	model: react.PropTypes.object.isRequired,
    	bindInput: react.PropTypes.func.isRequired,
    	className: react.PropTypes.string
    };

    var AddItem$1 = connect(state => ({
    	className: isAdding(state) ? 'inventory-AddItem--open' : null,
    	initialModel: {
    		class: 'Variable',
    		product: '',
    		description: '',
    		quantity: '',
    		unit: '',
    		valuePerUnit: '',
    		entryDate: '',
    		lifeSpan: '',
    		location: '',
    		salvageValue: '',
    		barcode: '',
    		supplier: '',
    		sku: ''
    	}
    }), dispatch => ({
    	onSubmit(model) {
    		dispatch(addRow(inputToRow(model)));
    		dispatch(stopAdding());
    	}
    }))(reformed$1()(AddItem));

    const TableContainer = () => react.createElement(
    	'div',
    	{ className: 'inventory-TableContainer' },
    	react.createElement(AddItem$1, null),
    	react.createElement(Toolbar$1, null),
    	react.createElement(InventoryTable$1, null)
    );

    interactive.then(() => reactDom.render(react.createElement(
    	Provider,
    	{ store: store },
    	react.createElement(TableContainer, null)
    ), document.getElementById('reactRoot')));

}(React,ReactDOM));
//# sourceMappingURL=index.js.map
