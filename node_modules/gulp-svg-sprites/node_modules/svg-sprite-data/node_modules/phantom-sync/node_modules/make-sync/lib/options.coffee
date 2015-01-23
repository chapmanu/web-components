###
# node-make-sync
# Copyright(c) 2012 Seb Vincent
# MIT Licensed
###

###
# Option class parser. Options may be like the following examples.
#
# {
#   mode: ['mixed','args']
#   exclude: ['f', /^_/]
#   num_of_args:
#     g: 1
# }
#
# {
# exclude: '*'
# include: ['f', 'g']
# num_of_args:
#   f: 2
#
# sync-return:
#   '*': [err,res]
#   f: (rawArgs) ->
#     ...
#     res
#
#
# }
#
# { exclude: 'f' }
# { exclude: /^_/}
#
###

_ = require "lodash"
CoffeeScript = require 'coffee-script'

class Options

  constructor: (options={}) ->
    @_options = options

  isIncluded: (target) ->
    res = true
    ruleDef =
      exclude: (rule) -> res = res and not target.match rule
      include: (rule) -> res = res or target.match rule
    for key, rules of @_options when ruleDef[key]?
      rules = [rules] unless rules instanceof Array
      for rule in rules
        rule = /.*/ if rule is '*'
        rule = ///^#{rule}$/// if typeof rule is 'string'
        ruleDef[key] rule
    res or false

  numOfParams: (target) ->
    if (target?) then @_options.num_of_args?[target] # object mode
    else @_options.num_of_args

  mode: ->
    mode = @_options.mode or []
    mode = [mode] unless mode instanceof Array
    primary = _.last( mode.filter (mode) ->
      mode in ['sync','async','mixed']) or 'sync'
    secondary = [_.last( mode.filter (mode) ->
       mode in ['args','fibers'] ) or 'args']
    secondary = [] if primary in ['sync','async']
    [primary].concat secondary

  syncReturn: (target) ->
    res = 'err,res'
    if(target?)
      # object options
      if (typeof @_options?['sync-return']) is 'object'
        for rule,builder of @_options?['sync-return']
          rule = /.*/ if rule is '*'
          rule = ///^#{rule}$/// if typeof rule is 'string'
          if target.match rule
            res = builder
      else
        res = @_options?['sync-return'] or res
    else
      res = @_options?['sync-return'] or res
    if (typeof res) is 'string'
      resultBuilderAsString =
        """
        resultBuilder = (rawRes...) ->
          [err,res] = []
          [#{res}] = rawRes
          throw err if err?
          return res
        """
      # building matcher function
      resultBuilderJs = CoffeeScript.compile resultBuilderAsString, bare:'on'
      eval resultBuilderJs
      res = resultBuilder
    res

exports.Options = Options
