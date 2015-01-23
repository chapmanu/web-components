# make-sync [![Build Status](https://secure.travis-ci.org/sebv/node-make-sync.png?branch=master)](http://travis-ci.org/sebv/node-make-sync)


This module uses  [node-fibers](http://github.com/laverdet/node-fibers) to transform asynchronous functions into 
synchronous ones. This is designed to work with asynchronous functions following the standard ('done' callback 
as the last arg).

The main commands are:

*   MakeSync to synchronize a function or object.
*   Sync to start a sync environment (starts a fiber).

When applied to an object, MakeSync patches all the object methods by default. 
It is also possible to pass some options to be more specific.

The following modes may be used to to make function synchronous (see description
further down):
   - sync (default)
   - async
   - mixed-args (default 'mixed')
   - mixed-fibers


## install

```
npm install make-sync
```


## usage (coffeescript)

### simple example

```coffeescript
{Sync, MakeSync} = require 'make-sync'

f = (a,b,done) ->
  res = a+b
  done null, res

# making synchronous 
f = MakeSync f

# sync call
Sync ->
  res = f 1, 2
  console.log "sync ->", res 

obj = 
  f: (a,b,done) ->
    res = a+b
    done null, res

# making synchronous
MakeSync obj

# sync call  
Sync ->
  res = obj.f 1, 2
  console.log "obj sync ->", res   
```


## modes

### sync (default)

```coffeescript
f = MakeSync f
# or
f = MakeSync f, mode:'sync'
```

This mode assumes that the function is always called in sync mode within a 
fiber, so that the 'done' callback is never there. (ie if there is a function
at the end it will assume this is a function argument and add it own callback)


### async

```coffeescript
f = MakeSync f, mode:'async'
```

This mode assumes that the function is always called in asynchronous mode, 
so doesn't change the function behavior. (probably not useful in most case)  


### mixed-args (default mixed)

```coffeescript
f = MakeSync f, mode:'mixed'
# or
f = MakeSync f, mode:['mixed', 'args']
```

This mode uses the function arguments to determine wether it needs
to be called synchronously or asynchronously. When the last 
argument is a function, MakeSync assume the last argument is the 'done' callback. 
There may be some issues when using other function arguments. Please refer 
to the section below.


#### fixed numbers of args /  function arguments

This only applies when using the mixed-args mode and calling the function synchronously.

There are 2 strategies to resolve the confusion between the 'done' callback and other
function argument, when those are passed at the end of the argument list:

* use undefined as the last argument 
* pass the number of arguments expected (excluding the callback) to MakeSync.

```coffeescript
{Sync, MakeSync} = require 'make-sync'

f = (a,b, _g, done) ->
  res = a + b + _g()
  done null, res

g = -> 10

# synchronizing (not using a fixed number of arg)  
f1 = MakeSync f, mode:['mixed', 'args']

Sync ->
  try f1 1, 2, g catch error 
    console.log "f1 throws" # thinks that g is the callback

  res = f1 1, 2, g, undefined # ok when passing undefined at the end 
  console.log "f1 sync ->", res 

# passing a fixed number of args 
f2 = MakeSync f, {mode:['mixed','args'], num_of_args: 3}

Sync ->
  res = f2 1, 2, g # it works 
  console.log "f2 sync ->", res 
```


### mixed-fibers

```coffeescript
f = MakeSync f, mode:['mixed','fibers']
```

When using this mode, MakeSync checks wether a fiber is currently available,
using 'Fiber.current', and uses the sync or async mode accordingly.

## return and error handling in sync mode

This can be configured using the sync-return option. 


### argument matcher

Argument matchers works like the coffeescript arguments with splats. MakeSync will match the arguments passed
to the callback using this pattern. If err is defined it will throw it, otherwise res will be
returned. (When using splats on res, res becomes an array)

```coffeescript
{Sync, MakeSync} = require 'make-sync'

# err + res 
f = (done) -> done null, 'A'
syncF = MakeSync f, 'sync-return': 'err,res'
Sync ->
  console.log syncF()

# single res 
f = (done) -> done 'B'
syncF = MakeSync f, 'sync-return': 'res'
Sync ->
  console.log syncF()

# return error + res array 
f = (done) -> done null, 'C1', 'C2' 
syncF = MakeSync f, 'sync-return': 'err, res...'
Sync ->
  console.log syncF()
 
# res array 
f = (done) -> done 'D1', 'D2' 
syncF = MakeSync f, 'sync-return': 'res...'
Sync ->
  console.log syncF()

# the second result only
f = (done) -> done 'E1', 'E2' , 'E3'
syncF = MakeSync f, 'sync-return': 'ignoreFirst, res, ignoreLast...'
Sync ->
  console.log syncF()
```


### function

If matchers are not sufficient, you may use a function instead. This function will receive the same arguments
as the callback, and its return will be the final result returned.

```coffeescript
{Sync, MakeSync} = require 'make-sync'

f = (done) -> done null, 10, 20
options = 
  'sync-return': (err,res1,res2) -> res1 + res2
syncF = MakeSync f, options 
Sync ->
  console.log syncF()
```

### default

If not specified, this options is defaulted to:

```coffeescript
{'sync-return': 'err,res'}
```

This means that MakeSync expect the function to pass an error, and one result to the callback. 
It will ignore everything else.


## options when calling on objects

When calling MakeSync on an object,  MakeSync is called on all its 
methods. 

It is possible to configure the following: 

* inclusion and exclusion lists (per method basis)
* num_of_args (per method basis)
* sync-return (per method basis)
* MakeSync mode (globally)

```coffeescript
{Sync, MakeSync} = require 'make-sync'

g = -> 10

# all the function are included by default, 
# then some are specifically excluded.
# sync return is set per-function
obj = 
  f1: (done) -> done null, 1
  f2: (done) -> done null, 2
  _f: (done) -> done 3
  f3: (_g, done) -> done null, 4 + _g()
  f4: (_g, done) -> done 5 + _g()
  f5: (done) -> done null, 2

options =
  mode: ['mixed', 'args']
  exclude: ['f1', /^_/]
  num_of_args:
    f4:1
  'sync-return':
    '*': 'err,res'
    _f: 'res'
    f4: 'res'
    f5: (err,res) -> res + 1

MakeSync obj, options

Sync ->
  try obj.f1() catch error then console.log "f1 throws" # f1 was excluded  
  console.log 'f2 returns', obj.f2() # OK, not in the exclude list
  try obj._f() catch error then console.log "_f throws" # _f was excluded
  try obj.f3 g catch error 
    console.log "f3 throws" # num_of_args not set 
  console.log 'f4 returns', obj.f4 g # OK, num_of_args was set
  console.log 'f5 returns', obj.f5() # uses sync return function

# all the function are excluded 
# then some are specifically included.
obj = 
  f1: (done) -> done 1
  f2: (done) -> done 2
  _f: (done) -> done 3
  f3: (_g, done) -> done 4 + _g()
  f4: (_g, done) -> done 5 + _g()
  f5: (done) -> done 2

options = 
  mode: 'sync'
  exclude: '*'
  include: ['f1', 'f3']
  'sync-return': 'res' # err is never pass to the done callback
MakeSync obj, options

Sync ->
  console.log '\nf1 returns', obj.f1() # OK, f1 was included

  try obj.f2() catch error then console.log "f2 throws" # f2 was excluded

  console.log 'f3 returns', obj.f3 g # OK, f3 was included

# exclude can also accept a simple string or a regex
options1 = exclude: 'f1'
options2 = exclude: /^_/
```
