should = require 'should'
fg = require './helpers/function-gen'
{makeTestFunc, extraFunc, MAX_PARAM, RES_WITHOUT_EXTRA_FUNC, 
  RES_WITH_EXTRA_FUNC} = require './helpers/function-gen'
  
describe "function generator", ->
  
  describe "errors, no function arg", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, true, false
        f args..., (err, res) ->          
          res.should.equal RES_WITHOUT_EXTRA_FUNC[i]
        done()
    test i for i in [0..MAX_PARAM] 

  describe "no errors, no function arg", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, false, false
        f args..., (res) ->          
          res.should.equal RES_WITHOUT_EXTRA_FUNC[i]
        done()
    test i for i in [0..MAX_PARAM]
     
  describe "errors, function arg", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, true, true
        f args..., extraFunc, (err, res) ->          
          res.should.equal RES_WITH_EXTRA_FUNC[i]
        done()
    test i for i in [0..MAX_PARAM] 
    
  describe "no errors, function arg", ->
    test = (i) ->
      it "should work with #{i} args", (done) ->
        args = [1..10][0...i]
        f = makeTestFunc i, false, true
        f args..., extraFunc, (res) ->          
          res.should.equal RES_WITH_EXTRA_FUNC[i]
        done()
    test i for i in [0..MAX_PARAM] 
