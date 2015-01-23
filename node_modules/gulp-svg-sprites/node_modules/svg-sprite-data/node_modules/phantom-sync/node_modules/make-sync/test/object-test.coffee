should = require 'should'
{Sync, MakeSync, _matchExclude} = require('../lib/make-sync')
{makeTestFunc, extraFunc, MAX_PARAM, RES_WITHOUT_EXTRA_FUNC,
  RES_WITH_EXTRA_FUNC} = require './helpers/function-gen'
_ = require 'lodash'

fiberError = /without a fiber/
doneError = /is not a function/

describe "object", ->
  buildObj = ->
    obj = {abc:15}
    for funcStart in ['f','g','_f']
      for i in [0..MAX_PARAM]
        do ->
          f = makeTestFunc i, i%2 is 0, i>=2
          # doing something a bit complicate to be able
          # to catch context errors
          obj["#{funcStart}#{i}"] = (args...) ->
            b = @abc.def # will crash if context got lost
            res =  f(args...)
            return res;
    obj

  buildAsyncFuncCall = (funcName, i, obj) ->
    ->
      args = [1..10][0...i]
      expected = RES_WITHOUT_EXTRA_FUNC[i]
      if i>=2
        args.push extraFunc
        expected = RES_WITH_EXTRA_FUNC[i]
      if i%2 is 0
        obj["#{funcName}"] args..., (err, res) ->
          res.should.equal expected
      else
        obj["#{funcName}"] args..., (res) ->
          res.should.equal expected

  buildSyncFuncCall = (funcName, i, obj, addUndefined=false) ->
    ->
      args = [1..10][0...i]
      expected = RES_WITHOUT_EXTRA_FUNC[i]
      if i>=2
        args.push extraFunc
        expected = RES_WITH_EXTRA_FUNC[i]
      if addUndefined
        args.push undefined
      Sync ->
        res = obj["#{funcName}"] args...
        res.should.equal expected

  buildOptions = (mode) ->
    options =
      mode: mode
      exclude: ['g0','g1',/^_/]
      'sync-return': {}
    if _.isEqual mode, ['mixed','args']
      options.num_of_args =
        g2: 3
        g3: 4

        use: (err, res) ->
          res = err if not res?
          res

    for funcStart in ['f','g','_f']
      for i in [0..MAX_PARAM]
        if(i%2 is 1)
          options['sync-return']["#{funcStart}#{i}"]='res'
    options

  describe "mode=sync", ->
    [options,obj] = []
    before (done) ->
      obj = buildObj()
      options = buildOptions 'sync'
      MakeSync obj, options
      done()
    test = (funcStart,i) ->
      funcName = "#{funcStart}#{i}"
      it "#{funcName} async call", (done) ->
        funcCall = buildAsyncFuncCall funcName, i, obj
        switch funcStart
          when 'f'
            funcCall.should.throw(fiberError)
            done()
          when 'g'
            funcCall.should.not.throw() if i<2
            funcCall.should.throw(fiberError) if i>=2
            done()
          when '_f'
            funcCall.should.not.throw()
            done()
      it "#{funcName} sync call", (done) ->
        funcCall = buildSyncFuncCall funcName, i, obj
        switch funcStart
          when 'f'
            funcCall.should.not.throw()
            done()
          when 'g'
            funcCall.should.throw(doneError) if i<2
            funcCall.should.not.throw() if i>=2
            done()
          when '_f'
            funcCall.should.throw(doneError)
            done()
    # running all tests
    for funcStart in ['f','g','_f']
      for i in [0..MAX_PARAM]
        test(funcStart,i)


  describe "mode=async", ->
    [options,obj] = []
    before (done) ->
      obj = buildObj()
      options = buildOptions 'async'
      MakeSync obj, options
      done()
    test = (funcStart,i) ->
      funcName = "#{funcStart}#{i}"
      it "#{funcName} async call", (done) ->
        funcCall = buildAsyncFuncCall funcName, i, obj
        switch funcStart
          when 'f'
            funcCall.should.not.throw()
            done()
          when 'g'
            funcCall.should.not.throw()
            done()
          when '_f'
            funcCall.should.not.throw()
            done()
      it "#{funcName} sync call", (done) ->
        funcCall = buildSyncFuncCall funcName, i, obj
        switch funcStart
          when 'f'
            funcCall.should.throw(doneError)
            done()
          when 'g'
            funcCall.should.throw(doneError)
            done()
          when '_f'
            funcCall.should.throw(doneError)
            done()
    # running all tests
    for funcStart in ['f','g','_f']
      for i in [0..MAX_PARAM]
        test(funcStart,i)


  describe "mode=mixed-fibers", ->
    [options,obj] = []
    before (done) ->
      obj = buildObj()
      options = buildOptions ['mixed','fibers']
      MakeSync obj, options
      done()
    test = (funcStart,i) ->
      funcName = "#{funcStart}#{i}"
      it "#{funcName} async call", (done) ->
        funcCall = buildAsyncFuncCall funcName, i, obj
        switch funcStart
          when 'f'
            funcCall.should.not.throw()
            done()
          when 'g'
            funcCall.should.not.throw()
            done()
          when '_f'
            funcCall.should.not.throw()
            done()
      it "#{funcName} sync call", (done) ->
        funcCall = buildSyncFuncCall funcName, i, obj
        switch funcStart
          when 'f'
            funcCall.should.not.throw()
            done()
          when 'g'
            funcCall.should.throw(doneError) if i < 2
            funcCall.should.not.throw() if i >= 2
            done()
          when '_f'
            funcCall.should.throw(doneError)
            done()
    # running all tests
    for funcStart in ['f','g','_f']
      for i in [0..MAX_PARAM]
        test(funcStart,i)


  describe "mode=mixed-args", ->
    [options,obj] = []
    before (done) ->
      obj = buildObj()
      options = buildOptions ['mixed','args']
      MakeSync obj, options
      done()
    test = (funcStart,i) ->
      funcName = "#{funcStart}#{i}"
      it "#{funcName} async call", (done) ->
        funcCall = buildAsyncFuncCall funcName, i, obj
        switch funcStart
          when 'f'
            funcCall.should.not.throw()
            done()
          when 'g'
            funcCall.should.not.throw()
            done()
          when '_f'
            funcCall.should.not.throw()
            done()
      it "#{funcName} sync call", (done) ->
        funcCall = buildSyncFuncCall funcName, i, obj
        switch funcStart
          when 'f'
            funcCall.should.not.throw()  if i < 2
            if i >= 2
              funcCall.should.throw(doneError)  # num_of_args not set
              # trying with undefined at the end
              funcCallWithUndefined = buildSyncFuncCall funcName, i, obj, true
              funcCallWithUndefined.should.not.throw()
            done()
          when 'g'
            funcCall.should.throw(doneError) if i < 2
            funcCall.should.not.throw() if i >= 2 # num_of_parmas is set
            done()
          when '_f'
            funcCall.should.throw(doneError)
            done()
    # running all tests
    for funcStart in ['f','g','_f']
      for i in [0..MAX_PARAM]
        test(funcStart,i)


