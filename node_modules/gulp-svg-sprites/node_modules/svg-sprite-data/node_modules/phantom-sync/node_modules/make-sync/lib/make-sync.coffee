###
# node-make-sync
# Copyright(c) 2012 Seb Vincent
# MIT Licensed
###

Fiber = require('fibers');        
Future = require 'fibers/future'
wait = Future.wait
{Options} = require './options'

# use a Future to make the sync call and wait.
callSync = (f, resultBuilderFunc, args...) ->   
  # making sure the returns follow the
  # usual callback rule
  fWithErr = (callback) ->
    f.apply this, [ 
      args..., (res...) ->
        callback null,res
      ]
  wrappedf = Future.wrap fWithErr
  rawRes = wrappedf.apply this
  wait(rawRes)
  rawRes = rawRes.get()
  resultBuilderFunc.apply @, rawRes
      
# return a function wich:
#   - uses fibers when the done callback is not detected.
#   - otherwise calls the original function
makeFuncSync = (f, options, key) ->

  mode = options.mode()
  numOfParams = options.numOfParams key
  [prepareCall] = []  
  switch mode[0]
    when 'sync' then prepareCall = (args...) -> ['sync',args]
    when 'async' then prepareCall = (args...) -> ['async',args]
    when 'mixed'
      switch mode[1]
        when 'fibers' then prepareCall = (args...) -> 
          if Fiber.current? then ['sync',args] else ['async',args] 
        when 'args'
          # move done to args when num of args too small, or if done is the
          # wrong type
          prepareCall = (args..., done) ->
            if numOfParams? and done? and args.length < numOfParams
              args.push done
              done = undefined
            if done? and typeof(done) isnt 'function'
              args.push done    
              done = undefined
            if done
              ['async',args.concat [done]]
            else
              ['sync',args]
  
  resultBuilderFunc = options.syncReturn( key )
  
  (args...) ->
    [callMode,args] = prepareCall args...    
    switch callMode
      when 'sync'         
        callSync.apply this, [f, resultBuilderFunc, args...]
      when 'async' then f.apply this, [args...]

# apply makesync on all the object functions
makeObjSync = (obj, options) ->
  for k, v of obj when typeof v is 'function'
    if options.isIncluded k
      vSync = makeFuncSync v, options, k
      obj[k] = vSync
  obj


# call the approriate makeSync method depending on object type
makeSync = (target, _options) -> 
  options = new Options(_options)
  switch typeof target
    when 'function' then makeFuncSync target, options
    when 'object' then makeObjSync target, options

# open a sync block
sync = (f) ->
  fn = Fiber f
  fn.run()

current = ->
  Fiber.current

exports.Sync = sync
exports.MakeSync = makeSync  
exports.MakeObjSync = makeObjSync
exports.MakeFuncSync = makeFuncSync
exports.Current = current

exports.sync = sync
exports.makeSync = makeSync  
exports.makeObjSync = makeObjSync
exports.makeFuncSync = makeFuncSync
exports.current = current
