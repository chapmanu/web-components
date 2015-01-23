exports.makeTestFunc = (nbOfParams, returnsError, appendFunctionParam) ->
  (args..., done) ->
    if (typeof done) isnt 'function'
      throw new Error "done is not a function"
    sum = 1;
    sum += arg for arg in args[0...nbOfParams]
    sum += args[nbOfParams]() if appendFunctionParam
    if(returnsError)
      done null, sum
    else
      done sum

exports.extraFunc = -> 
  10      

exports.MAX_PARAM = 3

# expected results
exports.RES_WITHOUT_EXTRA_FUNC =  [1,2,4,7]
exports.RES_WITH_EXTRA_FUNC =  [11,12,14,17]
