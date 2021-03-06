import RS from 'ramdasauce'
const COMMAND = 'state.dispatch.prompt'

/**
Prompts for a path to grab some state keys from.
 */
const process = (context, action) => {
  context.ui.prompt('Action to dispatch (e.g. {type: \'MY_ACTION\'})', (value) => {
    let action = null

    // try not to blow up the frame
    try {
      eval('action = ' + value) // eslint-disable-line
    } catch (e) {
    }

    // try harder to not blow up the frame
    if (RS.isNilOrEmpty(action)) return

    // got an object?  ship an object.
    context.post({type: 'state.dispatch', action})
  })
}

export default {
  name: COMMAND,
  repeatable: true,
  process
}
