should = require 'should'
ms = require('../lib/make-sync')

describe "exports", ->
  it "starting with lowercase", (done) ->
    ms.sync.should.exist
    ms.makeSync.should.exist
    ms.makeObjSync.should.exist
    ms.makeFuncSync.should.exist
    done()
  it "starting with uppercase", (done) ->
    ms.Sync.should.exist
    ms.MakeSync.should.exist
    ms.MakeObjSync.should.exist
    ms.MakeFuncSync.should.exist
    done()
          