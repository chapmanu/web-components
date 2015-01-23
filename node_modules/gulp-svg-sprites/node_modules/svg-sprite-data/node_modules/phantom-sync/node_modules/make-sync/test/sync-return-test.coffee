should = require 'should'
{Sync, MakeSync} = require('../lib/make-sync')


describe "sync", ->

  describe "default", ->
    it "should throw Shit", (done) ->
      f = (done) -> done new Error "Shit happens!"
      syncF = MakeSync f
      Sync ->
        (-> syncF()).should.throw(/Shit/) 
        done()

  describe "single result with err", ->
    it "should work", (done) ->
      f = (done) -> done null, 10
      syncF = MakeSync f, {'sync-return': 'err, res'}
      Sync ->
        res = syncF()
        res.should.equal 10
        done()
  
  
  describe "multiple resultS with err", ->
    it "should work", (done) ->
      f = (done) -> done null, 10, 20
      syncF = MakeSync f, {'sync-return': 'err,res...'}
      Sync ->
        res = syncF()
        res.should.eql [10,20]
        done()

  describe "throw error", ->
    it "should throw Shit", (done) ->
      f = (done) -> done new Error "Shit happens!"
      syncF = MakeSync f, {'sync-return': 'err, res'}
      Sync ->
        (-> syncF()).should.throw(/Shit/) 
        done()

  describe "single result without err", ->
    it "should work", (done) ->
      f = (done) -> done 10
      syncF = MakeSync f, {'sync-return': 'res'}
      Sync ->
        res = syncF()
        res.should.equal 10
        done()
  
  
  describe "multiple resultS without err", ->
    it "should work", (done) ->
      f = (done) -> done 10, 20
      syncF = MakeSync f, {'sync-return': 'res...'}
      Sync ->
        res = syncF()
        res.should.eql [10,20]
        done()

  describe "with function", ->
    it "should work", (done) ->
      f = (done) -> done 10, 20
      syncF = MakeSync f, {'sync-return': (res1, res2) -> res1 + res2}
      Sync ->
        res = syncF()
        res.should.equal 30
        done()

  describe "object", ->
    it "should work", (done) ->
      obj = 
        f: (done) -> done null, 10
        g: (done) -> done null, 10, 20
        h: (done) -> done 50
      MakeSync obj, 'sync-return': 
        '*': 'err,res'
        'g': (err,res1,res2) -> res1+res2
        'h': 'res'
      Sync ->
        obj.f().should.equal 10
        obj.g().should.equal 30
        obj.h().should.equal 50
        done()
      
  