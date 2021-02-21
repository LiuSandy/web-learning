const pull = require('./pull')
/**
 * 
 * @param {Array} arr 
 * @param {Array} values 
 */
function pullAll(arr,values){
  return pull(arr,...values)
}

module.exports = pullAll