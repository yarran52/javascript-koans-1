describe('Chapter 15 Functional programing', function() {
	describe('Functions are data types', function() {
		it('check the type of a function', function() {
			function getPerson() {
				return 'John';
			}

			//assert.strictEquals(typeof getPerson, ???);
			//assert.strictEquals(getPerson(), ???);
		});

		it('Difference between assign or invoke a function', function() {
			function baz() {
				return 'abc';
			}

			var foo = baz; //Assing
			var bar = baz(); //Invoke

			//assert.strictEquals(typeof foo, ???);
			//assert.strictEquals(typeof bar, ???);
		});
	});

	describe('Passing functions as parameters', function() {
		it('functions without parameters', function() {
			function foo(fn) {
				return fn();
			}

			function bar() {
				return 'baz';
			}

			//assert.strictEqual(typeof foo, ???);
			//assert.strictEqual(foo(bar), ???);


		});

		it('functions without parameters2', function() {
			function foo(check, fn1, fn2) {
				if (check) {
					return fn1();
				} else {
					return fn2();
				}
			}

			function bar() {
				return 'abc';
			}


			function baz() {
				return 'xyz';
			}

			//assert.strictEqual(foo(false, bar, baz), ???);
			//assert.strictEqual(foo(???), 'abc');
		});

		it('functions with parameters', function() {
			function foo(fn) {
				return fn(2, 6);
			}

			function bar(x, y) {
				return x + y;
			}

			//assert.strictEqual(foo(bar), ???);
		});


		it('functions with parameters2', function() {
			function foo(x, y, z, fn) {
				//return z + fn(???);
			}

			function bar(x, y) {
				return x + y;
			}

			//assert.strictEqual(foo(1, 3, 5, bar), 9);
		});
	});


	describe('Returning functions', function() {
		it('functions without parameters', function() {
			function foo(fn) {
				return fn;
			}

			function bar() {
				return 'abc';
			}

			//assert.strictEqual(typeof bar, 'function');
			//assert.strictEqual(typeof foo, 'function');
			//assert.strictEqual(typeof foo(), 'undefined');
			//assert.strictEqual(foo(), undefined);

			var baz = foo(bar);
			//assert.strictEqual(baz(), 'abc');
			//assert.strictEqual(foo(bar)(), 'abc');
		});

		it('functions without parameters2', function() {
			function foo(check, fn1, fn2) {
				if (check) {
					return fn1;
				} else {
					return fn2;
				}
			}

			function bar() {
				return 'abc';
			}


			function baz() {
				return 'xyz';
			}

			//assert.strictEqual(foo(true, bar, baz), ???); //Think: What is returnning foo?
			//assert.strictEqual(foo(???)(), 'xyz');
		});


		it('functions with parameters', function() {
			function foo(isSum, fn1, fn2) {
				if (isSum) {
					return fn1;
				} else {
					return fn2;
				}
			}

			function bar(x, y) {
				return x + y;
			}


			function baz(x, y) {
				return x - y;
			}

			assert.strictEqual(foo(true, bar, baz)(1, 3), 4);
			//assert.strictEqual(foo(false, bar, baz)(???), -7);
		});


		it('functions with parameters 2', function() {
			function foo(fn1, z) {

				var fn2 = function(x, y) {
					return 2 * x - y;
				};
				return fn1(fn2, 1, 3, z);
			}

			function bar(fn, x, y, z) {
				return fn(x, y) + z;
			}

			//assert.strictEqual(foo(???), 2);
		});


		it('Passing and returning anonymous functions', function() {
			function foo(fn) {
				return function(x, y) {
					return 5 + fn(x, y);
				};
			}

			/*assert.strictEqual(foo(
			 function(x, y) {
			 return x + y;
			 })(???),
			 9);*/

		});
	});

	describe('Exercises', function() {
		it('Exercise 1', function() {
			
			function add() {
				var i;
				var sum = 0;
				for (i = 0; i < arguments.length; i++) {
					sum += arguments[i];
				}
				return sum;
			}
			
			function filterAnSum(min, max, fn) {
				return function() {
					var i;
					var args = [];
					for (i = 0; i < arguments.length; i++) {
						if (min <= arguments[i] && arguments[i] <= max) {
							args.push(arguments[i]); //push() -> to add to array
						}
					}
					return add.apply(null, args);
				};
			}


			//assert.strictEqual(filter(1, 6, filterAnSum)(1, 4, 6), ???);
			//assert.strictEqual(filter(1, ???, filterAnSum)(1, 4, 6, 2, 3), 6);


			function maxDiff() {
				//Implement: returns the max differente between the min and the max value
			}

			//assert.strictEqual(filter(1, 6, maxDiff)(1, 4, 7), 3); // 4 - 1
			//assert.strictEqual(filter(1, 4, maxDiff)(1, 4, 6, 2, 3), 3); // 4 - 1

		});

		it('Exercise 1 refactored: clean code + functional programming', function() {
			
			function filter(arr, fn, filterArr) {
				filterArr = filterArr || [];

				if (fn(arr[0])) {
					filterArr.push(arr[0]);
				}

				var remainingArr = arr.slice(1);

				if (remainingArr.length > 0) {
					return filter(remainingArr, fn, filterArr);
				} else {
					return filterArr;
				}
			}

			
			function reduce(arr, fn, initial) {

				initial = fn(initial, arr[0]);

				var remainingArr = arr.slice(1);

				if (remainingArr.length > 0) {
					return reduce(remainingArr, fn, initial);
				} else {
					return initial;
				}
			}
			
			function checkInRange(value, min, max) {
				return min <= value && value <= max;
			}

			function add(x, y) {
				return x + y;
			}
			
			var filterInRange = function(arr, max, min) {
				var rangeFilterFunction = function(value) {
					return checkInRange(value, max, min);
				};
				return filter(arr, rangeFilterFunction);
			};

			var arraySum = function(arr) {
				return reduce(arr, add, 0);
			};

			var calculateSum = function(arr, max, min) {
				var filterNumbers = filterInRange(arr, max, min);
				return arraySum(filterNumbers);
			};
			
			assert.strictEqual(calculateSum([1, 2, 3, 6, 8, 5], 1, 4), 6);


			function diff(x, y) {
				return x - y;
			}

			function max(x, y) {
				if (x > y) {
					return x;
				} else {
					return y;
				}
			}

			function min(x, y) {
				if (x < y) {
					return x;
				} else {
					return y;
				}
			}

			var arrayMax = function(arr) {
				return reduce(arr, max, 0);
			};

			var arrayMin = function(arr) {
				return reduce(arr, min, 0);
			};

			var calculateMaxDiff = function(arr, maxNumber, minNumber) {
				var arrFilter = filterInRange(arr, maxNumber, minNumber);
				var max = arrayMax(arrFilter);
				var min = arrayMin(arrFilter);
				return diff(max, min);
			};

			assert.strictEqual(calculateMaxDiff([1, 2, 3, 6, 8, 5], 1, 4), 3);

		});

		it('Exercise 1 refactored: using JavaScript API functions', function() {

			function calculateSum(arr, min, max) {
				return arr.filter(function(value) {
					return min <= value && value <= max;
				}).reduce(function(sum, value) {
					return sum + value;
				}, 0);
			}

			function calculateMaxDiff(arr, min, max) {
				var numbers = arr.filter(function(value) {
					return min <= value && value <= max;
				});

				return Math.max.apply(null, numbers) - Math.min.apply(null, numbers);
			}

			assert.strictEqual(calculateSum([1, 5, 3, 6, 2], 1, 4), 6);
			assert.strictEqual(calculateMaxDiff([1, 5, 3, 6, 2], 1, 4), 2);


		});

		it('Exercise 1 refactored: using JavaScript API functions + clean code', function() {

			function calculateSum(arr, min, max) {
				var filterNumbers = filterInRange(arr, min, max);
				var sum = arraySum(filterNumbers);
				return sum;
			}

			function calculateMaxDiff(arr, min, max) {
				var filterNumbers = filterInRange(arr, min, max);
				var diff = maxDiff(filterNumbers);
				return diff;
			}
			
			function filterInRange(arr, min, max) {
				var rangeFilterFunction = function (value) {
					return checkInRange(value, min, max);
				};
				return arr.filter(rangeFilterFunction);
			}
			
			function arraySum(arr) {
				return arr.reduce(add, 0);
			}
			
			function add(x, y) {
				return x + y;
			}
			
			function diff(x, y) {
				return x -y;
			}
			
			function checkInRange(value, min, max) {
				return min <= value && value <= max;
			}
			
			function maxDiff(numbers) {
				var max = Math.max.apply(null, numbers);
				var min = Math.min.apply(null, numbers);
				return  diff(max, min);
			}

			assert.strictEqual(calculateSum([1, 5, 3, 6, 2], 1, 4), 6);
			assert.strictEqual(calculateMaxDiff([1, 5, 3, 6, 2], 1, 4), 2);
		});
	});
});
