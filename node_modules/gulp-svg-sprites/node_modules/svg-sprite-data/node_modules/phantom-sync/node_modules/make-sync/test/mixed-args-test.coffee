should = require 'should'
{Sync, MakeSync} = require('../lib/make-sync')
{makeTestFunc, extraFunc, MAX_PARAM, RES_WITHOUT_EXTRA_FUNC, 
  RES_WITH_EXTRA_FUNC} = require './helpers/function-gen'

describe "mixed-args", ->

  describe "errors, no function arg", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, true, false
        syncF = MakeSync f, {mode:['mixed','args']}    
        syncF args..., (err, res) ->          
          res.should.equal RES_WITHOUT_EXTRA_FUNC[i]
        Sync ->
          res = syncF args...                     
          res.should.equal RES_WITHOUT_EXTRA_FUNC[i]
          done()
    for i in [0..MAX_PARAM]
      test(i)
  
  describe "no errors, no function arg", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, false, false
        syncF = MakeSync f, 
          {mode:['mixed','args'], 'sync-return': 'res'}     
        syncF args..., (res) ->          
          res.should.equal RES_WITHOUT_EXTRA_FUNC[i]
        Sync ->
          res = syncF args...                     
          res.should.equal RES_WITHOUT_EXTRA_FUNC[i]
          done()
    for i in [0..MAX_PARAM]
      test(i)
  
  describe "errors, function arg, without fixed arg number", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, true, true
        syncF = MakeSync f, {mode:['mixed','args']}
        syncF args..., extraFunc, (err, res) ->          
          res.should.equal RES_WITH_EXTRA_FUNC[i]
        Sync ->          
          res = syncF args..., extraFunc, undefined                  
          res.should.equal RES_WITH_EXTRA_FUNC[i]
          done()
    for i in [0..MAX_PARAM]
      test(i)
  
  describe "no errors, function arg, without fixed arg number", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, false, true
        syncF = MakeSync f, 
          {mode:['mixed','args'], 'sync-return': 'res'}
        syncF args..., extraFunc, (res) ->          
          res.should.equal RES_WITH_EXTRA_FUNC[i]
        Sync ->          
          res = syncF args..., extraFunc, undefined                  
          res.should.equal RES_WITH_EXTRA_FUNC[i]
          done()
    for i in [0..MAX_PARAM]
      test(i)

  describe "errors, function arg, with fixed arg number", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, true, true
        syncF = MakeSync f, {mode:['mixed','args'], num_of_args:i+1}
        syncF args..., extraFunc, (err, res) ->          
          res.should.equal RES_WITH_EXTRA_FUNC[i]
        Sync ->          
          res = syncF args..., extraFunc                  
          res.should.equal RES_WITH_EXTRA_FUNC[i]
          done()
    for i in [0..MAX_PARAM]
      test(i)

  describe "no errors, function arg, with fixed arg number", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, false, true
        syncF = MakeSync f, 
          {mode:['mixed','args'], num_of_args:i+1, 'sync-return': 'res'}
        syncF args..., extraFunc, (res) ->          
          res.should.equal RES_WITH_EXTRA_FUNC[i]
        Sync ->          
          res = syncF args..., extraFunc                  
          res.should.equal RES_WITH_EXTRA_FUNC[i]
          done()
    for i in [0..MAX_PARAM]
      test(i)
