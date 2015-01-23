should = require 'should'
{Options} = require '../lib/options'

describe "options", ->

  describe "isIncluded", ->

    describe "default", ->
      it "include all", (done) ->
        options = new Options()
        res = (options.isIncluded 'f').should.be.ok
        done()

    describe "* rule", ->
      it "exclude", (done) ->
        options = new Options \
        {
          exclude: '*'
        }
        (options.isIncluded 'f').should.not.be.ok
        done()
      it "include", (done) ->
        options = new Options \
        {
          exclude: '*'
          include: '*'
        }
        (options.isIncluded 'f').should.be.ok
        done()

    describe "regex rule", ->
      it "exclude", (done) ->
        options = new Options \
        {
          exclude: /^_/
        }
        (options.isIncluded 'f').should.be.ok
        (options.isIncluded '_f').should.not.be.ok
        done()
      it "include", (done) ->
        options = new Options \
        {
          exclude: '*'
          include: /^f/
        }
        (options.isIncluded 'f').should.be.ok
        (options.isIncluded 'g').should.not.be.ok
        done()

    describe "string rule", ->
      it "exclude", (done) ->
        options = new Options \
        {
          exclude: '_f'
        }
        (options.isIncluded 'f').should.be.ok
        (options.isIncluded 'f_f').should.be.ok
        (options.isIncluded '_f').should.not.be.ok
        done()
      it "include", (done) ->
        options = new Options \
        {
          exclude: '*'
          include: 'f'
        }
        (options.isIncluded 'f').should.be.ok
        (options.isIncluded 'fff').should.not.be.ok
        (options.isIncluded 'g').should.not.be.ok
        done()

    describe "array", ->
      it "exclude", (done) ->
        options = new Options \
        {
          exclude: [/^_/,'g']
        }
        (options.isIncluded 'f').should.be.ok
        (options.isIncluded '_f').should.not.be.ok
        (options.isIncluded 'g').should.not.be.ok
        done()
      it "include", (done) ->
        options = new Options \
        {
          exclude: '*'
          include: ['g',/^_/]
        }
        (options.isIncluded 'f').should.not.be.ok
        (options.isIncluded 'g').should.be.ok
        (options.isIncluded '_f').should.be.ok
        done()

  describe "numOfParams", ->
    it "function mode", (done) ->
      options = new Options \
      {
        num_of_args: 5
      }
      options.numOfParams().should.equal 5
      (options.numOfParams undefined).should.equal 5
      done()
    it "object mode", (done) ->
      options = new Options \
      {
        num_of_args:
          f: 5
      }
      (options.numOfParams 'f').should.equal 5
      should.not.exist options.numOfParams 'g'
      done()

  describe "syncReturn", ->
    it "default", (done) ->
      # err,res,ignored...
      options = new Options \
      {
      }
      options.syncReturn().should.have.type 'function'
      (options.syncReturn() null,1).should.equal 1
      (options.syncReturn() null,1,3).should.equal 1
      (-> options.syncReturn() new Error 'Shit!').should.throw /Shit/
      done()

    it "pattern with error", (done) ->
      options = new Options \
      {
        'sync-return': 'err,res...'
      }
      options.syncReturn().should.have.type 'function'
      (options.syncReturn() null,1).should.eql [1]
      (options.syncReturn() null,1,3).should.eql [1,3]
      (-> options.syncReturn() new Error 'Shit!').should.throw /Shit/
      done()

    it "pattern without error", (done) ->
      options = new Options \
      {
        'sync-return': 'res'
      }
      options.syncReturn().should.have.type 'function'
      (options.syncReturn() 1).should.equal 1
      (options.syncReturn() 1,3).should.equal 1
      (options.syncReturn() 'Shit!').should.equal 'Shit!'
      done()

    it "function", (done) ->
      options = new Options \
      {
        'sync-return': (err,res1,res2) ->
          throw new Error new Error 'Merde!' if err
          res1+res2
      }
      options.syncReturn().should.have.type 'function'
      (options.syncReturn() null,1,3).should.equal 4
      (-> options.syncReturn() new Error 'Shit!').should.throw /Merde/
      done()

    it "object global config with function", (done) ->
      options = new Options \
      {
        'sync-return':  -> 41
      }
      options.syncReturn('h').should.have.type 'function'
      (options.syncReturn('h') 2,3).should.equal 41
      done()

    it "object global config with pattern", (done) ->
      options = new Options \
      {
        'sync-return': 'res'
      }
      options.syncReturn('h').should.have.type 'function'
      (options.syncReturn('h') 2,3).should.equal 2
      done()

    it "object per function config", (done) ->
      options = new Options \
      {
        'sync-return':
          '*': 'err,res'
          g: 'res'
          h: -> 41
      }
      options.syncReturn('f').should.have.type 'function'
      (options.syncReturn('f') null,1).should.equal 1
      options.syncReturn('g').should.have.type 'function'
      (options.syncReturn('g') 2,3).should.equal 2
      options.syncReturn('h').should.have.type 'function'
      (options.syncReturn('h') 2,3).should.equal 41
      done()

  describe "mode", ->
    test = (mode,expected, label) ->
      label = "#{mode}" unless label?
      it label, (done) ->
        options = new Options {} unless mode?
        options = new Options {mode: mode} if mode?
        options.mode().should.eql expected
        done()
    test(undefined, ['sync'], 'default')
    test(['sync'], ['sync'])
    test('sync', ['sync'], 'sync (string)' )
    test(['sync','args'], ['sync'])
    test(['mixed'], ['mixed','args'])
    test('mixed', ['mixed','args'], 'mixed (string)')
    test(['async'], ['async'])
    test('async', ['async'], 'async (string)')
    test(['async','args'], ['async'])
    test(['sync','mixed'], ['mixed','args'])
    test(['mixed','fibers'], ['mixed','fibers'])
    test(['mixed','fibers','args'], ['mixed','args'])
    test(['mixed','fibers','args','sync'], ['sync'])



